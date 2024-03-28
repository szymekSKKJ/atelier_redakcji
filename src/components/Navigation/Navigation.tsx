"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import arrowDownBlue from "../../../public/arrow down blue.svg";
import arrowDown from "../../../public/arrow.svg";
import blogImage from "../../../public/BLOG.svg";
import doubleArrowIcon from "../../../public/Double arrows.svg";
import logo from "../../../public/logo.svg";
import searchIcon from "../../../public/search.svg";
import Button from "../UI/Button/Button";
import styles from "./styles.module.scss";

const isTouchDevice = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;

const Navigation = () => {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [lastScrollYOfWindow, setLastScrollYOfWindow] = useState(0);
  const [isBlogUpperNavigationVisible, setIsBlogUpperNavigationVisible] = useState(true);

  const pathname = usePathname();
  const formattedPathnameArray = pathname.split("/").splice(1, pathname.split("/").length);

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
      href: "/dlaczego-my",
    },
    {
      id: 4,
      content: "Oferta",
      styles: [],
      href: "/oferta",
      subLinks: [
        { id: 1, content: "Prace licencjackie", href: "/oferta/prace-licencjackie" },
        { id: 2, content: "Prace inżynierskie", href: "/oferta/prace-inzynierskie" },
        { id: 3, content: "Prace magisterskie", href: "/oferta/prace-magisterskie" },
        { id: 4, content: "Prace doktorskie i habilitacyjne", href: "/oferta/prace-doktorskie-i-habilitacyjne" },
        { id: 5, content: "Prace zaliczeniowe", href: "/oferta/prace-zaliczeniowe" },
        { id: 6, content: "Prace dyplomowe", href: "/oferta/prace-dyplomowe" },
        { id: 7, content: "Prace naukowe", href: "/oferta/publikacje-naukowe" },
        { id: 8, content: "Teksty specjalistyczne", href: "/oferta/teksty-specjalistyczne" },
        { id: 9, content: "Inne teksty", href: "/oferta/inne-teksty" },
      ],
    },
    {
      id: 5,
      content: "Cennik",
      styles: [],
      href: "/cennik",
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
      href: "/kontakt",
    },
    {
      id: 8,
      content: "Blog",
      styles: [],
      href: "/blog",
    },
  ];

  const blogLinks = [
    {
      id: 1,
      href: "/blog",
      content: "Blog",
      activeCondition: "blog",
    },
    {
      id: 2,
      href: "/blog/kategorie/?category=wszystko&page=1",
      content: "Artykuły",
      activeCondition: "kategorie",
    },
    {
      id: 3,
      href: "/blog/kategorie/?category=wszystko&page=1",
      content: "Kategorie artykułów",
      activeCondition: null,
      subLinks: [
        { id: 1, content: "Prace licencjackie", href: "/blog/kategorie/?category=prace-licenjcackie&page=1" },
        { id: 2, content: "Prace inżynierskie", href: "/blog/kategorie/?category=prace-inzynierskie&page=1" },
        { id: 3, content: "Prace magisterskie", href: "/blog/kategorie/?category=prace-magisterskie&page=1" },
        { id: 4, content: "Prace doktorskie i habilitacyjne", href: "/blog/kategorie/?category=prace-doktorskie-i-habilitacyjne&page=1" },
        { id: 5, content: "Prace zaliczeniowe", href: "/blog/kategorie/?category=prace-zaliczeniowe&page=1" },
        { id: 6, content: "Prace dyplomowe", href: "/blog/kategorie/?category=prace-dyplomowe&page=1" },
        { id: 7, content: "Prace naukowe", href: "/blog/kategorie/?category=prace-naukowe&page=1" },
        { id: 8, content: "Teksty specjalistyczne", href: "/blog/kategorie/?category=teksty-specjalistyczne&page=1" },
        { id: 9, content: "Inne teksty", href: "/blog/kategorie/?category=inne-teksty&page=1" },
        { id: 10, content: "Wszystko", href: "/blog/kategorie/?category=wszystko&page=1" },
      ],
    },
  ];

  const linksContentForNotBlog = links.map((data) => data.href != "/blog" && data.href);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const scroll = (event: Event) => {
      if (isTouchDevice() === false) {
        if (lastScrollYOfWindow < window.scrollY) {
          setIsBlogUpperNavigationVisible(false);
        } else {
          setIsBlogUpperNavigationVisible(true);
        }
        setLastScrollYOfWindow(window.scrollY);
      }
    };

    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [lastScrollYOfWindow]);

  return (
    <>
      <div className={`${styles.wrapper}`}>
        {linksContentForNotBlog.includes(`/${formattedPathnameArray.at(-1)!}`) === false &&
        formattedPathnameArray.at(-1)! !== "warunki-swiadczenia-uslug" &&
        formattedPathnameArray.at(-1)! !== "polityka-prywatnosci" &&
        formattedPathnameArray.at(-2)! !== "oferta" ? (
          <nav className={`${styles.blogMenu} ${isBlogUpperNavigationVisible ? "" : styles.blogUpperNavigationNotVisible}`}>
            <div className={`${styles.wrapper}`}>
              <div className={`${styles.wrapper1}`}>
                <Link href={`/`}>
                  <Image src={doubleArrowIcon} alt="Ikonka podwójnej strzałki"></Image> Wróć do Atelier redakcji tekstu
                </Link>
                <Button style={{ padding: "15px 20px 15px 20px" }} changeRoute="/#mainForm">
                  Skorzystaj z pomocy redaktora
                </Button>
                <div className={`${styles.inputWrapper}`}>
                  <Image src={searchIcon} alt="Ikonka lupty"></Image>
                  <input
                    placeholder="Szukaj..."
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        const inputElement = event.currentTarget as HTMLInputElement;
                        router.push(`/blog/wyniki-wyszukiwania/${inputElement.value}`);
                      }
                    }}></input>
                </div>
              </div>
              <div className={`${styles.wrapper2}`}>
                <Link href={"/blog"} className={`${styles.linkBlogWrapper}`}>
                  <div className={`${styles.imageLogoWrapper}`}>
                    <Image src={logo} alt="Main logo"></Image>
                  </div>
                  <div className={`${styles.imageBlogWrapper}`}>
                    <Image src={blogImage} alt="Zdjęcie napisu blog"></Image>
                  </div>
                </Link>
                <div className={`${styles.links}`}>
                  {blogLinks.map((data) => {
                    const { id, content, activeCondition, href, subLinks } = data;

                    return (
                      <div className={`${styles.link_wrapper}`} key={id}>
                        <Link key={id} className={`${formattedPathnameArray.at(-1) === activeCondition ? styles.active : ""}`} href={href}>
                          {content}
                          {subLinks && <Image src={arrowDownBlue} alt="Ikonka strzałki w dół"></Image>}
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
                  })}
                  <div className={`${styles.inputWrapper}`}>
                    <Image src={searchIcon} alt="Ikonka lupty"></Image>
                    <input
                      placeholder="Szukaj..."
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const inputElement = event.currentTarget as HTMLInputElement;
                          router.push(`/blog/wyniki-wyszukiwania/${inputElement.value}`);
                        }
                      }}></input>
                  </div>
                </div>
                <button
                  className={`${styles.toggle_mobile_navigation} ${isMobileMenuOpen ? styles.open : ""}`}
                  onClick={() => {
                    setIsMobileMenuOpen((currentValue) => (currentValue === true ? false : true));
                  }}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <div className={`${styles.hamburgerMenu} ${isMobileMenuOpen ? styles.open : ""}`}>
              {blogLinks.map((data) => {
                const { id, content, href, subLinks } = data;

                const isActive = href === "/" ? pathname === href : pathname.includes(href.split("/").splice(-1, 1).join(""));

                return (
                  <div key={id}>
                    {subLinks ? (
                      <span
                        onClick={() => {
                          setIsSubMenuOpen((currentValue) => (currentValue === true ? false : true));
                        }}>
                        {content}
                        <Image src={arrowDownBlue} alt="Ikonka strzałki w dół"></Image>
                      </span>
                    ) : (
                      <Link href={href} className={` ${isActive ? styles.active : ""}`} onClick={() => setIsMobileMenuOpen(false)}>
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
              })}
              <Button
                style={{ padding: "15px 20px 15px 20px", alignSelf: "flex-start" }}
                changeRoute="/#mainForm"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}>
                Skorzystaj z pomocy redaktora
              </Button>
            </div>
          </nav>
        ) : (
          <div className={`${styles.default}`}>
            <nav className={`${styles.desktop}`}>
              <div className={`${styles.wrapper}`}>
                {(() => {
                  const { id, content, styles: stylesLocal, href } = links[0];

                  const formattedStyles = stylesLocal.join(" ");

                  return (
                    <Link
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}
                      key={id}
                      href={href}
                      className={`${formattedStyles} ${pathname === href ? styles.active : ""}`}>
                      {content}
                    </Link>
                  );
                })()}
                <button
                  aria-label="Otwórz / zamknij nawigację"
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
              </div>
            </nav>
            <Button
              style={{ padding: "15px 20px 15px 20px" }}
              changeRoute="/#mainForm"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}>
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
                          <Image src={arrowDownBlue} alt="Ikonka strzałki w dół"></Image>
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
              <Button
                style={{ padding: "15px 20px 15px 20px", fontSize: "16px" }}
                changeRoute="/#mainForm"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}>
                Wyceń swój tekst
              </Button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
