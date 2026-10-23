import PageIntro from "@/components/PageIntro";
import { pageMetadata } from "@/lib/cms";
import styles from "./page.module.css";

export const generateMetadata = () => pageMetadata("comite");

// De gauche à droite dans la formation, le président au centre
const members = [
  {
    name: "Martin Savary",
    role: "Vice-Président",
    photo: "/images/martin.jpg",
    email: "vice-president@payerne2027.ch",
  },
  {
    name: "Jérémy Gaiani",
    role: "Caissier",
    photo: "/images/jeremy.jpg",
    email: "caissier@payerne2027.ch",
  },
  {
    name: "Michaël Rapin",
    role: "Président",
    photo: "/images/michael.jpg",
    email: "president@payerne2027.ch",
  },
  {
    name: "Clara Gilliand",
    role: "Secrétaire",
    photo: "/images/clara.jpg",
    email: "secretaire@payerne2027.ch",
  },
  {
    name: "Romain Vonnez",
    role: "Resp. infrastructures",
    photo: "/images/romain.jpg",
    email: "infra@payerne2027.ch",
  },
];

export default function ComitePage() {
  return (
    <>
      <PageIntro slug="comite" />

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
            {/* Si la colonne est trop étroite, l'adresse passe à la ligne avant le @ uniquement */}
            <a className={styles.email} href={`mailto:${member.email}`}>
              <span>{member.email.split("@")[0]}</span>
              <wbr />
              <span>@{member.email.split("@")[1]}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
