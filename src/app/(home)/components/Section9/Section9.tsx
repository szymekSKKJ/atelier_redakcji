import CurvedLines from "@/globalComponents/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";
import Image from "next/image";
import image1 from "../../../../../public/section9/image.svg";
import image2 from "../../../../../public/section9/image_1.svg";
import image3 from "../../../../../public/section9/image_2.svg";

const Section9 = () => {
  return (
    <section className={styles.section}>
      <header>
        <h2>Zapraszamy na naszego bloga</h2>
        <CurvedLines></CurvedLines>
        <p className={styles.caption1}>
          Znajdziesz tam praktyczne wskazówki dot. m.in.:<br></br> aspektów związanych z pisaniem prac oraz poprawnością językową.
        </p>
      </header>
      <div className={`${styles.articles}`}>
        <article>
          <figure>
            <Image src={image1} alt="Cieszący się absolwent"></Image>
            <figcaption>Czym jest i na czym polega praca doktorska?</figcaption>
          </figure>
          <p>Obrona pracy magisterskiej w wielu przypadkach kończy przygodę ze studiami i edukacją. Są jednak osoby, które...</p>
          <button>Czytaj więcej</button>
        </article>
        <article>
          <figure>
            <Image src={image2} alt="Laptop na stoliku na dworze"></Image>
            <figcaption>Czym jest redakcja tekstu? Za kulisami pracy...</figcaption>
          </figure>
          <p>Na czym polega praca, jaką wykonuje redaktor tekstu? Kto może zostać redaktorem? Kiedy redakcja tekstu powinna...</p>
          <button>Czytaj więcej</button>
        </article>
        <article>
          <figure>
            <Image src={image3} alt="Laptop na stoliku na dworze"></Image>
            <figcaption>Redakcja a korekta: dwie strony jednego procesu</figcaption>
          </figure>
          <p>Na czym polega praca, jaką wykonuje redaktor tekstu? Kto może zostać redaktorem? Kiedy redakcja tekstu powinna...</p>
          <button>Czytaj więcej</button>
        </article>
      </div>
    </section>
  );
};

export default Section9;
