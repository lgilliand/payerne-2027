"use client";

import { useEffect, useState } from "react";
import styles from "./Countdown.module.css";

type CountdownProps = {
  /** Date cible au format ISO, avec fuseau (ex. "2027-07-28T16:00:00+02:00") */
  target: string;
  label: string;
  /** Message affiché une fois la date passée */
  doneLabel: string;
};

const UNITS = [
  { label: "jours", ms: 86_400_000 },
  { label: "heures", ms: 3_600_000 },
  { label: "minutes", ms: 60_000 },
  { label: "secondes", ms: 1_000 },
];

function split(remaining: number) {
  return UNITS.map(({ label, ms }, i) => {
    const above = i === 0 ? Infinity : UNITS[i - 1].ms;
    return { label, value: Math.floor((remaining % above) / ms) };
  });
}

export default function Countdown({ target, label, doneLabel }: CountdownProps) {
  const end = new Date(target).getTime();
  // null tant que la page n'est pas chargée : le HTML statique est généré au build,
  // l'heure réelle n'est connue que dans le navigateur
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  if (remaining === 0) {
    return <p className={styles.done}>{doneLabel}</p>;
  }

  return (
    <div className={styles.countdown}>
      <p className={styles.label}>{label}</p>
      <div className={styles.units} role="timer" aria-live="off">
        {split(remaining ?? 0).map(({ label, value }) => {
          const digits = remaining === null ? "--" : String(value).padStart(2, "0");
          return (
            <div key={label} className={styles.unit}>
              <div className={styles.flaps}>
                {digits.split("").map((digit, i) => (
                  // La clé change avec le chiffre : le volet est rejoué à chaque changement
                  <span key={`${i}-${digit}`} className={styles.flap}>
                    {digit}
                  </span>
                ))}
              </div>
              <span className={styles.unitLabel}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
