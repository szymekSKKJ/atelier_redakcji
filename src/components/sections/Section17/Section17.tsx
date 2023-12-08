import styles from "./styles.module.scss";
import warranty from "../../../../public/warranty.svg";
import Image from "next/image";

const Section17 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.wrapper}`} role="img">
          <Image src={warranty} alt="Ikonka dokumentu"></Image>
        </div>
        <article>
          <h2>
            GWARANACJA <br></br>
            <mark>jakości i zadowolenia</mark>
          </h2>
          <p className={`${styles.caption1}`}>Wiemy, że stres studiowania bywa przytłaczający. Wiemy również, że na końcu tej drogi nie wolno Ci odpuścić!</p>
          <p className={`${styles.caption2}`}>
            Dlatego zapewniamy, że <mark>tekst będzie spełniał wszelkie wymogi uczelniane, redakcyjne i językowe.</mark> Dostaniesz tekst gotowy w 100% do
            publikacji/wydruku.
          </p>
          <button>Wyceń swój tekst</button>
        </article>
      </div>
    </section>
  );
};

export default Section17;
