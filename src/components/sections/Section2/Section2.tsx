import styles from "./styles.module.scss";
import checkIcon from "../../../../public/check_icon.svg";
import Image from "next/image";
import CurvedLines from "@/design/CurvedLines/CurvedLines";

const Section2 = () => {
  return (
    <section className={`${styles.section}`}>
      <header>
        <h2>
          Doskonale wiemy, że samodzielne pisanie pracy <mark>nie jest zadaniem prostym</mark>
        </h2>
        <CurvedLines></CurvedLines>
      </header>
      <article>
        <h3>Proces twórczy wymaga:</h3>
        <div className={`${styles.articles}`}>
          <article>
            <Image src={checkIcon} alt="Check icon"></Image>
            <p>systematyczności i doskonałej organizacji</p>
          </article>
          <article>
            <Image src={checkIcon} alt="Check icon"></Image>
            <p>wyszukiwania źródeł</p>
          </article>
          <article>
            <Image src={checkIcon} alt="Check icon"></Image>
            <p>samozaparcia i żelaznej dyscypliny</p>
          </article>
          <article>
            <Image src={checkIcon} alt="Check icon"></Image>
            <p>umiejętności heurystycznych</p>
          </article>
          <article>
            <Image src={checkIcon} alt="Check icon"></Image>
            <p>wykorzystania wiedzy z różnych etapów studiów</p>
          </article>
        </div>
      </article>
    </section>
  );
};

export default Section2;
