import styles from "./styles.module.scss";
import Image from "next/image";
import image from "../../../../public/sections/section16/image.jpg";
import CurvedLines from "@/design/CurvedLines/CurvedLines";

const Section16 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.wrapper}`}>
        <article className={`${styles.left}`}>
          <div className={`${styles.wrapper}`} role="img">
            <Image src={image} alt="Pracujące osoby"></Image>
          </div>
        </article>
        <article className={`${styles.right}`}>
          <h2>
            U nas <mark>nie usłyszysz</mark> słowa <mark>„niemożliwe”</mark>!
          </h2>
          <CurvedLines></CurvedLines>
          <p className={`${styles.caption1}`}>
            <mark>Pomagamy w każdym przypadku</mark>, niezależnie od rodzaju treści!
          </p>
          <p className={`${styles.caption2}`}>Specjalnie dla Ciebie poddamy redakcji i korekcie dowolny tekst:</p>
          <ul>
            <li>Prace licencjackie i magisterskie</li>
            <li>Dysertacje doktorskie</li>
            <li>Rozprawy habilitacyjne</li>
            <li>Książki i artykuły blogowe</li>
            <li>Każdy inny rodzaj treści</li>
          </ul>
        </article>
      </div>
      <h2>
        A wszystko to z filiżanką kawy i <mark>z najlepszym nastawieniem!</mark>
      </h2>
    </section>
  );
};

export default Section16;
