import 'server-only';
import { Product } from "@prisma/client"
import { db } from "../_lib/prisma"

//Aqui nessa função podemos limitar o retorno da função para retornar
//apenas dados que não sensíveis.

/*Por, exemplo, se fosse retornar uma lista de usuários, a gente não poderia de forma nenhuma
retorna a senha junto dos outros dados */
export const getProducts =  async (): Promise<Product[]> => {
    return db.product.findMany({});
}
