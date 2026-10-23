import type { Metadata } from "next";
import Block from "@/components/Block";
import BenevooEmbed from "@/components/BenevooEmbed";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Bénévoles" };

export default function BenevolesPage() {
  return (
    <>
      <Block
        headingLevel={1}
        title="Bénévoles"
        text={
          <>
            <p>Les pré-inscriptions des bénévoles sont ouvertes !</p>
            <p>
              Réserve dès maintenant ta place dans l&apos;équipage pour ne pas rater la tranche
              horaire qui te convient le mieux.
            </p>
          </>
        }
      />

      <div className={`container ${styles.form}`}>
        <BenevooEmbed eventId={site.benevooEventId} title="Inscription des bénévoles" />
        <p className={styles.fallback}>
          Le formulaire ne s&apos;affiche pas ?{" "}
          <a href={site.volunteerUrl} target="_blank" rel="noopener noreferrer">
            Ouvrir dans un nouvel onglet
          </a>
        </p>
      </div>
    </>
  );
}
