import Script from "next/script";

/**
 * Boutique Strap'n'pay, d'après le code d'intégration fourni par Strap'n'pay.
 * Le script remplace le lien par la boutique et ajuste sa hauteur. Il surveille la page :
 * la boutique s'affiche aussi quand on y arrive depuis une autre page du site.
 */
export default function StrapnpayStore({ url }: { url: string }) {
  // Lien du type https://shop.strapnpay.ch/<identifiant de la boutique>?s=<vente>
  const { pathname, searchParams } = new URL(url);

  return (
    <>
      <div data-strapnpay-embed="store" data-shop={pathname.slice(1)} data-slug={searchParams.get("s") ?? ""}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Ouvrir la boutique du Giron de la Broye 2027
        </a>
      </div>
      <Script src="https://shop.strapnpay.ch/embed/v1.js" strategy="afterInteractive" />
    </>
  );
}
