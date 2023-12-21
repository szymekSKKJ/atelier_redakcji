import styles from "./styles.module.scss";
import warranty from "../../../../public/warranty.svg";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";

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
          <Button style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute="/#mainForm">
            Wyceń swój tekst
          </Button>
        </article>
      </div>
    </section>
  );
};

export default Section17;
