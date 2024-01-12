import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";

const Section22 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.background}`}></div>
      <h1>Cennik</h1>
      <CurvedLines></CurvedLines>
      <p className={`${styles.caption1}`}>Poniżej znajduje się wycena poszczególnych usług.</p>
      <p className={`${styles.caption2}`}>
        W razie dodatkowych pytań prosimy o{" "}
        <mark>
          <a href="mailto:kontakt@atelier-redakcji.eu">kontakt mailowy</a>
        </mark>
        .
      </p>
    </section>
  );
};
export default Section22;
