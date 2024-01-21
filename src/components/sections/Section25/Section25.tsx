import styles from "./styles.module.scss";
import arrowDown from "../../../../public/arrow down (Stroke).svg";
import Image from "next/image";
import CurvedLines from "@/design/CurvedLines/CurvedLines";
import CustomOfferForm from "../../Forms/CustomOfferForm/CustomOfferForm";
import bgImage1 from "../../../../public/customOfferForm/Contact Form BG 1.png";
import bgImage2 from "../../../../public/customOfferForm/Contact Form BG 2.png";

const Section25 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.background}`}>
        <Image src={bgImage1} alt="Zdjęcie tła"></Image>
        <Image src={bgImage2} alt="Zdjęcie tła"></Image>
      </div>
      <Image src={arrowDown} alt="Duża ikona strzałki w dół" className={`${styles.arrow_down}`}></Image>
      <h2>Masz jakieś pytania?</h2>
      <CurvedLines></CurvedLines>
      <CustomOfferForm theme="light"></CustomOfferForm>
    </section>
  );
};

export default Section25;
