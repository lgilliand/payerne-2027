import Block from "@/components/Block";

export default function HomePage() {
  return (
    <>
      <Block
        headingLevel={1}
        title="Giron de la Broye 2027"
        text="Rendez-vous à Payerne pour le Giron de la Broye 2027."
        image={{ src: "/images/placeholder.svg", alt: "" }}
        action={{ label: "Réserver mes billets", href: "/billetterie/" }}
      />
      <Block
        title="Le programme"
        text="Découvrez toutes les animations, concerts et concours prévus durant le giron."
        image={{ src: "/images/placeholder.svg", alt: "" }}
        imagePosition="right"
        action={{ label: "Voir le programme", href: "/programme/", variant: "secondary" }}
      />
      <Block
        title="Devenir bénévole"
        text="Envie de participer à l'aventure ? Rejoignez l'équipe des bénévoles."
        action={{ label: "S'inscrire", href: "/benevoles/", variant: "secondary" }}
      />
    </>
  );
}
