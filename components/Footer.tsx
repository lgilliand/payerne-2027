import Button from "./Button";
import { FacebookIcon, InstagramIcon, TiktokIcon } from "./SocialIcons";
import { getSettings } from "@/lib/cms";
import { isPublished } from "@/lib/navigation";
import { site } from "@/lib/site";
import styles from "./Footer.module.css";

export default async function Footer() {
  const settings = await getSettings();
  const socialLinks = [
    { label: "Instagram", href: settings.social.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: settings.social.facebook, Icon: FacebookIcon },
    { label: "TikTok", href: settings.social.tiktok, Icon: TiktokIcon },
  ];

  return (
    <footer className={`theme-dark ${styles.footer}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.column}>
          <p className={styles.title}>
            {site.name} à {site.city}
          </p>
          <p className={styles.dates}>{settings.dates}</p>
          <div className={styles.buttons}>
            {isPublished("/programme") && <Button label="Programme" href="/programme" />}
            <Button label="Bénévoles" href="/benevoles" />
          </div>
        </div>

        <div className={styles.column}>
          <h2 className={styles.heading}>Contact</h2>

          <h3 className={styles.subheading}>E-mail</h3>
          <p>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </p>

          <h3 className={styles.subheading}>Président d&apos;organisation</h3>
          <p>{settings.president}</p>

          <ul className={styles.social}>
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon className={styles.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} {site.name} · Site réalisé par Loris Gilliand
        </p>
      </div>
    </footer>
  );
}
