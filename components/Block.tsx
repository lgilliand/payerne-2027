import Button, { type ButtonProps } from "./Button";
import styles from "./Block.module.css";

export type BlockProps = {
  /** Identifiant HTML, utile pour faire des ancres (ex. /programme/#samedi) */
  id?: string;
  title?: string;
  /** Texte simple ou contenu JSX (paragraphes, listes, liens…) */
  text?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  };
  /** Sur grand écran, l'image est placée à gauche ou à droite du texte */
  imagePosition?: "left" | "right";
  action?: ButtonProps;
  /** Niveau du titre : 1 pour le premier bloc de la page, 2 par défaut */
  headingLevel?: 1 | 2 | 3;
};

export default function Block({
  id,
  title,
  text,
  image,
  imagePosition = "left",
  action,
  headingLevel = 2,
}: BlockProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <section
      id={id}
      className={`container ${styles.block}`}
      data-image={image ? imagePosition : undefined}
    >
      {image && (
        // Balise <img> native : aucun JavaScript embarqué pour les images
        <img className={styles.image} src={image.src} alt={image.alt} loading="lazy" />
      )}

      <div className={styles.content}>
        {title && <Heading className={styles.title}>{title}</Heading>}
        {text && (
          <div className={styles.text}>
            {typeof text === "string" ? <p>{text}</p> : text}
          </div>
        )}
        {action && <Button {...action} />}
      </div>
    </section>
  );
}
