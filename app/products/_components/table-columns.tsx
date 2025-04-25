"use client"

import { Badge } from "@/components/ui/badge";
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon } from "lucide-react";

//Aqui estamos criando os dados de configuração da tabela produto

const getStatusLabel = (status: string) => {
  if(status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Fora de estoque";
}
export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
      return <Badge className="gap-1.5" variant={label === 'Em estoque' ? 'default': 'outline'}>
        <CircleIcon  
            size={15} 
            className={`${label === 'Em estoque' ? 'fill-primary-foreground' : 'fill-destructive-foreground'}`}
          />
        {label}
      </Badge>
    },
  },
]
