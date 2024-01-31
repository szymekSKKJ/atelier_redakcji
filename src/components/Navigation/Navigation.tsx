"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";
import logo from "../../../public/logo.svg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import arrowDown from "../../../public/arrow.svg";
import arrowDownBlue from "../../../public/arrow down blue.svg";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

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
      subLinks: [
        { id: 1, content: "Prace licencjackie", href: "/offer/prace-licenjcackie" },
        { id: 2, content: "Prace inżynierskie", href: "/offer/prace-inzynierskie" },
        { id: 3, content: "Prace magisterskie", href: "/offer/prace-magisterskie" },
        { id: 4, content: "Prace doktorskie i habilitacyjne", href: "/offer/prace-doktorskie-i-habilitacyjne" },
        { id: 5, content: "Prace zaliczeniowe", href: "/offer/prace-zaliczeniowe" },
        { id: 6, content: "Prace dyplomowe", href: "/offer/prace-dyplomowe" },
        { id: 7, content: "Prace naukowe", href: "/offer/publikacje-naukowe" },
        { id: 8, content: "Teksty specjalistyczne", href: "/offer/teksty-specjalistyczne" },
        { id: 9, content: "Inne teksty", href: "/offer/inne-teksty" },
      ],
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
        <button
          className={`${styles.toggle_mobile_navigation} ${isMobileMenuOpen ? styles.open : ""}`}
          onClick={() => setIsMobileMenuOpen((currentValue) => (currentValue === true ? false : true))}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`${styles.wrapper}`}>
          {links.map((linkData, index) => {
            if (index > 0) {
              const { id, content, styles: stylesLocal, href, subLinks } = linkData;

              const formattedStyles = stylesLocal.join(" ");

              const isActive = href === "/" ? pathname === href : pathname.includes(href.split("/").splice(-1, 1).join(""));

              return (
                <div className={`${styles.link_wrapper}`} key={id}>
                  <Link href={href} className={`${formattedStyles} ${isActive ? styles.active : ""}`}>
                    {content}{" "}
                    {subLinks && (
                      <Image
                        style={isActive ? { transform: "rotate(90deg)" } : {}}
                        src={isActive ? arrowDown : arrowDownBlue}
                        alt="Ikonka strzałki w dół"></Image>
                    )}
                  </Link>
                  {subLinks && (
                    <div className={`${styles.sub_menu}`}>
                      {subLinks.map((linkData) => {
                        const { id, content, href } = linkData;
                        return (
                          <Link href={href} key={id}>
                            {content}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
          })}
          <Button style={{ padding: "15px 20px 15px 20px", fontSize: "16px" }} changeRoute="/#mainForm">
            Wyceń swój tekst
          </Button>
        </div>
      </nav>
      <Button style={{ padding: "15px 20px 15px 20px" }} changeRoute="/#mainForm">
        Wyceń swój tekst
      </Button>
      <nav className={`${styles.mobile}  ${isMobileMenuOpen ? styles.open : ""}`}>
        {links.map((linkData, index) => {
          if (index > 0) {
            const { id, content, styles: stylesLocal, href, subLinks } = linkData;

            const formattedStyles = stylesLocal.join(" ");

            const isActive = href === "/" ? pathname === href : pathname.includes(href.split("/").splice(-1, 1).join(""));

            return (
              <div key={id}>
                {subLinks ? (
                  <a
                    onClick={() => {
                      setIsSubMenuOpen((currentValue) => (currentValue === true ? false : true));
                    }}>
                    {content}
                  </a>
                ) : (
                  <Link href={href} className={`${formattedStyles} ${isActive ? styles.active : ""}`} onClick={() => setIsMobileMenuOpen(false)}>
                    {content}
                  </Link>
                )}

                {subLinks && (
                  <div className={`${styles.sub_menu} ${isSubMenuOpen ? styles.open : ""}`}>
                    {subLinks.map((linkData) => {
                      const { id, content, href } = linkData;
                      return (
                        <Link href={href} key={id} onClick={() => setIsMobileMenuOpen(false)}>
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
        })}
        <Button style={{ padding: "15px 20px 15px 20px", fontSize: "16px" }} changeRoute="/#mainForm">
          Wyceń swój tekst
        </Button>
      </nav>
    </div>
  );
};

export default Navigation;
