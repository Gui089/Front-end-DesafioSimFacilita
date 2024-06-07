import { api } from "../../api/apiConfig";
import { ProductTypes } from "./productTypes";

async function getProduct(): Promise<ProductTypes[]> {
    const response = await api.get('/product');
    return response.data;
}

async function createProduct(formData: FormData): Promise<ProductTypes> {
    const response = await api.post('/product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export const productApi = {
    createProduct,
    getProduct,
};
