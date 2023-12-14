import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";

interface props {
  sectionData: {
    sections: {
      id: number;
      title: JSX.Element;
      paragraphs: {
        id: number;
        content: JSX.Element;
      }[];
    }[];
  };
}

const Section28 = ({ sectionData }: props) => {
  return (
    <section className={`${styles.section}`}>
      {sectionData.sections.map((sectionData) => {
        const { id, title, paragraphs } = sectionData;

        return (
          <section className={`${styles.wrapper}`} key={id}>
            <div className={`${styles.wrapper}`}>
              <h2>{title}</h2>
              <CurvedLines></CurvedLines>
            </div>
            <article>
              {paragraphs.map((paragraphData, index) => {
                const { id, content } = paragraphData;
                return (
                  <p className={`${index === 0 ? styles.caption1 : styles.caption2}`} key={id}>
                    {content}
                  </p>
                );
              })}
            </article>
          </section>
        );
      })}
    </section>
  );
};

export default Section28;
