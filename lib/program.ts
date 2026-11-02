import config from "@payload-config";
import { getPayload } from "payload";

// Horaires affichés à l'heure suisse, quel que soit le fuseau du serveur ou du visiteur
const timeZone = "Europe/Zurich";
const dayFormat = new Intl.DateTimeFormat("fr-CH", { timeZone, weekday: "long", day: "numeric", month: "long" });
const timeFormat = new Intl.DateTimeFormat("fr-CH", { timeZone, hour: "2-digit", minute: "2-digit" });
// Clé du jour (2027-07-28), pour regrouper les événements d'une même journée dans le filtre
const dayKeyFormat = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" });

/** Événements publiés, par ordre chronologique, avec leur lieu, leur catégorie et leur photo */
export async function getEvents() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "events",
    where: { _status: { equals: "published" } },
    sort: "date",
    depth: 1,
    pagination: false,
  });

  return docs.map((event) => {
    const date = new Date(event.date);
    const place = typeof event.place === "object" ? event.place : null;
    const category = typeof event.category === "object" ? event.category : null;
    const media = typeof event.image === "object" ? event.image : null;
    // Version carrée si elle existe (photos envoyées avant son ajout : recadrage par le CSS)
    const file = media?.sizes?.square?.url ? media.sizes.square : media;
    const hasGps = place?.latitude != null && place?.longitude != null;

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      day: dayKeyFormat.format(date),
      dayLabel: dayFormat.format(date),
      time: timeFormat.format(date),
      place: place && {
        id: place.id,
        name: place.name,
        mapUrl: hasGps
          ? `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`
          : undefined,
      },
      category: category && { id: category.id, name: category.name },
      image: file?.url ? { src: file.url, alt: media?.alt ?? "" } : undefined,
      link: event.link || undefined,
      embed: event.embed?.trim() || undefined,
    };
  });
}
