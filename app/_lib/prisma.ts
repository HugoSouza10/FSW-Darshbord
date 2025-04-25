/* eslint-disable no-unused-vars */
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: ReturnType<typeof createPrismaClient>;
}

const createPrismaClient = () => {
    // Isso é importante para fazer a lógica da coluna status
    //Só consigo fazer isso com colunas que estão na mesma tabela
    return new PrismaClient().$extends({
        result: {
            product: {
                status: {
                    needs: {stock: true},
                    compute(product) {
                        if(product.stock <= 0) {
                            return "OUT_OF_STOCK";
                        }
                        return "IN_STOCK";
                    },
                },
            },
        },
    });
};

let prisma: ReturnType<typeof createPrismaClient>;
if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;