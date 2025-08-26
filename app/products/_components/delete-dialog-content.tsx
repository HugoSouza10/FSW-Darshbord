import { deleteProduct } from "@/app/_actions/product/delete-product";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "sonner";


interface DeleteDialogContentProps {
    productId: string;
}
const DeleteDialogContent = ({productId}: DeleteDialogContentProps) => {
    const handleContinueClick = async () => {
        try {
            await deleteProduct({ id: productId });
            toast.success("Produto deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar o produto:", error);
            toast.error("Erro ao deletar o produto. Tente novamente.");
        }
    }
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você está prestes a deletar o produto
                      Esta ação não pode ser desfeita. Deseja continuar?
                    </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleContinueClick}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}

export default DeleteDialogContent;