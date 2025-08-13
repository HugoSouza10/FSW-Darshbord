"use server";
import { db } from "@/app/_lib/prisma";
import { createProductSchema, CreateProductSchema } from "./schemas";
import { revalidatePath } from "next/cache";


//Todas as funções nesse arquivo serão tratada como uma server actions.
//Essas funções serão sempre executadas no servidor.

export const createProduct = async (data: CreateProductSchema) => {
    createProductSchema.parse(data)
    await db.product.create({
        data,
    })
    revalidatePath('get-products'); // Invalida o cache da tag 'get-products'
};