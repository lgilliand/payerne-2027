import type { GlobalConfig } from "payload";

// Informations reprises à plusieurs endroits du site (pied de page, compte à rebours, formulaires…)
export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Paramètres du site",
  access: { read: () => true },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "dates",
          label: "Dates affichées",
          type: "text",
          required: true,
          defaultValue: "Du 28 juillet au 1er août 2027",
          admin: { description: "Affichées dans le pied de page." },
        },
        {
          name: "startDate",
          label: "Ouverture du giron",
          type: "date",
          required: true,
          defaultValue: "2027-07-28T16:00:00.000Z",
          admin: {
            description: "Fin du compte à rebours de la page d'accueil.",
            date: { pickerAppearance: "dayAndTime", displayFormat: "d MMMM yyyy HH:mm" },
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "email", label: "E-mail de contact", type: "email", required: true, defaultValue: "info@payerne2027.ch" },
        { name: "president", label: "Président d'organisation", type: "text", required: true, defaultValue: "Michaël Rapin" },
      ],
    },
    {
      name: "volunteerUrl",
      label: "Page Benevoo des bénévoles",
      type: "text",
      required: true,
      defaultValue: "https://benevoo.ch/manifestation-public/2d0d1e4c685c1539",
      admin: { description: "Adresse publique de la manifestation sur Benevoo, le formulaire de la page Bénévoles en découle." },
      validate: (value: string | null | undefined) =>
        /^https:\/\/benevoo\.ch\/manifestation-public\/\w+$/.test(value ?? "") ||
        "L'adresse doit ressembler à https://benevoo.ch/manifestation-public/…",
    },
    {
      name: "shopUrl",
      label: "Boutique Strap'n'pay",
      type: "text",
      required: true,
      defaultValue: "https://payerne2027.pay.strapnpay.ch/pay?tid=9f9c0eaa&appview=1&breakIframe=1",
      admin: { description: "Adresse de la boutique intégrée dans la page Boutique." },
    },
    {
      name: "social",
      label: "Réseaux sociaux",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "instagram",
              label: "Instagram",
              type: "text",
              required: true,
              defaultValue: "https://www.instagram.com/giron_payerne_2027/",
            },
            {
              name: "facebook",
              label: "Facebook",
              type: "text",
              required: true,
              defaultValue: "https://www.facebook.com/p/Jeunesse-Payerne-100092482256925/",
            },
            {
              name: "tiktok",
              label: "TikTok",
              type: "text",
              required: true,
              defaultValue: "https://www.tiktok.com/@giron.payerne.2027",
            },
          ],
        },
      ],
    },
  ],
};
