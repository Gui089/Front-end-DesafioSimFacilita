import { useEffect, useRef, useState } from "react";
import { ButtonNavLink, ButtonSubmit, Container, ErrorMessageInput, FileInput, FileInputLabel, InputForm, Label, OptionForm, Page, SelectForm } from "./css/home";
import { ProductTypes } from "../../domain/product/productTypes";
import { CreateProductData, productService } from "../../domain/product/productService";
import {Toaster} from 'sonner';
import { toast } from 'sonner';
import { Controller, useForm } from "react-hook-form";
import { ProductSchema, productValidationSchema } from "../../schema/productValidation";
import { zodResolver } from '@hookform/resolvers/zod';
import { NavLink } from "react-router-dom";


export const HomeComponent = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("No file chosen");
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [photo, setPhoto] = useState<File | undefined>(undefined);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Ativo");

    const {control} = useForm<ProductSchema>({
        resolver: zodResolver(productValidationSchema),
        defaultValues:{
            product_name:'',
            price:'',
            quantity:'',
            photo:undefined,
            description:'',
            status:''
        },
        mode:'onChange'
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setFileName(file.name);
            setPhoto(file);
        }
    };

    const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (!productName || !price || !quantity || !description) {
            console.error("All fields are required");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('product_name', productName);
            formData.append('price', price.toString());
            formData.append('quantity', quantity.toString());
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
    
            toast("Produto cadastrado com seucesso");
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
                <form onSubmit={formSubmit} style={{ marginTop: 30, display: 'flex', flexDirection: 'column' }}>

                    <Controller
                        control={control}
                        name="product_name"
                        render={({field, fieldState}) => (
                            <>
                                <Label>Nome do produto</Label>
                                <InputForm 
                                    placeholder="Nome do Produto" 
                                    value={field.value} 
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setProductName(e.target.value);
                                    }} 
                                />
                                {fieldState.error && <ErrorMessageInput>Nome deve ter no mínimo 2 caracteres</ErrorMessageInput>}
                            </>
                        )}
                    />
                    
                    <Controller
                        control={control}
                        name="price"
                        render={({field, fieldState}) => (
                            <>
                                <Label>Preço do produto</Label>
                                <InputForm 
                                    type="number"
                                    placeholder="Preço do produto" 
                                    value={field.value} 
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setPrice(Number(e.target.value));
                                    }} 
                                />
                                {fieldState.error && <ErrorMessageInput>Preço deve ser maior que 0</ErrorMessageInput>}
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="quantity"
                        render={({field, fieldState}) => (
                            <>
                                <Label>Quantidade</Label>
                                <InputForm 
                                    type="number"
                                    placeholder="Quantidade" 
                                    value={field.value} 
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setQuantity(Number(e.target.value));
                                    }} 
                                />
                                {fieldState.error && <ErrorMessageInput>Quantidade deve ser maior que 0</ErrorMessageInput>}
                            </>
                        )}
                    />

                    <FileInput 
                        type="file"
                        id="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <FileInputLabel htmlFor="file">Imagem do produto</FileInputLabel>
                    
                    <Controller
                        control={control}
                        name="description"
                        render={({field, fieldState}) => (
                            <>
                                <Label>Descrição</Label>
                                <InputForm 
                                    placeholder="Descrição" 
                                    value={field.value} 
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setDescription(e.target.value);
                                    }} 
                                />
                                {fieldState.error && <ErrorMessageInput>Descrição deve ter no mínimo 5 caracters</ErrorMessageInput>}
                            </>
                        )}
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

                    <NavLink style={{textDecoration:'none'}} to="/products">
                        <ButtonNavLink>
                            Produtos
                        </ButtonNavLink>
                    </NavLink>

                    <Toaster 
                        position="top-center" />
                </form>
            </Container>
        </Page>
    );
};
