import Block from "@/components/Block";

export default function NotFound() {
  return (
    <Block
      headingLevel={1}
      title="Page introuvable"
      text="La page que vous cherchez n'existe pas ou a été déplacée."
      action={{ label: "Retour à l'accueil", href: "/" }}
    />
  );
}
