import { api } from "../../api/apiConfig";
import { ProductTypes } from "./productTypes";

async function getProduct(): Promise<ProductTypes[]> {
    const response = await api.get('/product');
    return response.data;
}

export interface CreateProductData {
    product_name: ProductTypes['product_name'];
    price: number;
    quantity: number;
    photo: string | File;
    description: string;
    status: string;
}

async function createProduct(data: CreateProductData): Promise<ProductTypes []> {
    const response = await api.post('/product', data);
    return response.data;
}

export const productService = {
    createProduct,
    getProduct
};

