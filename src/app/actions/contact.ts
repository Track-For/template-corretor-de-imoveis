"use server";

import { contactSchema, type ContactInput } from "@/lib/contactSchema";
import { Resend } from "resend";

export type ContactResult = {
  success: boolean;
  message: string;
};

export async function sendContact(
  input: ContactInput,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Revise os campos destacados e tente novamente.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;

  if (!apiKey) {
    console.info("[Aurora Residências] Novo contato:", parsed.data);
    return {
      success: true,
      message: "Recebemos seus dados. Falaremos com você em breve.",
    };
  }

  if (!recipient) {
    console.error("CONTACT_EMAIL não foi configurado.");
    return {
      success: false,
      message: "Não foi possível enviar agora. Tente novamente em instantes.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Aurora Residências <onboarding@resend.dev>",
      to: recipient,
      subject: `Nova curadoria solicitada por ${parsed.data.name}`,
      text: [
        `Nome: ${parsed.data.name}`,
        `WhatsApp: ${parsed.data.whatsapp}`,
        `Interesse: ${parsed.data.interest}`,
      ].join("\n"),
    });

    if (error) {
      console.error("Falha no envio pelo Resend:", error);
      return {
        success: false,
        message: "Não foi possível enviar agora. Tente novamente em instantes.",
      };
    }

    return {
      success: true,
      message: "Recebemos seus dados. Falaremos com você em breve.",
    };
  } catch (error) {
    console.error("Erro ao enviar contato:", error);
    return {
      success: false,
      message: "Não foi possível enviar agora. Tente novamente em instantes.",
    };
  }
}
