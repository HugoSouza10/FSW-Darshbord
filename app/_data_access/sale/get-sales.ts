import "server-only";
import { db } from "@/app/_lib/prisma";

export interface SaleDto {
  id: string;
  productName: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
}
//Aqui nessa função podemos limitar o retorno da função para retornar
export const getSales = async (): Promise<SaleDto[]> => {
  // Todas vez que fazemos um include, o Prisma traz os dados relacionados àquele modelo. No caso, estamos trazendo os produtos relacionados à venda.
  const sales = await db.sale.findMany({
    include: { saleProducts: { include: { product: true } } }, // Inclui os produtos relacionados à venda
  });
  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productName: sale.saleProducts
      .map((saleProducts) => saleProducts.product.name)
      .join(" • "), // Junta os nomes dos produtos em uma string
    totalAmount: sale.saleProducts.reduce(
      (acc, saleProduct) =>
        acc + saleProduct.quantity * Number(saleProduct.unitPrice),
      0,
    ),
    totalProducts: sale.saleProducts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
  }));
};
