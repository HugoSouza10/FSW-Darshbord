import { getProducts } from "../_data_access/get-products";
import { ComboboxOption } from "@/components/ui/combobox";
import CreateSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";
import { getSales } from "../_data_access/sale/get-sales";
import { DataTable } from "../_components/ui/data-table";


export default async function SalesPage() {
    const sales = await getSales();
    const products = await getProducts();
    const productOptions: ComboboxOption[] = products.map((product)=> ({
      label: product.name,
      value: product.id
    }));
    return (
      <div className="m-8 rounded-lg bg-white w-full space-y-8 p-8">
          {/*ESQUERDA */}
              <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-500">
                          Gestão de vendas
                      </span>
                      <div className="text-xl font-semibold">
                          Produtos
                      </div>
                  </div>
                  <CreateSaleButton products={products} productsOptions={productOptions} />
                </div>
                 <DataTable columns={saleTableColumns} data={sales}/>
                 {/*DIREITA */}
        </div>
    );
  }
  