"use client";
import { NumericFormat } from "react-number-format";
import { Loader2Icon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertProduct } from "@/app/_actions/product/upsert-product";
import { UpsertProductSchema } from "@/app/_actions/product/upsert-product/schemas";

interface UpsertProductDialogContentProps {
    onSuccess?: () => void,
    defaultValue?: UpsertProductSchema 
}
const UpsertProductDialogContent = ({onSuccess, defaultValue}: UpsertProductDialogContentProps) => {
    const form = useForm<UpsertProductSchema>({
        shouldUnregister: true,
        resolver: zodResolver(UpsertProductSchema),
        defaultValues: defaultValue ?? {
          name: "",
          price: 0,
          stock: 1,
        },
    });
    const isEditing = !!defaultValue;
    const onSubmit = async (data: UpsertProductSchema) => {
        try {
           await upsertProduct({...data, id: defaultValue?.id});
           onSuccess?.();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <DialogContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <DialogHeader>
                <DialogTitle>{isEditing? 'Editar' : 'Criar'} produto</DialogTitle>
                <DialogDescription>
                    Insira as informações abaixo
                </DialogDescription>
                </DialogHeader>

                {/* Nome */}
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input placeholder="Digite o nome do produto" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />

                {/* Preço */}
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Preço</FormLabel>
                        <FormControl>
                            <NumericFormat
                            thousandSeparator="."
                            decimalSeparator=","
                            fixedDecimalScale
                            decimalScale={2}
                            prefix="R$ "
                            allowNegative={false}
                            customInput={Input}
                            onValueChange={(values) => field.onChange(values.floatValue)}
                            value={field.value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />

                {/* Estoque */}
                <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Estoque</FormLabel>
                        <FormControl>
                            <Input
                            type="number"
                            placeholder="Digite a quantidade em estoque"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary" type="reset">
                        Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        className="gap-1.5"
                        disabled={form.formState.isSubmitting}
                        type="submit"
                    >
                        {form.formState.isSubmitting && (
                        <Loader2Icon className="animate-spin" size={16} />
                        )}
                        Salvar
                    </Button>
                </DialogFooter>
            </form>
            </Form>
      </DialogContent>
    )
}

export default UpsertProductDialogContent;