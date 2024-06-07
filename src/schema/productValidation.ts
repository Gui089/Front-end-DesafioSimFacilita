import {z} from 'zod';

export const productValidationSchema = z.object({
    product_name: z.string().max(50).min(2),
    price: z.string().min(1),
    quantity: z.string().min(1),
    description: z.string().max(150).min(5),
    photo: z.instanceof(File),
    status: z.string().refine((value) => value === "Ativo", { message: "Não podemos excluir produtos com status ativo" }),
});

export type ProductSchema = z.infer<typeof productValidationSchema>;