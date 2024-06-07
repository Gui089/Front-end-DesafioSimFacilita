import { useEffect, useState } from "react";
import { productService } from "../../domain/product/productService";
import { ProductTypes } from "../../domain/product/productTypes";
import { ButtonDelete, ButtonNavLink, LiProducts, Page, UlProducts } from "./css/ListProduct";
import { NavLink } from "react-router-dom";
import { productApi } from "../../domain/product/productApi";

export const ListProduct = () => {
    const [products, setProducts] = useState<ProductTypes[]>([]);

    useEffect(() => {
        productService.getProduct().then((products) => setProducts(products));
    }, []);

    const onDeleteProduct = async (id: string) => {
        try {
            await productApi.deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    return (
        <Page>
            <UlProducts>
                {products.map((item) => 
                    <LiProducts key={item.id}>
                        {item.product_name}
                        <ButtonDelete onClick={() => onDeleteProduct(item.id)}>x</ButtonDelete>
                    </LiProducts>
                )}
                <NavLink style={{textDecoration:'none'}} to="/">
                    <ButtonNavLink>Cadastro de produtos</ButtonNavLink>
                </NavLink>
            </UlProducts>
        </Page>
    );
};

