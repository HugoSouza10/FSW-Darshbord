import { z } from "zod";

export const UpsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: "O nome do produto é obrigatório",
  }),
  price: z.coerce
    .number()
    .refine((val) => !isNaN(val), {
      message: "O preço é obrigatório"
    })
    .min(0.01, {
      message: "O preço é obrigatório",
    }),
  stock: z
    .coerce
    .number()
    .int({
      message: "A quantidade em estoque deve ser um número inteiro",
    })
    .positive({
      message: "A quantidade em estoque deve ser positiva"
    })
});

export type UpsertProductSchema = z.infer<typeof UpsertProductSchema>;
