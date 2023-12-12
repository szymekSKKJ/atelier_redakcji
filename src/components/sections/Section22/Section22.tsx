import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";

const Section22 = () => {
  return (
    <section className={`${styles.section}`}>
      <h1>Cennik</h1>
      <CurvedLines></CurvedLines>
      <p className={`${styles.caption1}`}>Poniżej znajduje się wycena poszczególnych usług.</p>
      <p className={`${styles.caption2}`}>
        W razie dodatkowych pytań prosimy o <mark>kontakt mailowy</mark>.
      </p>
    </section>
  );
};
export default Section22;
