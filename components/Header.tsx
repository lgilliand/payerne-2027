"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, upcomingNavigation } from "@/lib/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const subRef = useRef<HTMLLIElement>(null);

  // Ferme les menus à chaque changement de page
  useEffect(() => {
    setOpen(false);
    setSubOpen(false);
  }, [pathname]);

  // Ferme le sous-menu au clic en dehors ou avec Échap
  useEffect(() => {
    if (!subOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!subRef.current?.contains(e.target as Node)) setSubOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setSubOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [subOpen]);

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
  const subActive = upcomingNavigation.items.some((item) => isActive(item.href));

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand}>
          <img
            src="/images/logo-negatif.svg"
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

            {upcomingNavigation.items.length > 0 && (
              <li ref={subRef} className={styles.subItem}>
                <button
                  type="button"
                  className={`${styles.link} ${styles.subToggle}`}
                  aria-expanded={subOpen}
                  aria-controls="sub-nav"
                  data-active={subActive || undefined}
                  onClick={() => setSubOpen((o) => !o)}
                >
                  {upcomingNavigation.label}
                  <span className={styles.chevron} aria-hidden="true" />
                </button>
                <ul id="sub-nav" className={styles.subList} hidden={!subOpen}>
                  {upcomingNavigation.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={styles.subLink}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
