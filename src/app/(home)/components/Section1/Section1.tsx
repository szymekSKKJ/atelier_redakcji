import Image from "next/image";
import styles from "./styles.module.scss";
import image1 from "../../../../../public/home/section1/image.png";
import CurvedLines from "@/globalComponents/CurvedLines/CurvedLines";
import { Mulish } from "next/font/google";

const mulishFont = Mulish({ subsets: ["latin"] });

const Section1 = () => {
  return (
    <section className={`${styles.section}`}>
      <figure>
        <Image src={image1} alt="Grupa pracujących ludzi"></Image>
      </figure>
      <article>
        <h2>Praca ze słowem to nasz tlen i energia do życia</h2>
        <CurvedLines></CurvedLines>
        <div className={`${styles.wrapper}`}>
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
          <button className={`${mulishFont.className}`}>Wyceń swój tekst</button>
        </div>
      </article>
    </section>
  );
};

export default Section1;
