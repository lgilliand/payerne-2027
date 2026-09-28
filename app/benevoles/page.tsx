import type { Metadata } from "next";
import Block from "@/components/Block";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Bénévoles" };

export default function BenevolesPage() {
  return (
    <>
      <Block
        headingLevel={1}
        title="Bénévoles"
        text={
          <>
            <p>Les pré-inscriptions des bénévoles sont ouvertes !</p>
            <p>
              Réserve dès maintenant ta place dans l&apos;équipage pour ne pas rater la tranche
              horaire qui te convient le mieux. Plus d&apos;informations suivront sur cette page.
            </p>
          </>
        }
        action={{ label: "Je m'inscris", href: site.volunteerUrl }}
      />
    </>
  );
}
