import styles from "./styles.module.scss";
import image from "../../../../public/sections/section31/image1.jpg";
import CurvedLines from "@/design/CurvedLines/CurvedLines";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";

const Section31 = () => {
  return (
    <section className={`${styles.section}`}>
      <article>
        <h2>
          Korekta pracy licencjackiej - <mark>ile to kosztuje?</mark>
        </h2>
        <CurvedLines></CurvedLines>
        <div className={`${styles.wrapper}`} role="group">
          <p>
            Doświadczeni korektorzy i redaktorzy zadbają o poprawność i wygląd tekstu pracy naukowej. Sprawdzą zarówno jakość tekstu głównego pracy, jak i
            aparatu naukowego.
          </p>
          <p className={`${styles.caption1}`}>
            Koszt formatowania treści zależeć będzie od objętości pracy oraz od tego, ile stron liczy praca, a także terminu wykonania. W przypadku prac
            dyplomowych cena zaczyna się od 9 zł za stronę.
          </p>
          <p>
            Nasza pomoc obejmuje przy tym sprawdzenie, czy poprawna jest bibliografia. Prace licencjackie powinny bowiem odznaczać się spełnianiem standardów od
            strony tytułowej, aż do samego końca.
          </p>
          <p className={`${styles.caption2}`}>Skontaktuj się z nami w celu przeprowadzanie dokładnej wyceny!</p>
          <Button style={{ padding: "20px 30px 20px 30px" }}>Wyceń swój tekst</Button>
        </div>
      </article>
      <div className={`${styles.image_wrapper}`}>
        <Image src={image} alt="Pracujący człowiek"></Image>
      </div>
    </section>
  );
};

export default Section31;
