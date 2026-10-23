// Construit un contenu d'éditeur de texte (Lexical) à partir de textes simples,
// pour les valeurs par défaut et les contenus créés par les migrations

const node = { format: "", indent: 0, version: 1, direction: null };

const text = (value: string) => ({
  type: "text",
  text: value,
  format: 0,
  style: "",
  mode: "normal",
  detail: 0,
  version: 1,
});

export const paragraph = (value: string) => ({
  ...node,
  type: "paragraph",
  textFormat: 0,
  textStyle: "",
  children: value ? [text(value)] : [],
});

export const bulletList = (items: string[]) => ({
  ...node,
  type: "list",
  listType: "bullet",
  start: 1,
  tag: "ul",
  children: items.map((item, i) => ({ ...node, type: "listitem", value: i + 1, children: [text(item)] })),
});

export function richText(...children: ReturnType<typeof paragraph | typeof bulletList>[]) {
  return { root: { ...node, type: "root", format: "" as const, children } };
}

// L'éditeur exige au moins un paragraphe, même vide
export const paragraphs = (...values: string[]) => richText(...(values.length ? values : [""]).map(paragraph));
