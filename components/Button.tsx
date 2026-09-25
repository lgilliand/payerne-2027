import Link from "next/link";
import styles from "./Button.module.css";

export type ButtonProps = {
  label: string;
  /**
   * Destination du bouton :
   * - page interne : "/billetterie/"
   * - ancre : "#programme"
   * - lien externe : "https://…" (ouvert dans un nouvel onglet)
   * - e-mail / téléphone : "mailto:…" / "tel:…"
   */
  href: string;
  variant?: "primary" | "secondary";
};

export default function Button({ label, href, variant = "primary" }: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={className}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {label}
    </a>
  );
}
