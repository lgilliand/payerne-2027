import type { Metadata } from "next";
import Block from "@/components/Block";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Boutique" };

export default function BoutiquePage() {
  return (
    <>
      <Block
        headingLevel={1}
        title="Boutique"
        text="Avant le décollage fin juillet, préparez votre paquetage ! Retrouvez ici les articles officiels du giron. Merci pour votre soutien, chaque achat nous aide à prendre de l'altitude."
      />

      <div className={`container ${styles.shop}`}>
        <iframe
          id="pay-embed"
          className={styles.frame}
          src={site.shopUrl}
          title="Boutique du Giron de la Broye 2027"
          allow="payment *"
        />
        <p className={styles.fallback}>
          La boutique ne s&apos;affiche pas ?{" "}
          <a href={site.shopUrl} target="_blank" rel="noopener noreferrer">
            Ouvrir dans un nouvel onglet
          </a>
        </p>
      </div>
    </>
  );
}
