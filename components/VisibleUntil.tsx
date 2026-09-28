"use client";

import { useEffect, useState } from "react";

type VisibleUntilProps = {
  /** Date ISO avec fuseau à partir de laquelle le contenu est masqué */
  date: string;
  children: React.ReactNode;
};

/**
 * Masque son contenu à partir d'une date.
 * Le site étant statique, la vérification se fait dans le navigateur du visiteur :
 * le contenu disparaît sans avoir à remettre le site en ligne.
 */
export default function VisibleUntil({ date, children }: VisibleUntilProps) {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    setExpired(Date.now() >= new Date(date).getTime());
  }, [date]);

  return expired ? null : children;
}
