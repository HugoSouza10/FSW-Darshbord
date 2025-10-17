"use client"

import { AlertDialog } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Product } from "@prisma/client"
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon, ClipboardCopyIcon, Edit, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import DeleteDialogContent from "./delete-dialog-content";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpsertProductDialogContent from "./upsert-dialog-content";
import { useState } from "react";

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
    cell: (row) => {
      const produto = row.row.original;
     return Intl.NumberFormat("pt-Br", {
       style: "currency",
       currency: "BRL",
     }).format(Number(produto.price));
    }
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
      const [editDialogOpen, setEditDialogOpen] = useState(false);
      const product = row.row.original;
      return (
        <AlertDialog>
          <Dialog open = {editDialogOpen} onOpenChange={setEditDialogOpen}>
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
                    <DialogTrigger asChild>
                      <DropdownMenuItem className="gap-1.5">
                        <Edit size={16} />
                        Editar
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem className="gap-1.5">
                          <TrashIcon size={16} />
                            Deletar
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <UpsertProductDialogContent defaultValue={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              stock: product.stock,
            }}
             onSuccess = {()=> setEditDialogOpen(false)}
            />
            <DeleteDialogContent productId={product.id}/>
          </Dialog>
       </AlertDialog>
      );
    }
  }
]
