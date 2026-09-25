"use client";

import { sendContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactInput } from "@/lib/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function Contact() {
  const [serverMessage, setServerMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", whatsapp: "", interest: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    setServerMessage(null);
    const result = await sendContact(data);
    setServerMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
    if (result.success) reset();
  });

  return (
    <section
      aria-labelledby="contact-title"
      className="pb-[clamp(5rem,9vw,9rem)]"
      id="contato"
    >
      <div className="site-container">
        <div className="grid gap-12 rounded-[32px] bg-bronze px-5 py-8 text-white sm:px-8 md:grid-cols-12 md:items-center md:px-12 md:py-14 lg:gap-20 lg:px-20 lg:py-20">
          <div className="md:col-span-6">
            <h2
              className="font-display text-[clamp(2.75rem,5.7vw,5.75rem)] font-light leading-[0.98] tracking-[-0.045em]"
              data-reveal-title
              id="contact-title"
            >
              Receba sua curadoria em até 24 horas.
            </h2>
            <p className="mt-7 max-w-lg text-[1.0625rem] leading-7 text-white/82">
              Conte o que você procura. Nós retornamos com as primeiras perguntas
              para começar uma seleção feita para o seu momento.
            </p>
            <a
              className="group mt-9 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/45 px-5 text-sm font-semibold transition-colors hover:bg-white hover:text-bronze"
              href="https://wa.me/[NUMERO]"
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.8} />
              Falar pelo WhatsApp
            </a>
          </div>

          <form
            className="rounded-[26px] bg-sand p-5 text-ink shadow-[0_28px_80px_rgba(59,36,11,0.22)] sm:p-7 md:col-span-6 lg:p-9"
            noValidate
            onSubmit={onSubmit}
          >
            <div className="grid gap-5">
              <label className="grid gap-2" htmlFor="contact-name">
                <span className="text-sm font-bold">Nome</span>
                <input
                  {...register("name")}
                  data-cursor="hide"
                  aria-invalid={Boolean(errors.name)}
                  autoComplete="name"
                  className="min-h-12 rounded-xl border border-line bg-white/45 px-4 text-base text-ink placeholder:text-muted/75 focus:border-bronze focus:outline-none"
                  id="contact-name"
                  placeholder="Como podemos chamar você?"
                  type="text"
                />
                {errors.name ? (
                  <span className="text-sm font-medium text-[#9a2f22]" role="alert">
                    {errors.name.message}
                  </span>
                ) : null}
              </label>

              <label className="grid gap-2" htmlFor="contact-whatsapp">
                <span className="text-sm font-bold">WhatsApp</span>
                <input
                  {...register("whatsapp")}
                  data-cursor="hide"
                  aria-invalid={Boolean(errors.whatsapp)}
                  autoComplete="tel"
                  className="min-h-12 rounded-xl border border-line bg-white/45 px-4 text-base text-ink placeholder:text-muted/75 focus:border-bronze focus:outline-none"
                  id="contact-whatsapp"
                  inputMode="tel"
                  onChange={(event) => {
                    const value = maskPhone(event.target.value);
                    event.target.value = value;
                    setValue("whatsapp", value, { shouldValidate: true });
                  }}
                  placeholder="(00) 00000-0000"
                  type="tel"
                />
                {errors.whatsapp ? (
                  <span className="text-sm font-medium text-[#9a2f22]" role="alert">
                    {errors.whatsapp.message}
                  </span>
                ) : null}
              </label>

              <label className="grid gap-2" htmlFor="contact-interest">
                <span className="text-sm font-bold">O que você procura?</span>
                <select
                  {...register("interest")}
                  data-cursor="hide"
                  aria-invalid={Boolean(errors.interest)}
                  className="min-h-12 rounded-xl border border-line bg-white/45 px-4 text-base text-ink focus:border-bronze focus:outline-none"
                  id="contact-interest"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Cobertura">Cobertura</option>
                  <option value="Ainda não sei">Ainda não sei</option>
                </select>
                {errors.interest ? (
                  <span className="text-sm font-medium text-[#9a2f22]" role="alert">
                    {errors.interest.message}
                  </span>
                ) : null}
              </label>
            </div>

            <Button
              className="mt-7 w-full"
              disabled={isSubmitting}
              showArrow={!isSubmitting}
              type="submit"
              variant="ink"
            >
              {isSubmitting ? "Enviando..." : "Quero minha curadoria"}
            </Button>

            <div aria-live="polite" className="min-h-7 pt-4">
              {serverMessage ? (
                <p
                  className={`flex items-start gap-2 text-sm font-semibold ${
                    serverMessage.type === "success"
                      ? "text-[#35653b]"
                      : "text-[#9a2f22]"
                  }`}
                  role={serverMessage.type === "error" ? "alert" : "status"}
                >
                  {serverMessage.type === "success" ? (
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
                  ) : null}
                  {serverMessage.text}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
