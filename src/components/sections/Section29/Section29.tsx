import styles from "./styles.module.scss";
import image from "../../../../public/sections/section29/image1.jpg";
import Image from "next/image";
import CurvedLines from "@/design/CurvedLines/CurvedLines";
import Button from "@/components/UI/Button/Button";

const Section29 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.image_wrapper}`} role="img">
        <Image src={image} alt="Komputer"></Image>
      </div>
      <article>
        <h2>
          Dlaczego warto skorzystać <mark>z pomocy specjalisty?</mark>
        </h2>
        <CurvedLines></CurvedLines>
        <div className={`${styles.wrapper}`} role="group">
          <p className={`${styles.caption1}`}>
            Pisanie prac licencjackich stanowi ogromne wyzwanie dla większości studentów. Bardzo często samodzielne znalezienie błędów jest niemożliwe.
          </p>
          <p>
            Dobra znajomość tekstu sprawia, że wiele literówek oraz niespójności logicznych pozostaje niezauważona. Dodatkowo dochodzą formalne standardy pracy
            licencjackiej oraz zasady zapisu pracy dyplomowej.
          </p>
          <p className={`${styles.caption2}`}>
            Z tego powodu warto powierzyć korektę treści doświadczonym ekspertom z naszego <mark>Atelier redakcji tekstu</mark>, którzy krytycznie ocenią
            jasność i precyzję formułowania myśli. Dzięki pomocy specjalistów pisanie prac licencjackich będzie skutkować powstaniem wartościowego, pod względem
            akademickim, tekstu.
          </p>
          <Button style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }}>Wyceń swój tekst</Button>
        </div>
      </article>
    </section>
  );
};

export default Section29;
