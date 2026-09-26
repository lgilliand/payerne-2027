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
};

// Le style s'adapte au fond : voir Button.module.css et la classe globale .theme-dark
export default function Button({ label, href }: ButtonProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={styles.button}>
        {label}
      </Link>
    );
  }

  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={styles.button}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {label}
    </a>
  );
}
