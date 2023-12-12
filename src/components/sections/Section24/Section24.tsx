import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.scss";

const Section24 = () => {
  return (
    <section className={`${styles.section}`}>
      <h2>
        Zainteresowany/a? <br></br>Chcesz, abyśmy <mark>wycenili Twój tekst?</mark>
      </h2>
      <Button style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }}>Wyceń swój tekst</Button>
    </section>
  );
};

export default Section24;
