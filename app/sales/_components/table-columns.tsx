"use client";

import { SaleDto } from "@/app/_data_access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currecy";
import { ColumnDef } from "@tanstack/react-table";
import SalesTableDropdownMenu from "./table-dropdow-menu";

//O acessorKey é a chave do objeto que queremos acessar, ou seja,
// a propriedade do objeto que queremos exibir naquela coluna.
// O header é o título da coluna que será exibido na tabela.
// A cell é uma função que recebe o valor da célula e retorna o
// conteúdo que será exibido naquela célula.
export const saleTableColumns: ColumnDef<SaleDto>[] = [
  {
    accessorKey: "productName",
    header: "Produtos",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de produtos",
  },
  {
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: ({row: {original: sale}}) => <SalesTableDropdownMenu sale={sale} />,
  },
];
