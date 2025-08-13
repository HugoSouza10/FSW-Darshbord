"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon, ClipboardCopyIcon, Edit, MoreHorizontalIcon, TrashIcon } from "lucide-react";

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
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
               <MoreHorizontalIcon size={16}/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=> navigator.clipboard.writeText(product.id)} className="gap-1.5">
                <ClipboardCopyIcon size={16}/>
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1.5">
                <Edit size={16} />
                 Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1.5">
                <TrashIcon size={16} />
                 Deletar
              </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
      );
    }
  }
]
