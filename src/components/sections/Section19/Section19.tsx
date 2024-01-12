import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";

const Section19 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.background}`}></div>
      <h2>Poznaj naszą ofertę</h2>
      <CurvedLines></CurvedLines>
      <p className={`${styles.caption1}`}>
        <mark>Oferujemy kompleksową pomoc w zakresie redakcji i korekty tekstu</mark>, a nasze usługi świadczymy na najwyższym poziomie.
      </p>
    </section>
  );
};

export default Section19;
