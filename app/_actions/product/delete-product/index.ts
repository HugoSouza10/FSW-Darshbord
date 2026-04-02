"use server";
import { db } from "@/app/_lib/prisma";
import { deleteProductSchema } from "./schemas";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";

export const deleteProduct = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    (await db.product.delete({
      where: {
        id,
      },
    }),
      revalidatePath("/products")); // Invalida o cache da rota '/products'
  });
