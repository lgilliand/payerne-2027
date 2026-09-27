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
    /**
     * Dimensions réelles de l'image : si elles sont fournies, l'image garde ses proportions.
     * Sinon, elle est recadrée au format 3:2.
     */
    width?: number;
    height?: number;
  };
  /** Sur grand écran, l'image est placée à gauche ou à droite du texte */
  imagePosition?: "left" | "right";
  action?: ButtonProps;
  /** Niveau du titre : 1 pour le premier bloc de la page, 2 par défaut */
  headingLevel?: 1 | 2 | 3;
  /** Contenu supplémentaire affiché sous le texte (compte à rebours, formulaire…) */
  children?: React.ReactNode;
};

export default function Block({
  id,
  title,
  text,
  image,
  imagePosition = "left",
  action,
  headingLevel = 2,
  children,
}: BlockProps) {
  const Heading = `h${headingLevel}` as const;
  // Le premier bloc de la page est visible dès l'ouverture : son image est chargée tout de suite
  const isFirst = headingLevel === 1;

  return (
    <section
      id={id}
      className={`container ${styles.block}`}
      data-image={image ? imagePosition : undefined}
    >
      {image && (
        // Balise <img> native : aucun JavaScript embarqué pour les images
        <img
          className={styles.image}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          style={image.width && image.height ? { aspectRatio: `${image.width} / ${image.height}` } : undefined}
          loading={isFirst ? "eager" : "lazy"}
          fetchPriority={isFirst ? "high" : undefined}
        />
      )}

      <div className={styles.content}>
        {title && <Heading className={styles.title}>{title}</Heading>}
        {text && (
          <div className={styles.text}>
            {typeof text === "string" ? <p>{text}</p> : text}
          </div>
        )}
        {children}
        {action && <Button {...action} />}
      </div>
    </section>
  );
}
