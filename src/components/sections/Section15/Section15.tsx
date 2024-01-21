import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";

const Section15 = () => {
  return (
    <section className={`${styles.section}`}>
      <article className={`${styles.wrapper_left}`}>
        <h2>Dlaczego my?</h2>
        <CurvedLines></CurvedLines>
        <p className={`${styles.caption1}`}>
          Jesteśmy najlepsi w tym, co robimy. Kładziemy bardzo duży nacisk na rzetelność naszej pracy oraz zadowolenie klienta.
        </p>
        <p className={`${styles.caption2}`}>
          Nie pozwalamy sobie na newralgiczne błędy, a już w zupełności nie doświadczysz u nas niedotrzymywania danego słowa.
        </p>
      </article>
      <article className={`${styles.wrapper_right}`}>
        <p className={`${styles.caption1}`}>Współpracując z nami, zapewniamy:</p>
        <ul>
          <li>
            <p>
              <mark>Terminowość -</mark> otrzymasz swoją poprawioną pracę na czas - nigdy nie zostaniesz na lodzie!
            </p>
          </li>
          <li>
            <p>
              <mark>Pełną ochronę danych -</mark> zachowanie całkowitej poufności to dla nas rzecz święta!
            </p>
          </li>
          <li>
            <p>
              <mark>Jakość wykonania -</mark> tworzymy z pasji i doświadczenia; dostarczamy kompleksowe treści pewne swojej wartości.
            </p>
          </li>
          <li>
            <p>
              <mark>Korzystną cenę -</mark> realizujemy teksty z naciskiem na uczciwe warunki współpracy.
            </p>
          </li>
        </ul>
      </article>
    </section>
  );
};

export default Section15;
