import { notFound } from "next/navigation";

// Capte les adresses inconnues pour afficher la page 404 du site (avec en-tête et pied de page)
export default function CatchAll() {
  notFound();
}
