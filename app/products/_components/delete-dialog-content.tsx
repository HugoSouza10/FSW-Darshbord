import { deleteProduct } from "@/app/_actions/product/delete-product";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";


interface DeleteDialogContentProps {
    productId: string;
}
const DeleteDialogContent = ({productId}: DeleteDialogContentProps) => {
    //Action para deletar o produto, com mensagens de sucesso e erro usando toast
    const {execute: executeDeleteProduct} = useAction(deleteProduct, {
        onSuccess: () => {toast.success("Produto excluído com sucesso!")},
        onError: () => {toast.error("Erro ao excluir o produto. Tente novamente.")}
    });
    const handleContinueClick = () => executeDeleteProduct({id: productId});
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