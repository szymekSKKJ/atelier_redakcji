import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.scss";

const Section3 = () => {
  return (
    <section className={styles.section}>
      <h2>
        Nie wszyscy są w stanie spełnić te warunki - <mark>my jesteśmy!</mark>
      </h2>
      <Button style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute="/#mainForm">
        Wyceń swój tekst
      </Button>
      <p>
        Stawki za korektę i redakcję zaczynają się już od <mark>9 zł brutto za stronę A4.</mark>
      </p>
    </section>
  );
};

export default Section3;
