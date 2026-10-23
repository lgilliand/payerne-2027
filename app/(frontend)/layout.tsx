import type { Metadata, Viewport } from "next";
import { Libre_Franklin } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// La police est téléchargée au build et servie depuis le site (aucun appel à Google)
const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre-franklin",
});

export const metadata: Metadata = {
  title: {
    default: "Giron de la Broye 2027 – Payerne",
    template: "%s – Giron de la Broye 2027",
  },
  description: "Giron de la Broye 2027 à Payerne.",
};

// Pages rendues à chaque visite : les modifications faites dans /admin apparaissent immédiatement
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CH" className={libreFranklin.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
