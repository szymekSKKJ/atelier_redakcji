import CurvedLines from "@/globalComponents/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";
import Image from "next/image";
import Arrow from "../../../../../public/arrow.svg";
import image1 from "../../../../../public/home/section4/icons/cala-oferta.svg";
import image2 from "../../../../../public/home/section4/icons/contract-2.svg";
import image3 from "../../../../../public/home/section4/icons/creative-writing.svg";
import image4 from "../../../../../public/home/section4/icons/inzynierskie.svg";
import image5 from "../../../../../public/home/section4/icons/doktorackie.svg";
import image6 from "../../../../../public/home/section4/icons/licencjackie.svg";
import image7 from "../../../../../public/home/section4/icons/magisterskie.svg";
import image8 from "../../../../../public/home/section4/icons/writing.svg";
import image9 from "../../../../../public/home/section4/icons/zaliczenia.svg";

const ArrowIcon = () => {
  return (
    <div className={`${styles.arrow_icon}`}>
      <Image src={Arrow} alt="Ikonka strzałki"></Image>
      <Image src={Arrow} alt="Ikonka strzałki"></Image>
    </div>
  );
};

const Section4 = () => {
  const articles = [
    {
      id: 1,
      image: image6,
      content: (
        <>
          Prace<br></br>licenjcackie
        </>
      ),
    },
    {
      id: 2,
      image: image4,
      content: (
        <>
          Prace<br></br>inżynierskie
        </>
      ),
    },
    {
      id: 3,
      image: image7,
      content: (
        <>
          Prace<br></br>magisterskie
        </>
      ),
    },
    {
      id: 4,
      image: image5,
      content: (
        <>
          Prace doktorskie<br></br>i habilitacyjne
        </>
      ),
    },
    {
      id: 5,
      image: image9,
      content: (
        <>
          Prace<br></br>zaliczeniowe
        </>
      ),
    },
    {
      id: 6,
      image: image1,
      content: (
        <>
          Prace<br></br>dyplomowe
        </>
      ),
    },
    {
      id: 7,
      image: image3,
      content: (
        <>
          Publikacje<br></br>naukowe
        </>
      ),
    },
    {
      id: 8,
      image: image2,
      content: (
        <>
          Teksty<br></br>specjalistyczne
        </>
      ),
    },
    {
      id: 9,
      image: image8,
      content: <>Inny tekst</>,
    },
  ];

  return (
    <section className={`${styles.section}`}>
      <h2>
        Wykonujemy korekty <mark>dowolnych tekstów</mark>
      </h2>
      <CurvedLines></CurvedLines>
      <p className={`${styles.bold}`}>Pomagamy na każdym etapie pisania pracy,</p>
      <p>niezależnie czy znajdujesz się napoczątku, czy na końcu swojej drogi.</p>
      <div className={`${styles.articles}`}>
        {articles.map((articleData) => {
          const { id, image, content } = articleData;
          return (
            <article key={id}>
              <figure>
                <Image src={image} alt="Ikona artykułu"></Image>
                <figcaption>{content}</figcaption>
              </figure>
              <div className={`${styles.wrapper}`}>
                <p>Dowiedz się więcej</p>
                <ArrowIcon></ArrowIcon>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Section4;
