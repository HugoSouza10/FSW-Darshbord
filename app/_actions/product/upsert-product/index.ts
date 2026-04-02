"use server";
import { db } from "@/app/_lib/prisma";
import { UpsertProductSchema } from "./schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";


//Todas as funções nesse arquivo serão tratada como uma server actions.
//Essas funções serão sempre executadas no servidor.


export const upsertProduct = actionClient.schema(UpsertProductSchema).action(async ({parsedInput: {id, ...data}}) => {
     await db.product.upsert({
       where: {id: id ?? ""}, // Se id for undefined, passamos uma string vazia para evitar erros
       update: data,
       create: data
    })
    revalidatePath('/products'); // Invalida o cache da rota '/products'
})
