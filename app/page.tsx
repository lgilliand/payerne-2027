import Block from "@/components/Block";
import Countdown from "@/components/Countdown";
import VisibleUntil from "@/components/VisibleUntil";
import { site } from "@/lib/site";
import styles from "./page.module.css";

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
        action={{ label: "Je m'inscris", href: site.volunteerUrl }}
      />
    </>
  );
}
