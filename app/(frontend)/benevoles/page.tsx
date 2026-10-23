import BenevooEmbed from "@/components/BenevooEmbed";
import PageIntro from "@/components/PageIntro";
import { getSettings, pageMetadata } from "@/lib/cms";
import styles from "./page.module.css";

export const generateMetadata = () => pageMetadata("benevoles");

export default async function BenevolesPage() {
  const { volunteerUrl } = await getSettings();
  // L'identifiant de la manifestation est la fin de l'adresse publique Benevoo
  const benevooEventId = volunteerUrl.split("/").pop() ?? "";

  return (
    <>
      <PageIntro slug="benevoles" />

      <div className={`container ${styles.form}`}>
        <BenevooEmbed eventId={benevooEventId} title="Inscription des bénévoles" />
        <p className={styles.fallback}>
          Le formulaire ne s&apos;affiche pas ?{" "}
          <a href={volunteerUrl} target="_blank" rel="noopener noreferrer">
            Ouvrir dans un nouvel onglet
          </a>
        </p>
      </div>
    </>
  );
}
