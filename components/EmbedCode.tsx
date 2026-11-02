"use client";

import { useEffect, useRef } from "react";

/**
 * Code HTML saisi dans /admin (billetterie Strap'n'pay…).
 * Les <script> ajoutés par innerHTML ne s'exécutent pas : ils sont recréés.
 * Un script externe déjà chargé dans la page (ouverture d'un autre événement…) ne l'est pas une deuxième fois.
 */
export default function EmbedCode({ html, className }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = html;

    for (const original of container.querySelectorAll("script")) {
      const src = original.getAttribute("src");
      const url = src ? new URL(src, location.href).href : null;
      const alreadyLoaded =
        url && [...document.scripts].some((script) => script.src === url && !container.contains(script));
      if (alreadyLoaded) {
        original.remove();
        continue;
      }
      const script = document.createElement("script");
      for (const { name, value } of original.attributes) script.setAttribute(name, value);
      script.text = original.text;
      original.replaceWith(script);
    }

    return () => {
      container.innerHTML = "";
    };
  }, [html]);

  return <div ref={ref} className={className} />;
}
