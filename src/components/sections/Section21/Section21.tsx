import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.scss";

const Section21 = () => {
  return (
    <section className={`${styles.section}`}>
      <h2>
        Potrzebujesz <mark>profesjonalnego wsparcia redakcyjnego?</mark> Zapraszamy do współpracy!
      </h2>
      <Button style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }}>Wyceń swój tekst</Button>
    </section>
  );
};

export default Section21;
