import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo."),
  whatsapp: z
    .string()
    .trim()
    .refine(
      (value) => value.replace(/\D/g, "").length >= 10,
      "Informe um WhatsApp válido.",
    ),
  interest: z.string().min(1, "Selecione o que você procura."),
});

export type ContactInput = z.infer<typeof contactSchema>;
