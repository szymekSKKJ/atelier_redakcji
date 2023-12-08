import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";

const Section18 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.wrapper1}`}>
        <h2>
          Jesteśmy Atelier redakcji tekstu. <br></br>
          <mark>Poznajmy się!</mark>
        </h2>
        <CurvedLines></CurvedLines>
        <p className={`${styles.caption1}`}>Kilka lat temu znaleźliśmy się wszyscy w odpowiednim miejscu i czasie, aby stworzyć zespół gotowy na niemożliwe.</p>
        <p className={`${styles.caption2}`}>
          To tutaj każda treść niezmiennie od lat nabiera rumieńców i dojrzewa do prezentacji przed najbardziej wymagającą komisją, sędzią czy odbiorcą,
          przeradzając się w to, <mark>na czym zależy nam najbardziej: Twój osobisty sukces.</mark>
        </p>
      </div>
    </section>
  );
};

export default Section18;
