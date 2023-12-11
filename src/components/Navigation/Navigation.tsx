"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";
import logo from "../../../public/logo.svg";
import { usePathname } from "next/navigation";
import hamburger from "../../../public/hamburger.svg";
import hamburgerClose from "../../../public/hamburger_close.svg";
import { useEffect, useState } from "react";
import Button from "../UI/Button/Button";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  const links = [
    {
      id: 1,
      content: <Image src={logo} alt="Main logo" priority></Image>,
      styles: [styles.logo],
      href: "/",
    },
    {
      id: 2,
      content: "Strona główna",
      styles: [],
      href: "/",
    },
    {
      id: 3,
      content: "Dlaczego my?",
      styles: [],
      href: "/whyUs",
    },
    {
      id: 4,
      content: "Oferta",
      styles: [],
      href: "/offer",
    },
    {
      id: 5,
      content: "Cennik",
      styles: [],
      href: "/priceList",
    },
    {
      id: 6,
      content: "FAQ",
      styles: [],
      href: "/faq",
    },
    {
      id: 7,
      content: "Kontakt",
      styles: [],
      href: "/contact",
    },
    {
      id: 8,
      content: "Blog",
      styles: [],
      href: "/blog",
    },
    {
      id: 9,
      content: "Wyceń swój tekst",
      styles: [],
      href: "/rateYourText",
    },
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <div className={`${styles.wrapper1}`}>
      <nav className={`${styles.desktop}`}>
        {(() => {
          const { id, content, styles: stylesLocal, href } = links[0];

          const formattedStyles = stylesLocal.join(" ");

          return (
            <Link key={id} href={href} className={`${formattedStyles} ${pathname === href ? styles.active : ""}`}>
              {content}
            </Link>
          );
        })()}
        <button className={`${styles.toggle_mobile_navigation}`} onClick={() => setIsMobileMenuOpen((currentValue) => (currentValue === true ? false : true))}>
          <Image src={isMobileMenuOpen ? hamburgerClose : hamburger} alt="Ikonka menu"></Image>
        </button>
        <div className={`${styles.wrapper}`}>
          {links.map((linkData, index) => {
            if (index > 0) {
              const { id, content, styles: stylesLocal, href } = linkData;

              const formattedStyles = stylesLocal.join(" ");

              return (
                <Link key={id} href={href} className={`${formattedStyles} ${pathname === href ? styles.active : ""}`}>
                  {content}
                </Link>
              );
            }
          })}
        </div>
      </nav>
      <Button style={{ padding: "15px 20px 15px 20px" }}>Wyceń swój tekst</Button>
      <nav className={`${styles.mobile}  ${isMobileMenuOpen ? styles.open : ""}`}>
        {links.map((linkData, index) => {
          if (index > 0) {
            const { id, content, styles: stylesLocal, href } = linkData;

            const formattedStyles = stylesLocal.join(" ");

            return (
              <Link key={id} href={href} className={`${formattedStyles} ${pathname === href ? styles.active : ""}`} onClick={() => setIsMobileMenuOpen(false)}>
                {content}
              </Link>
            );
          }
        })}
      </nav>
    </div>
  );
};

export default Navigation;
