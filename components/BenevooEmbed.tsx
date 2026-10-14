"use client";

import { useEffect, useRef } from "react";
import styles from "./BenevooEmbed.module.css";

type BenevooEmbedProps = {
  /** Identifiant de la manifestation sur Benevoo (ex. "2d0d1e4c685c1539") */
  eventId: string;
  title: string;
};

/**
 * Formulaire d'inscription des bénévoles Benevoo.
 * Reprend le script fourni par Benevoo : l'iframe envoie sa hauteur par message
 * et on l'ajuste (sans dépasser la hauteur de l'écran).
 */
export default function BenevooEmbed({ eventId, title }: BenevooEmbedProps) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://benevoo.ch") return;
      if (!e.data || e.data.benevoo !== `benevoles-${eventId}`) return;
      const frame = ref.current;
      if (!frame) return;
      frame.style.height = `${Math.min(e.data.hauteur, window.innerHeight)}px`;
      if (e.data.modale) frame.scrollIntoView({ block: "center" });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [eventId]);

  return (
    <iframe
      ref={ref}
      id={`benevoo-benevoles-${eventId}`}
      className={styles.frame}
      src={`https://benevoo.ch/embed/benevoles/${eventId}?entete=1`}
      title={title}
      loading="lazy"
    />
  );
}
