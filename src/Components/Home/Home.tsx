import { useEffect, useRef, useState } from "react";
import { ButtonSubmit, Container, FileInput, FileInputLabel, InputForm, Label, OptionForm, Page, SelectForm } from "./css/home";
import { ProductTypes } from "../../domain/product/productTypes";
import { CreateProductData, productService } from "../../domain/product/productService";

export const HomeComponent = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("No file chosen");
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Ativo");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setFileName(file.name);
            setPhoto(file);
        }
    };

    useEffect(() => {
        productService.getProduct().then((product) => setProducts(product));
    }, []); 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (!productName || !price || !quantity || !description) {
            console.error("All fields are required");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('product_name', productName);
            formData.append('price', price);
            formData.append('quantity', quantity);
            if (photo) {
                formData.append('photo', photo);
            }
            formData.append('description', description);
            formData.append('status', status);
    
            const createProductData: CreateProductData = {
                product_name: formData.get('product_name') as string,
                price: Number(formData.get('price')),
                quantity: Number(formData.get('quantity')),
                photo: formData.get('photo') as File,
                description: formData.get('description') as string,
                status: formData.get('status') as string
            };
    
            console.log("CreateProductData:", createProductData);
    
            const newProduct = await productService.createProduct(createProductData);
            setProducts([...products, newProduct]);
        } catch (error) {
            console.error("Failed to create product", error);
        }
    };

    return (
        <Page>
            <Container>
                <form onSubmit={handleSubmit} style={{ marginTop: 30, display: 'flex', flexDirection: 'column' }}>
                    <Label>Nome do produto</Label>
                    <InputForm 
                        placeholder="Nome do Produto" 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                    />
                    
                    <Label>Preço do produto</Label>
                    <InputForm 
                        placeholder="Preço do produto" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />

                    <Label>Quantidade</Label>
                    <InputForm 
                        type="number" 
                        placeholder="Quantidade" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                    />

                    <FileInput 
                        type="file"
                        id="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <FileInputLabel htmlFor="file">Imagem do produto</FileInputLabel>
                    
                    <Label>Descrição</Label>
                    <InputForm 
                        placeholder="Descrição" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />

                    <Label>Status</Label>
                
                    <SelectForm 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <OptionForm value="Ativo">Ativo</OptionForm>
                        <OptionForm value="Inativo">Inativo</OptionForm>
                    </SelectForm>

                    <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
                </form>
            </Container>
        </Page>
    );
};
