import { PlusIcon } from 'lucide-react';
import { Button } from '../_components/ui/button';
import { DataTable } from '../_components/ui/data-table';
import { productTableColumns } from './_components/table-columns';
import { cachedGetProducts, cachedGetRandomNumber, getProducts } from '../_data_access/get-products';
import { AddProductButton } from './_components/add-product-button';
 
 const ProductPage = async () => {
    /*Podemos chamar nosso banco direto do servidor(SSR)
      const products = await getProducts();*/
    /*
    Apenas referencia*/
    //PÁGINA GERADA VIA ISR, PÁGINA ESTÁTICA COM REVALIDAÇÃO
    //Podemos chamar nosso banco direto do servidor
    //const products = await getProducts();
    /*
    Apenas referencia*/
    //Aqui estamos chamando uma página ISR com validação de 5 segundos
    /*
   const response = await fetch("http://localhost:3000/api/products", {
        method: "GET",
        next: {
            revalidate: 5
        }
    });
    const {products, randomNumber} = await response.json(); // Isso é o que falta
    console.log(randomNumber)*/

    const products = await cachedGetProducts();
    const randomNumber = await cachedGetRandomNumber()
    
    return (
       <div className="m-8 rounded-lg bg-white w-full space-y-8 p-8">
            {/*ESQUERDA */}
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                   <p>{randomNumber}</p>
                    <span className="text-xs font-semibold text-slate-500">
                        Gestão de produtos
                    </span>
                    <div className="text-xl font-semibold">
                        Produtos
                    </div>
                </div>
                <AddProductButton/>
            </div>
             <DataTable columns={productTableColumns} 
              data={products}/>
             {/*DIREITA */}
       </div>
    )
}

export default ProductPage;