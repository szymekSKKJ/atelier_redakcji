import styles from "./styles.module.scss";
import Image from "next/image";
import arrow from "../../../../public/arrow.svg";
import image1 from "../../../../public/sections/section4/icons/cala-oferta.svg";
import image2 from "../../../../public/sections/section4/icons/contract-2.svg";
import image3 from "../../../../public/sections/section4/icons/creative-writing.svg";
import image4 from "../../../../public/sections/section4/icons/inzynierskie.svg";
import image5 from "../../../../public/sections/section4/icons/doktorackie.svg";
import image6 from "../../../../public/sections/section4/icons/licencjackie.svg";
import image7 from "../../../../public/sections/section4/icons/magisterskie.svg";
import image8 from "../../../../public/sections/section4/icons/writing.svg";
import image9 from "../../../../public/sections/section4/icons/zaliczenia.svg";
import Link from "next/link";
import CurvedLines from "@/design/CurvedLines/CurvedLines";

const ArrowIcon = () => {
  return (
    <span className={`${styles.arrow_icon}`} role="group">
      <Image src={arrow} alt="Ikonka strzałki"></Image>
      <Image src={arrow} alt="Ikonka strzałki"></Image>
    </span>
  );
};

const Section4 = () => {
  const articles = [
    {
      id: 1,
      image: image6,
      content: <>Prace licencjackie</>,
      href: "/oferta/prace-licencjackie",
    },
    {
      id: 2,
      image: image4,
      content: <>Prace inżynierskie</>,
      href: "/oferta/prace-inzynierskie",
    },
    {
      id: 3,
      image: image7,
      content: <>Prace magisterskie</>,
      href: "/oferta/prace-magisterskie",
    },
    {
      id: 4,
      image: image5,
      content: <>Prace doktorskie i habilitacyjne</>,
      href: "/oferta/prace-doktorskie-i-habilitacyjne",
    },
    {
      id: 5,
      image: image9,
      content: <>Prace zaliczeniowe</>,
      href: "/oferta/prace-zaliczeniowe",
    },
    {
      id: 6,
      image: image1,
      content: <>Prace dyplomowe</>,
      href: "/oferta/prace-dyplomowe",
    },
    {
      id: 7,
      image: image3,
      content: <>Publikacje naukowe</>,
      href: "/oferta/publikacje-naukowe",
    },
    {
      id: 8,
      image: image2,
      content: <>Teksty specjalistyczne</>,
      href: "/oferta/teksty-specjalistyczne",
    },
    {
      id: 9,
      image: image8,
      content: <>Inny tekst</>,
      href: "/oferta/inny-tekst",
    },
  ];

  return (
    <section className={`${styles.section}`}>
      <header>
        <h2>
          Wykonujemy korekty <mark>dowolnych tekstów</mark>
        </h2>
        <CurvedLines></CurvedLines>
        <p className={`${styles.bold}`}>Pomagamy na każdym etapie pisania pracy,</p>
        <p>niezależnie czy znajdujesz się napoczątku, czy na końcu swojej drogi.</p>
      </header>
      <div className={`${styles.articles}`} role="group">
        {articles.map((articleData) => {
          const { id, image, content, href } = articleData;
          return (
            <article key={id}>
              <Link href={href}>
                <figure>
                  <Image src={image} alt="Ikona artykułu"></Image>
                  <figcaption>{content}</figcaption>
                </figure>
                <p>
                  Dowiedz się więcej
                  <ArrowIcon></ArrowIcon>
                </p>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Section4;
