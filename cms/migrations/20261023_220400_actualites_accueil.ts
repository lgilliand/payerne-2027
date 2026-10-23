import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-sqlite'
import { generateNKeysBetween } from 'payload/shared'
import { bulletList, paragraph, paragraphs, richText } from '../richText'

// Les blocs écrits en dur sur l'accueil deviennent des actualités, modifiables dans /admin.
// Elles sont ajoutées sous les actualités déjà publiées, dans leur ordre d'origine.
const articles = [
  {
    title: "Rejoins l'équipage",
    content: paragraphs(
      "Pour faire décoller le giron, on a besoin de toi ! Au bar, à la cuisine ou à l'accueil, chaque coup de main compte. Pas besoin de brevet de pilote : ta bonne humeur suffit.",
      'Pré-inscris-toi dès maintenant pour ne pas rater la tranche horaire qui te convient le mieux.',
    ),
    action: { label: "Je m'inscris", href: '/benevoles' },
  },
  {
    title: 'Vente de vin et de gadgets',
    content: paragraphs(
      'Une vente de vin et de gadgets aux couleurs du Giron de la Broye 2027 est en cours. De quoi trinquer avant le décollage et afficher fièrement les couleurs de Payerne 2027 !',
      "Chaque achat soutient l'organisation du giron : merci pour ton soutien.",
    ),
    action: { label: 'Voir la boutique', href: '/boutique' },
  },
  {
    title: 'Recherche de matériel',
    content: richText(
      paragraph(
        'Tu as du matériel dont tu ne te sers plus et qui pourrait avoir une seconde vie ? Nous sommes à la recherche du matériel suivant :',
      ),
      bulletList([
        'Palettes',
        'Palox',
        'Outils à main',
        'Lumières',
        'Tableau blanc',
        'Seaux',
        'Spensettes',
        'Vaisselle réutilisable',
        'Armoires / étagères',
        'Tables et chaises',
        'Caisses en plastique',
        'Toutes sortes de bois de plus de 2 m de long',
        'Visserie',
      ]),
      paragraph(
        "Si tu possèdes l'un de ces objets et que tu peux nous le donner, ton aide serait précieuse ! Contacte-nous à info@payerne2027.ch.",
      ),
    ),
    action: {
      label: 'Nous contacter',
      href: `mailto:info@payerne2027.ch?subject=${encodeURIComponent('Don de matériel')}`,
    },
  },
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs } = await payload.find({
    collection: 'articles',
    where: { _order: { exists: true } },
    sort: '-_order',
    limit: 1,
    depth: 0,
    pagination: false,
    req,
  })
  const keys = generateNKeysBetween(docs[0]?._order ?? null, null, articles.length)
  for (const [i, article] of articles.entries()) {
    await payload.create({
      collection: 'articles',
      data: { ...article, _order: keys[i], _status: 'published' },
      req,
    })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({
    collection: 'articles',
    where: { title: { in: articles.map((article) => article.title) } },
    req,
  })
}
