"use server";
import { db } from "@/app/_lib/prisma";
import { UpsertProductSchema } from "./schemas";
import { revalidatePath, revalidateTag } from "next/cache";


//Todas as funções nesse arquivo serão tratada como uma server actions.
//Essas funções serão sempre executadas no servidor.

export const upsertProduct = async (data: UpsertProductSchema) => {
    UpsertProductSchema.parse(data)
    await db.product.upsert({
       where: {id: data?.id ?? ''},
       update: data,
       create: data
    })
    revalidateTag('get-products'); // Invalida o cache da tag 'get-products'
};