"use server";
import { db } from "@/app/_lib/prisma";
import { createSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from 'next-safe-action';

//Server action feita para rodar exclusivamente no servidor

/*Como funciona o  next-safe-action?
  Definimos um schema (geralmente com Zod) para a action. O next-safe-action 
  valida automaticamente os dados de entrada com base nesse schema. Se a validação 
  falhar, ele retorna os erros de forma estruturada, e podemos usar returnValidationErrors
  para tratar esses erros de maneira controlada.
*/
export const createSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products } }) => {
    await db.$transaction(async (trx) => {
      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });

      // Create SaleProduct e armazenar os produtos vendidos
      for (const product of products) {
        const productFromDb = await db.product.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!productFromDb) {
         returnValidationErrors(createSaleSchema, {
            _errors: ["Product not found"]
         })
        }
        const productIsOutOfStock = product.quantity > productFromDb.stock;
        if (productIsOutOfStock) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Product out of stock"]
          })
        }
        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price,
          },
        });
        //Depois de criar uma venda, atualizar o estoque do produto
        await trx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
        revalidatePath("/products");
      }
    });
  });
