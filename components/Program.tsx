"use client";

import { useRef, useState } from "react";
import Button from "./Button";
import EmbedCode from "./EmbedCode";
import styles from "./Program.module.css";

export type ProgramEvent = {
  id: number;
  title: string;
  /** Texte déjà mis en forme côté serveur */
  description?: React.ReactNode;
  /** Jour au format 2027-07-28, pour le filtre */
  day: string;
  dayLabel: string;
  time: string;
  place: { id: number; name: string; mapUrl?: string } | null;
  category: { id: number; name: string } | null;
  image?: { src: string; alt: string };
  link?: string;
  /** Code HTML saisi dans /admin (billetterie…) */
  embed?: string;
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** Valeurs distinctes d'une liste, dans l'ordre de première apparition */
function unique<T>(items: (T | null | undefined)[], key: (item: T) => string | number) {
  const seen = new Map<string | number, T>();
  for (const item of items) if (item && !seen.has(key(item))) seen.set(key(item), item);
  return [...seen.values()];
}

export default function Program({ events }: { events: ProgramEvent[] }) {
  const [day, setDay] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState<ProgramEvent | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  // Les filtres ne proposent que les jours, lieux et catégories qui ont des événements
  const days = unique(
    events.map((event) => ({ value: event.day, label: capitalize(event.dayLabel) })),
    (option) => option.value,
  );
  const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name, "fr");
  const places = unique(events.map((event) => event.place), (p) => p.id).sort(byName);
  const categories = unique(events.map((event) => event.category), (c) => c.id).sort(byName);

  const filtered = events.filter(
    (event) =>
      (!day || event.day === day) &&
      (!place || String(event.place?.id) === place) &&
      (!category || String(event.category?.id) === category),
  );
  const isFiltered = Boolean(day || place || category);
  const reset = () => {
    setDay("");
    setPlace("");
    setCategory("");
  };

  const open = (event: ProgramEvent) => {
    setSelected(event);
    dialog.current?.showModal();
  };

  if (events.length === 0) return null;

  return (
    <div className={`container ${styles.program}`}>
      <div className={styles.filters}>
        <label className={styles.filter}>
          <span>Jour</span>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Tous les jours</option>
            {days.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.filter}>
          <span>Lieu</span>
          <select value={place} onChange={(e) => setPlace(e.target.value)}>
            <option value="">Tous les lieux</option>
            {places.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.filter}>
          <span>Catégorie</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Toutes les catégories</option>
            {categories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        {isFiltered && (
          <button type="button" className={styles.reset} onClick={reset}>
            Réinitialiser
          </button>
        )}
      </div>

      <p className={styles.count} aria-live="polite">
        {filtered.length} événement{filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length > 0 ? (
        <ul className={styles.grid}>
          {filtered.map((event) => (
            <li key={event.id} className={styles.card}>
              {event.image ? (
                <img className={styles.image} src={event.image.src} alt={event.image.alt} loading="lazy" />
              ) : (
                <div className={styles.image} aria-hidden="true" />
              )}
              <div className={styles.body}>
                {event.category && <p className={styles.category}>{event.category.name}</p>}
                <h2 className={styles.title}>
                  {/* Le bouton couvre toute la carte (voir .open::after) */}
                  <button type="button" className={styles.open} onClick={() => open(event)}>
                    {event.title}
                  </button>
                </h2>
                <p className={styles.when}>
                  {capitalize(event.dayLabel)} · {event.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          Aucun événement ne correspond à ces filtres.{" "}
          <button type="button" className={styles.reset} onClick={reset}>
            Réinitialiser les filtres
          </button>
        </p>
      )}

      {/* Détail de l'événement : fermeture avec Échap, le bouton ou un clic à côté */}
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="event-title"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        {selected && (
          <div className={styles.detail}>
            <button type="button" className={styles.close} onClick={() => dialog.current?.close()}>
              <span className="visually-hidden">Fermer</span>
              <span aria-hidden="true">×</span>
            </button>
            {selected.image && <img className={styles.image} src={selected.image.src} alt={selected.image.alt} />}
            <div className={styles.body}>
              {selected.category && <p className={styles.category}>{selected.category.name}</p>}
              <h2 id="event-title" className={styles.detailTitle}>
                {selected.title}
              </h2>
              <p className={styles.when}>
                {capitalize(selected.dayLabel)} · {selected.time}
                {selected.place && (
                  <>
                    <br />
                    {selected.place.name}
                    {selected.place.mapUrl && (
                      <>
                        {" · "}
                        <a href={selected.place.mapUrl} target="_blank" rel="noopener noreferrer">
                          Voir sur la carte
                        </a>
                      </>
                    )}
                  </>
                )}
              </p>
              {selected.description && <div className={styles.description}>{selected.description}</div>}
              {selected.link && <Button label="En savoir plus" href={selected.link} />}
              {selected.embed && <EmbedCode key={selected.id} html={selected.embed} className={styles.embed} />}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
