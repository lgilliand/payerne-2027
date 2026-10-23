"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import { getSettings } from "@/lib/cms";

const fields = {
  lastName: { label: "Nom", max: 100 },
  firstName: { label: "Prénom", max: 100 },
  email: { label: "E-mail", max: 200 },
  subject: { label: "Sujet", max: 150 },
  message: { label: "Message", max: 5000 },
};

export type ContactField = keyof typeof fields;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Valeurs saisies, pour ne pas vider le formulaire en cas d'erreur */
  values?: Partial<Record<ContactField, string>>;
};

export async function sendContactMessage(_: ContactState, formData: FormData): Promise<ContactState> {
  // Champ piège invisible : seul un robot le remplit. On fait comme si l'envoi avait réussi.
  if (formData.get("website")) return { status: "success" };

  const values = Object.fromEntries(
    Object.keys(fields).map((name) => [name, String(formData.get(name) ?? "").trim()]),
  ) as Record<ContactField, string>;

  const errors: ContactState["errors"] = {};
  for (const [name, { label, max }] of Object.entries(fields) as [ContactField, { label: string; max: number }][]) {
    if (!values[name]) errors[name] = `${label} : champ obligatoire.`;
    else if (values[name].length > max) errors[name] = `${label} : ${max} caractères au maximum.`;
  }
  if (values.email && !errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "E-mail : adresse invalide.";
  }
  if (Object.keys(errors).length) {
    return { status: "error", message: "Merci de corriger les champs indiqués.", errors, values };
  }

  const { email: to } = await getSettings();
  try {
    // Sans SMTP, Payload affiche l'e-mail dans les logs sans l'envoyer : acceptable en local seulement
    if (process.env.NODE_ENV === "production" && !process.env.SMTP_HOST) {
      throw new Error("SMTP non configuré (voir .env.example)");
    }
    const payload = await getPayload({ config });
    await payload.sendEmail({
      to,
      // « Répondre » dans la messagerie écrit directement à la personne
      replyTo: `${values.firstName} ${values.lastName} <${values.email}>`,
      // Retours à la ligne retirés : un sujet tient sur une ligne
      subject: `[Site web] ${values.subject.replace(/\s+/g, " ")}`,
      text: [
        "Message envoyé depuis le formulaire de contact du site web.",
        "",
        `Nom : ${values.lastName}`,
        `Prénom : ${values.firstName}`,
        `E-mail : ${values.email}`,
        `Sujet : ${values.subject}`,
        "",
        values.message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Envoi du formulaire de contact impossible", error);
    return {
      status: "error",
      message: `Le message n'a pas pu être envoyé. Réessaie plus tard ou écris-nous directement à ${to}.`,
      values,
    };
  }

  return { status: "success", message: "Merci pour ton message ! Nous te répondrons dès que possible." };
}
