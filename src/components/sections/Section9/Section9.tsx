import styles from "./styles.module.scss";
import Image from "next/image";
import image3 from "../../../../public/sections/section9/image1.jpg";
import image2 from "../../../../public/sections/section9/image2.jpg";
import image1 from "../../../../public/sections/section9/image3.jpg";
import CurvedLines from "@/design/CurvedLines/CurvedLines";
import Button from "@/components/UI/Button/Button";

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
      <div className={`${styles.articles}`} role="group">
        <article>
          <figure>
            <div className={`${styles.wrapper}`} role="img" aria-label="Zdjęcie">
              <Image src={image1} alt="Cieszący się absolwent"></Image>
            </div>
            <figcaption>Czym jest i na czym polega praca doktorska?</figcaption>
          </figure>
          <p>Obrona pracy magisterskiej w wielu przypadkach kończy przygodę ze studiami i edukacją. Są jednak osoby, które...</p>
          <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }}>
            Czytaj więcej
          </Button>
        </article>
        <article>
          <figure>
            <div className={`${styles.wrapper}`} role="img" aria-label="Zdjęcie">
              <Image src={image2} alt="Laptop na stoliku na dworze"></Image>
            </div>
            <figcaption>Czym jest redakcja tekstu? Za kulisami pracy...</figcaption>
          </figure>
          <p>Na czym polega praca, jaką wykonuje redaktor tekstu? Kto może zostać redaktorem? Kiedy redakcja tekstu powinna...</p>
          <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }}>
            Czytaj więcej
          </Button>
        </article>
        <article>
          <figure>
            <div className={`${styles.wrapper}`} role="img" aria-label="Zdjęcie">
              <Image src={image3} alt="Laptop na stoliku na dworze"></Image>
            </div>
            <figcaption>Redakcja a korekta: dwie strony jednego procesu</figcaption>
          </figure>
          <p>Na czym polega praca, jaką wykonuje redaktor tekstu? Kto może zostać redaktorem? Kiedy redakcja tekstu powinna...</p>
          <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }}>
            Czytaj więcej
          </Button>
        </article>
      </div>
    </section>
  );
};

export default Section9;
