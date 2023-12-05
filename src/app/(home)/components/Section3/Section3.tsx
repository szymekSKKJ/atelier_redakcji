import styles from "./styles.module.scss";

const Section3 = () => {
  return (
    <section className={styles.section}>
      <h2>
        Nie wszyscy są w stanie spełnić te warunki - <mark>my jesteśmy!</mark>
      </h2>
      <button>Wyceń swój tekst</button>
      <p>
        Stawki za korektę i redakcję zaczynają się już od <mark>9 zł brutto za stronę A4.</mark>
      </p>
    </section>
  );
};

export default Section3;
