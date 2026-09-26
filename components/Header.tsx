"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Ferme le menu à chaque changement de page
  useEffect(() => setOpen(false), [pathname]);

  // Bloque le scroll de la page et permet de fermer avec Échap quand le menu est ouvert
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand}>
          <img
            src="/images/logo.svg"
            alt="Giron de la Broye 2027 – Payerne, accueil"
            width={1141}
            height={676}
          />
        </Link>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <span className={styles.burgerIcon} aria-hidden="true" />
        </button>

        <div
          className={`${styles.overlay} ${open ? styles.overlayVisible : ""}`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <nav
          id="main-nav"
          className={`${styles.nav} ${open ? styles.navOpen : ""}`}
          aria-label="Navigation principale"
        >
          <ul className={styles.list}>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.link}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
