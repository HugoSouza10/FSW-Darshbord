import { PlusIcon } from 'lucide-react';
import { Button } from '../_components/ui/button';
import { DataTable } from '../_components/ui/data-table';
import { productTableColumns } from './_components/table-columns';
import { getProducts } from '../_data_access/get-products';
 
 const ProductPage = async () => {
    //Podemos chamar nosso banco direto do servidor
    const products = await getProducts();
    /*
    Apenas referencia
    const products = await fetch("http://localhost:3000/api/products");
    const data = await products.json(); // Isso é o que falta
    console.log(data);
    */
    return (
       <div className="m-8 rounded-lg bg-white w-full space-y-8 p-8">
            {/*ESQUERDA */}
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-500">
                        Gestão de produtos
                    </span>
                    <div className="text-xl font-semibold">
                        Produtos
                    </div>
                </div>
                <Button className='gap-2'>
                    <PlusIcon size={20}/>
                    Novo produto
                </Button>
            </div>
             <DataTable columns={productTableColumns} 
              data={JSON.parse(JSON.stringify(products))}/>
             {/*DIREITA */}
       </div>
    )
}

export default ProductPage;