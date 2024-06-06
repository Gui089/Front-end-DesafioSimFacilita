import { useRef, useState } from "react";
import { Container, FileInput, FileInputLabel, InputForm, Label, Page } from "./css/home"


export const HomeComponent = () => {

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("No file chosen");

    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        }
    } 

    return (
        <Page>
            <Container>
                <form style={{
                    marginTop:30,
                    display:'flex',
                    flexDirection:'column'
                }}>
                    <Label>Nome do produto</Label>
                    <InputForm placeholder="Nome do Produto"/>
                    
                    <Label>Preço do produto</Label>
                    <InputForm placeholder="Preço do produto"/>

                    <Label>Quantidade</Label>
                    <InputForm type="number" placeholder="Quantidade"/>

                    <FileInput 
                        type="file"
                        id="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        />
                    <FileInputLabel htmlFor="file">Imagem</FileInputLabel>
                    
                    <Label>Descrição</Label>
                    <InputForm placeholder="Descrição"/>

                    <Label>Status</Label>
                
                    <select>
                        <option value="">Ativo</option>
                        <option value="">Inativo</option>
                    </select>

                </form>
            </Container>
        </Page>
    )
}