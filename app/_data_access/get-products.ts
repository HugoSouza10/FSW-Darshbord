import 'server-only';
import { Product } from "@prisma/client"
import { db } from "../_lib/prisma"
import { revalidateTag, unstable_cache } from 'next/cache';
import { get } from 'http';
import { resolve } from 'path';

//Aqui nessa função podemos limitar o retorno da função para retornar
//apenas dados que não sensíveis.

/*Por, exemplo, se fosse retornar uma lista de usuários, a gente não poderia de forma nenhuma
retorna a senha junto dos outros dados */
export const getProducts =  async (): Promise<Product[]> => {
    return db.product.findMany({});
}

/*ISG: Aqui criamos um ISC com tags, para que possamos invalidar o cache
quando um produto for criado ou atualizado.
tags: Vai funcionar apenas aqui devido o tag

O nome unstable_cache indica que ainda é experimental ou sujeito a mudanças.
*/
export const cachedGetProducts = unstable_cache(getProducts, ['getProducts'], {
    tags: ['get-products'],
    revalidate: 60, // Revalida a cada 60 segundos
})

export const cachedGetRandomNumber = unstable_cache(
    async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula uma espera de 1 segundo
        return Math.random();
    },
    ['getRandomNumber'],
    {
     tags: ['get-RandomNumber'], // Tag para invalidar o cache
     revalidate: 60, // Revalida a cada 10 segundos
    }
)