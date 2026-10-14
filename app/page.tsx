import Block from "@/components/Block";
import Countdown from "@/components/Countdown";
import VisibleUntil from "@/components/VisibleUntil";
import { site } from "@/lib/site";
import styles from "./page.module.css";

// Matériel recherché pour l'organisation du giron
const materials = [
  "Palettes",
  "Palox",
  "Outils à main",
  "Lumières",
  "Tableau blanc",
  "Seaux",
  "Spensettes",
  "Vaisselle réutilisable",
  "Armoires / étagères",
  "Tables et chaises",
  "Caisses en plastique",
  "Toutes sortes de bois de plus de 2 m de long",
  "Visserie",
];

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
      <VisibleUntil date={site.supportDinner.hideFrom}>
        <Block
          title="Repas de soutien"
          text={
            <>
              <p>
                Avant le grand décollage, on fait le plein ! Viens soutenir le Giron de la
                Broye 2027 lors de notre repas de soutien.
              </p>
              <dl className={styles.details}>
                <dt>Date</dt>
                <dd>Vendredi 23 octobre 2026</dd>
                <dt>Heure</dt>
                <dd>Apéro dès 18h30</dd>
                <dt>Lieu</dt>
                <dd>Halle des Fêtes, Payerne</dd>
                <dt>Prix</dt>
                <dd>CHF 55.– par personne (paiement à réception de la facture)</dd>
                <dt>Menu</dt>
                <dd>
                  Terrine de porc
                  <br />
                  Rôti de porc, sauce moutarde, gratin et légumes
                  <br />
                  Mousse aux fruits exotiques
                </dd>
              </dl>
              <p>Inscriptions jusqu&apos;au 10 octobre 2026.</p>
            </>
          }
          image={{
            src: "/images/repas-de-soutien.jpg",
            alt: "Flyer du repas de soutien : avion Jet27 Air, 23 octobre 2026, Halle des Fêtes de Payerne, apéro dès 18h30, CHF 55.– par personne",
            width: 1000,
            height: 926,
          }}
          imagePosition="right"
          action={{ label: "Je m'inscris", href: site.supportDinner.formUrl }}
        />
      </VisibleUntil>
      <Block
        title="Rejoins l'équipage"
        text={
          <>
            <p>
              Pour faire décoller le giron, on a besoin de toi ! Au bar, à la cuisine ou à
              l&apos;accueil, chaque coup de main compte. Pas besoin de brevet de pilote : ta
              bonne humeur suffit.
            </p>
            <p>
              Pré-inscris-toi dès maintenant pour ne pas rater la tranche horaire qui te
              convient le mieux.
            </p>
          </>
        }
        action={{ label: "Je m'inscris", href: "/benevoles/" }}
      />
      <Block
        title="Vente de vin et de gadgets"
        text={
          <>
            <p>
              Une vente de vin et de gadgets aux couleurs du Giron de la Broye 2027 est en
              cours. De quoi trinquer avant le décollage et afficher fièrement les couleurs de
              Payerne 2027 !
            </p>
            <p>Chaque achat soutient l&apos;organisation du giron : merci pour ton soutien.</p>
          </>
        }
        action={{ label: "Voir la boutique", href: "/boutique/" }}
      />
      <Block
        title="Recherche de matériel"
        text={
          <>
            <p>
              Tu as du matériel dont tu ne te sers plus et qui pourrait avoir une seconde vie ?
              Nous sommes à la recherche du matériel suivant :
            </p>
            <ul className={styles.materials}>
              {materials.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Si tu possèdes l&apos;un de ces objets et que tu peux nous le donner, ton aide
              serait précieuse ! Contacte-nous à {site.email}.
            </p>
          </>
        }
        action={{
          label: "Nous contacter",
          href: `mailto:${site.email}?subject=${encodeURIComponent("Don de matériel")}`,
        }}
      />
    </>
  );
}
