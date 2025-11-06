import { Button } from "@/app/_components/ui/button";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import {
  ClipboardCopyIcon,
  Edit,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";

interface SalesTableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}
const SalesTableDropdownMenu = ({product, onDelete}: SalesTableDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(product.id)}
          className="gap-1.5"
        >
          <ClipboardCopyIcon size={16} />
          Copiar ID
        </DropdownMenuItem>
        <DialogTrigger asChild>
          <DropdownMenuItem className="gap-1.5">
            <Edit size={16} />
            Editar
          </DropdownMenuItem>
        </DialogTrigger>
        <DropdownMenuItem onClick={()=> onDelete(product.id)} className="gap-1.5">
            <TrashIcon size={16} />
            Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SalesTableDropdownMenu;
