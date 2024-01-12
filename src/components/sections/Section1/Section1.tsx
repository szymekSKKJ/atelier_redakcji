import Image from "next/image";
import styles from "./styles.module.scss";
import image1 from "../../../../public/sections/section1/image.webp";
import CurvedLines from "@/design/CurvedLines/CurvedLines";
import Button from "@/components/UI/Button/Button";

const Section1 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.wrapper_image}`} role="img">
        <Image src={image1} alt="Grupa pracujących ludzi"></Image>
      </div>
      <article className={`${styles.wrapper}`}>
        <h2>Praca ze słowem to nasz tlen i energia do życia</h2>
        <CurvedLines></CurvedLines>
        <div className={`${styles.wrapper}`} role="group">
          <p>
            <mark className={`${styles.bold}`}>Obecnie poprawiamy ponad 3.000.000 znaków, czyli ok. 1.650 kartek A4 miesięcznie</mark>. Możemy zająć się
            redakcją i korektą właściwie każdego tekstu.
          </p>
          <p>
            <mark className={`${styles.bold}`}>Współpracujemy z agencjami marketingowymi, studentami, doktorantami, blogerami itd.</mark> - dosłownie z każdym,
            kto potrzebuje wsparcia przy swoim tekście.
          </p>
          <p>
            <mark className={`${styles.bold}`}>Masz jakiś tekst do sprawdzenia? Chętnie pomożemy!</mark>
          </p>
          <Button style={{ padding: "20px 30px 20px 30px" }} changeRoute="/#mainForm">
            Wyceń swój tekst
          </Button>
        </div>
      </article>
    </section>
  );
};

export default Section1;
