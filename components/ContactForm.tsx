"use client";

import { cloneElement, useActionState } from "react";
import { type ContactField, type ContactState, sendContactMessage } from "@/app/(frontend)/contact/actions";
import buttonStyles from "./Button.module.css";
import styles from "./ContactForm.module.css";

const initialState: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  // Champ avec son libellé et son message d'erreur éventuel
  const field = (name: ContactField, label: string, input: React.ReactElement<React.InputHTMLAttributes<HTMLElement>>) => {
    const error = state.errors?.[name];
    return (
      <div className={styles.field}>
        <label htmlFor={`contact-${name}`}>{label}</label>
        {cloneElement(input, {
          id: `contact-${name}`,
          name,
          required: true,
          // Après un envoi, le formulaire est vidé : en cas d'erreur, il reprend les valeurs saisies
          defaultValue: state.values?.[name],
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? `contact-${name}-error` : undefined,
        })}
        {error && (
          <p id={`contact-${name}-error`} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form action={formAction} className={`container ${styles.form}`} noValidate>
      {state.message && (
        <p className={state.status === "success" ? styles.success : styles.alert} role="status">
          {state.message}
        </p>
      )}

      <div className={styles.row}>
        {field("lastName", "Nom", <input type="text" autoComplete="family-name" maxLength={100} />)}
        {field("firstName", "Prénom", <input type="text" autoComplete="given-name" maxLength={100} />)}
      </div>
      {field("email", "E-mail", <input type="email" autoComplete="email" maxLength={200} />)}
      {field("subject", "Sujet", <input type="text" maxLength={150} />)}
      {field("message", "Message", <textarea rows={8} maxLength={5000} />)}

      {/* Champ piège pour les robots, invisible pour les visiteurs */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="contact-website">Site web</label>
        <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className={`${buttonStyles.button} ${styles.submit}`} disabled={pending}>
        {pending ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
