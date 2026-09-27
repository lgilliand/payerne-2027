import Block from "@/components/Block";
import Countdown from "@/components/Countdown";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Block
        headingLevel={1}
        title="Bienvenue à bord !"
        text={
          <>
            <p>
              Toute l&apos;équipe d&apos;organisation se réjouit de t&apos;accueillir à Payerne
              pour le Giron de la Broye, du 28 juillet au 1er août 2027.
            </p>
            <p>
              Attache ta ceinture et redresse ton dossier : le décollage approche et on te
              promet un vol sans turbulences… sauf sur la piste de danse !
            </p>
          </>
        }
        image={{
          src: "/images/equipe-organisation.jpg",
          alt: "Les membres de l'équipe d'organisation, en t-shirt noir, posent devant l'abbatiale de Payerne",
          width: 1170,
          height: 1165,
        }}
      >
        <Countdown
          target={site.startDate}
          label="Décollage prévu dans"
          doneLabel="Le giron a décollé ! Rejoins-nous sur le tarmac."
        />
      </Block>
      <Block
        title="Le programme"
        text="Découvrez toutes les animations, concerts et concours prévus durant le giron."
        image={{ src: "/images/placeholder.svg", alt: "" }}
        imagePosition="right"
        action={{ label: "Voir le programme", href: "/programme/" }}
      />
      <Block
        title="Devenir bénévole"
        text="Envie de participer à l'aventure ? Rejoignez l'équipe des bénévoles."
        action={{ label: "S'inscrire", href: "/benevoles/" }}
      />
    </>
  );
}
