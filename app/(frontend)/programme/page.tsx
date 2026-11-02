import { RichText } from "@payloadcms/richtext-lexical/react";
import PageIntro from "@/components/PageIntro";
import Program from "@/components/Program";
import { pageMetadata } from "@/lib/cms";
import { getEvents } from "@/lib/program";

export const generateMetadata = () => pageMetadata("programme");

export default async function ProgrammePage() {
  const events = await getEvents();

  return (
    <>
      <PageIntro slug="programme" />
      {/* Les descriptions sont mises en forme ici, côté serveur : le filtrage se fait dans le navigateur */}
      <Program
        events={events.map(({ description, ...event }) => ({
          ...event,
          description: description ? <RichText data={description} disableContainer /> : undefined,
        }))}
      />
    </>
  );
}
