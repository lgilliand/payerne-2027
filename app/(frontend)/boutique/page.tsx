import PageIntro from "@/components/PageIntro";
import { getSettings, pageMetadata } from "@/lib/cms";
import styles from "./page.module.css";

export const generateMetadata = () => pageMetadata("boutique");

export default async function BoutiquePage() {
  const { shopUrl } = await getSettings();

  return (
    <>
      <PageIntro slug="boutique" />

      <div className={`container ${styles.shop}`}>
        <iframe
          id="pay-embed"
          className={styles.frame}
          src={shopUrl}
          title="Boutique du Giron de la Broye 2027"
          allow="payment *"
        />
        <p className={styles.fallback}>
          La boutique ne s&apos;affiche pas ?{" "}
          <a href={shopUrl} target="_blank" rel="noopener noreferrer">
            Ouvrir dans un nouvel onglet
          </a>
        </p>
      </div>
    </>
  );
}
