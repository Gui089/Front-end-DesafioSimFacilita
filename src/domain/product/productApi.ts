import { api } from "../../api/apiConfig";
import { ProductTypes } from "./productTypes";


async function getProduct(): Promise<ProductTypes> {
    const response = await api.get('/product');

    return response.data;
}

async function createProduct(
        product_name: string, 
        price:number, 
        quantity:number, 
        photo: string, 
        description: string, 
        status:string
    ):Promise<ProductTypes> {
    const response = await api.post('/product', {
        product_name,
        price,
        quantity,
        photo,
        description,
        status,
    });

    return response.data;
}


export const productApi = {
    createProduct,
    getProduct
}