import styles from "./styles.module.scss";
import CurvedLines from "@/design/CurvedLines/CurvedLines";

const Section5 = () => {
  return (
    <section className={`${styles.section}`}>
      <h2>Atelier redakcji tekstu w liczbach</h2>
      <CurvedLines></CurvedLines>
      <div className={`${styles.articles}`} role="group">
        <article>
          <div className={`${styles.animated_counter}`} role="group">
            <p>6+</p>
          </div>
          <p>LAT</p>
          <p>doświadczenia</p>
        </article>
        <article>
          <div className={`${styles.animated_counter}`} role="group">
            <p>12+</p>
          </div>
          <p>REDAKTORÓW</p>
          <p>w zespole</p>
        </article>
        <article>
          <div className={`${styles.animated_counter}`} role="group">
            <p>880+</p>
          </div>
          <p>ZADOWOLONYCH</p>
          <p>klientów</p>
        </article>
        <article>
          <div className={`${styles.animated_counter}`} role="group">
            <p>54000+</p>
          </div>
          <p>ZREDAGOWANYCH</p>
          <p>korekt A4</p>
        </article>
      </div>
    </section>
  );
};

export default Section5;
