import styles from "./styles.module.scss";
import arrowDown from "../../../../public/arrow down (Stroke).svg";
import Image from "next/image";
import CurvedLines from "@/design/CurvedLines/CurvedLines";
import Form from "./Form/Form";

const Section25 = () => {
  return (
    <section className={`${styles.section}`}>
      <Image src={arrowDown} alt="Duża ikona strzałki w dół" className={`${styles.arrow_down}`}></Image>
      <h2>Masz jakieś pytania?</h2>
      <CurvedLines></CurvedLines>
      <Form></Form>
    </section>
  );
};

export default Section25;
