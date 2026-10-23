import type { Field, GlobalConfig } from "payload";
import { paragraphs } from "../richText";

// Champs communs à toutes les pages : le bloc du haut et la description pour les moteurs de recherche.
// Valeurs par défaut sous forme de fonction : Payload ne les recopie pas dans le schéma SQL,
// où les apostrophes des textes casseraient la création des tables.
function introFields(title: string, intro: string[]): Field[] {
  return [
    { name: "title", label: "Titre", type: "text", required: true, defaultValue: () => title },
    { name: "intro", label: "Texte", type: "richText", required: true, defaultValue: () => paragraphs(...intro) },
    {
      name: "description",
      label: "Description pour Google",
      type: "textarea",
      admin: {
        position: "sidebar",
        description: "Optionnel : une ou deux phrases affichées sous le lien dans les résultats de recherche.",
      },
    },
  ];
}

function page(slug: string, label: string, intro: string[]): GlobalConfig {
  return {
    slug: `page-${slug}`,
    label,
    admin: { group: "Pages" },
    access: { read: () => true },
    fields: introFields(label, intro),
  };
}

// Accueil : le bloc du haut a aussi une photo et le compte à rebours
const home: GlobalConfig = {
  slug: "page-accueil",
  label: "Accueil",
  admin: { group: "Pages" },
  access: { read: () => true },
  fields: [
    ...introFields("Bienvenue à bord !", [
      "Toute l'équipe d'organisation se réjouit de t'accueillir à Payerne pour le Giron de la Broye, du 28 juillet au 1er août 2027.",
      "Attache ta ceinture et redresse ton dossier : le décollage approche et on te promet un vol sans turbulences… sauf sur la piste de danse !",
    ]),
    {
      name: "image",
      label: "Photo",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optionnel : sans photo choisie, la photo de l'équipe d'organisation est affichée." },
    },
    {
      type: "row",
      fields: [
        {
          name: "countdownLabel",
          label: "Texte au-dessus du compte à rebours",
          type: "text",
          required: true,
          defaultValue: () => "Décollage prévu dans",
        },
        {
          name: "countdownDoneLabel",
          label: "Texte une fois le giron commencé",
          type: "text",
          required: true,
          defaultValue: () => "Le giron a décollé ! Rejoins-nous sur le tarmac.",
        },
      ],
    },
  ],
};

export const Pages: GlobalConfig[] = [
  home,
  page("benevoles", "Bénévoles", [
    "Les pré-inscriptions des bénévoles sont ouvertes !",
    "Réserve dès maintenant ta place dans l'équipage pour ne pas rater la tranche horaire qui te convient le mieux.",
  ]),
  page("boutique", "Boutique", [
    "Avant le décollage fin juillet, préparez votre paquetage ! Retrouvez ici les articles officiels du giron. Merci pour votre soutien, chaque achat nous aide à prendre de l'altitude.",
  ]),
  page("comite", "Comité", ["Découvre l'équipage aux commandes du Giron de la Broye 2027."]),
  page("sponsors", "Sponsors", ["Merci à nos partenaires et sponsors."]),
  page("photos", "Photos", ["Les galeries photos seront publiées ici."]),
  page("infos", "Infos générales", ["Accès, horaires, plan du site et informations pratiques."]),
  page("programme", "Programme", ["Le programme détaillé sera publié prochainement."]),
  page("billetterie", "Billetterie", ["La billetterie ouvrira prochainement."]),
];
