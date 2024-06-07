
import { productApi } from "./productApi";
import { ProductTypes } from "./productTypes";


async function createProductService(
    product_name: string, 
    price:number, 
    quantity:number, 
    photo: string, 
    description: string, 
    status:string):Promise<ProductTypes> {
        
        const productAPI = await productApi.createProduct(
            product_name, 
            price, 
            quantity,
            photo,
            description,
            status
        );

        return productAPI;
}

async function getProduct(): Promise<ProductTypes> {
    return await productApi.getProduct();
}

export const productService = {
    createProductService,
    getProduct
}