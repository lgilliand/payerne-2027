import type { Metadata } from "next";
import Block from "@/components/Block";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Comité" };

// De gauche à droite dans la formation, le président au centre
const members = [
  { name: "Martin Savary", role: "Vice-Président", photo: "/images/placeholder.svg" },
  { name: "Jérémy Gaiani", role: "Caissier", photo: "/images/placeholder.svg" },
  { name: "Michaël Rapin", role: "Président", photo: "/images/placeholder.svg" },
  { name: "Clara Gilliand", role: "Secrétaire", photo: "/images/placeholder.svg" },
  { name: "Romain Vonnez", role: "Responsable infrastructures", photo: "/images/placeholder.svg" },
];

export default function ComitePage() {
  return (
    <>
      <Block
        headingLevel={1}
        title="Comité"
        text="Découvre l'équipage aux commandes du Giron de la Broye 2027."
      />

      {/* Formation en fer de lance : chaque membre est décalé selon sa distance au centre */}
      <ul className={`container ${styles.squadron}`}>
        {members.map((member, i) => (
          <li key={member.name} className={styles.member} data-position={i}>
            <img
              className={styles.photo}
              src={member.photo}
              alt={`Portrait de ${member.name}`}
              width={400}
              height={400}
              loading="lazy"
            />
            <p className={styles.name}>{member.name}</p>
            <p className={styles.role}>{member.role}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
