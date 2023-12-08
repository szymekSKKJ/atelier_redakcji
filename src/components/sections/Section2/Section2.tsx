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
        <ul>
          <li>systematyczności i doskonałej organizacji</li>
          <li>wyszukiwania źródeł</li>
          <li>samozaparcia i żelaznej dyscypliny</li>
          <li>umiejętności heurystycznych</li>
          <li>wykorzystania wiedzy z różnych etapów studiów</li>
        </ul>
      </article>
    </section>
  );
};

export default Section2;
