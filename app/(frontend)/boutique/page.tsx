import PageIntro from "@/components/PageIntro";
import StrapnpayStore from "@/components/StrapnpayStore";
import { getSettings, pageMetadata } from "@/lib/cms";
import styles from "./page.module.css";

export const generateMetadata = () => pageMetadata("boutique");

export default async function BoutiquePage() {
  const { shopUrl } = await getSettings();

  return (
    <>
      <PageIntro slug="boutique" />

      <div className={`container ${styles.shop}`}>
        <StrapnpayStore url={shopUrl} />
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
