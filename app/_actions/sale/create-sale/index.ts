"use server";
import { db } from "@/app/_lib/prisma";
import { createSaleSchema, CreateSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);
  const sale = await db.sale.create({
    data: {
      date: new Date(),
    },
  });

  // Create SaleProduct e armazenar os produtos vendidos
  for (const product of data.products) {
    const productFromDb = (
      await db.product.findUnique({
        where: {
          id: product.id,
        },
      })
    );

    if (!productFromDb) {
      throw new Error("Produto não encontrado");
    }
    const productIsOutOfStock = product.quantity > productFromDb.stock;
    if (productIsOutOfStock) {
      throw new Error(
        `Quantidade indisponível em estoque para o produto ${productFromDb.name}.`
      );
    }
    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb.price,
      },
    });
    //Depois de criar uma venda, atualizar o estoque do produto
    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: {
          decrement: product.quantity,
        }
      }
    })
    revalidatePath("/products");
  }
};
