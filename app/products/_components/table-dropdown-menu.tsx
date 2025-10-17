import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ClipboardCopyIcon, Edit, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import UpsertProductDialogContent from "./upsert-dialog-content";
import DeleteDialogContent from "./delete-dialog-content";

interface ProductTableDropdownMenuProps {
  product: Product
}
const ProductTableDropdownMenu = ({product}: ProductTableDropdownMenuProps) => {
   const [editDialogOpen, setEditDialogOpen] = useState(false);
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

export default ProductTableDropdownMenu;