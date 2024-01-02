import styles from "./styles.module.scss";
import Image from "next/image";
import person from "../../../../public/person.jpg";
import linkedIn from "../../../../public/linkedIn.svg";

const Section34 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.image_wrapper}`}>
        <Image src={person} alt="Autor"></Image>
      </div>
      <div className={`${styles.wrapper}`}>
        <span>
          <p>Adam Kowalski</p>
          <Image src={linkedIn} alt="Ikona linkedin"></Image>
        </span>
        <b>Specjalista ds. redakcji i korekty</b>
        <p>
          Prywatnie pasjonata gier karcianych oraz czytania kryminałów. Uwielbia skomplikowane intrygi, kiedy do końca nie wiadomo, kto jest sprawcą. W czasie
          wolnym największą frajdę sprawia mu podróżowanie i poznawanie nowych kultur.
        </p>
      </div>
    </section>
  );
};

export default Section34;
