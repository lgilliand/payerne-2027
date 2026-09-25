import Link from "next/link";
import { navigation } from "@/lib/navigation";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.title}>Giron de la Broye 2027</p>
          <p className={styles.muted}>Payerne, Suisse</p>
        </div>

        <nav aria-label="Liens du pied de page">
          <ul className={styles.links}>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Giron de la Broye 2027
        </p>
      </div>
    </footer>
  );
}
