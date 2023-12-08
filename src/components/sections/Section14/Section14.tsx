import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";

const Section14 = () => {
  return (
    <section className={`${styles.section}`}>
      <h2>Możemy Ci w tym pomóc!</h2>
      <CurvedLines></CurvedLines>
      <p className={`${styles.caption1}`}>Powierz nam swój tekst i już przestań dłużej się nim martwić.</p>
      <p className={`${styles.caption2}`}>
        <mark>Zajmiemy się redakcją, korektą i formatowaniem Twojego tekstu</mark>, gdy Ty możesz w tym czasie się relaksować.
      </p>
    </section>
  );
};

export default Section14;
