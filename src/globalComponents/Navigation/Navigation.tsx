"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";
import logo from "../../../public/logo.svg";
import { usePathname } from "next/navigation";

const Navigation = () => {
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
      content: "Cennik",
      styles: [],
      href: "/priceList",
    },
    {
      id: 5,
      content: "FAQ",
      styles: [],
      href: "/faq",
    },
    {
      id: 6,
      content: "Kontakt",
      styles: [],
      href: "/contact",
    },
    {
      id: 7,
      content: "Blog",
      styles: [],
      href: "/blog",
    },
    {
      id: 8,
      content: "Wyceń swój tekst",
      styles: [],
      href: "/rateYourText",
    },
  ];

  return (
    <nav className={`${styles.nav}`}>
      {links.map((linkData) => {
        const { id, content, styles: stylesLocal, href } = linkData;

        const formattedStyles = stylesLocal.join(" ");

        return (
          <Link key={id} href={href} className={`${formattedStyles} ${pathname === href ? styles.active : ""}`}>
            {content}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
