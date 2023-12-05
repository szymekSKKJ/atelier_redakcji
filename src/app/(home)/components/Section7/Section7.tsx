import CurvedLines from "@/globalComponents/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";
import Form from "./Form/Form";

const Section7 = () => {
  return (
    <section className={`${styles.section}`}>
      <header>
        <h2>
          Chcesz <mark>poznać cenę i czas</mark> niezbędny do dokonania zmian w Twoim tekście?
        </h2>
        <CurvedLines></CurvedLines>
        <p className={styles.caption1}>Nic prostszego!</p>
        <p className={`${styles.caption2}`}>
          Wyślij nam próbkę swojego tekstu, a my <mark>wycenimy zlecenie w ciągu 1 godziny!</mark>
        </p>
      </header>
      <Form></Form>
    </section>
  );
};

export default Section7;
