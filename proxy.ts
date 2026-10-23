import { NextResponse, type NextRequest } from "next/server";
import { isPublished } from "@/lib/navigation";

// En production, les pages pas encore prêtes affichent la page 404 du site
export function proxy(request: NextRequest) {
  if (isPublished(request.nextUrl.pathname)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/page-introuvable", request.url));
}

export const config = {
  // Ni l'administration, ni l'API, ni les fichiers (images, scripts…)
  matcher: ["/((?!admin|api|_next|.*\\..*).*)"],
};
