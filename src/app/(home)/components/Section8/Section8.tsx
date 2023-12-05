import CurvedLines from "@/globalComponents/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";

const Section8 = () => {
  return (
    <section className={`${styles.section}`}>
      <header>
        <h2>FAQ</h2>
        <CurvedLines></CurvedLines>
        <p className={styles.caption1}>Przygotowaliśmy najczęściej pojawiające się od Was pytania.</p>
        <p className={`${styles.caption2}`}>
          Prawdopodobnie znajdziesz odpowiedź na swoje pytanie poniżej, a jeśli to coś nowego, napisz do nas - na pewno pomożemy!
        </p>
      </header>
      <div className={`${styles.questions}`}>
        <input type="checkbox" id="detail_1" hidden />
        <details open>
          <summary>
            <label htmlFor="detail_1">Czy korekta pracy licencjackiej jest legalna?</label>
          </summary>
          <div className={`${styles.content}`}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi unde, ex rem voluptates autem aliquid veniam quis temporibus repudiandae illo,
              nostrum, pariatur quae! At animi modi dignissimos corrupti placeat voluptatum!
            </p>
          </div>
        </details>
        <input type="checkbox" id="detail_2" hidden />
        <details open>
          <summary>
            <label htmlFor="detail_2">Czym jest korekta, redakcja i formatowanie?</label>
          </summary>
          <div className={`${styles.content}`}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi unde, ex rem voluptates autem aliquid veniam quis temporibus repudiandae illo,
              nostrum, pariatur quae! At animi modi dignissimos corrupti placeat voluptatum!
            </p>
          </div>
        </details>
        <input type="checkbox" id="detail_3" hidden />
        <details open>
          <summary>
            <label htmlFor="detail_3">Ile kosztuje korekta jednej strony A4?</label>
          </summary>
          <div className={`${styles.content}`}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi unde, ex rem voluptates autem aliquid veniam quis temporibus repudiandae illo,
              nostrum, pariatur quae! At animi modi dignissimos corrupti placeat voluptatum!
            </p>
          </div>
        </details>
        <input type="checkbox" id="detail_4" hidden />
        <details open>
          <summary>
            <label htmlFor="detail_4">Ile kosztuje korekta pracy licencjackiej?</label>
          </summary>
          <div className={`${styles.content}`}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi unde, ex rem voluptates autem aliquid veniam quis temporibus repudiandae illo,
              nostrum, pariatur quae! At animi modi dignissimos corrupti placeat voluptatum!
            </p>
          </div>
        </details>
        <input type="checkbox" id="detail_5" hidden />
        <details open>
          <summary>
            <label htmlFor="detail_5">Ile kosztuje formatowanie pracy licencjackiej?</label>
          </summary>
          <div className={`${styles.content}`}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi unde, ex rem voluptates autem aliquid veniam quis temporibus repudiandae illo,
              nostrum, pariatur quae! At animi modi dignissimos corrupti placeat voluptatum!
            </p>
          </div>
        </details>
        <input type="checkbox" id="detail_6" hidden />
        <details open>
          <summary>
            <label htmlFor="detail_6">Ile trwa korekta?</label>
          </summary>
          <div className={`${styles.content}`}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi unde, ex rem voluptates autem aliquid veniam quis temporibus repudiandae illo,
              nostrum, pariatur quae! At animi modi dignissimos corrupti placeat voluptatum!
            </p>
          </div>
        </details>
      </div>
      <p className={styles.caption3}>Masz dodatkowe pytania?</p>
      <p className={styles.caption4}>
        Napisz do nas na adres <mark>kontakt@atelier-redakcji.eu</mark>
      </p>
    </section>
  );
};

export default Section8;
