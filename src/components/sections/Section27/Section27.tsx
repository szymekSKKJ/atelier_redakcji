import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";

interface props {
  sectionData: {
    headerTitlte: string;
    title: JSX.Element;
    paragraphs: {
      id: number;
      content: JSX.Element;
    }[];
  };
  type?: string;
}

const Section27 = ({ sectionData, type }: props) => {
  return (
    <section className={`${styles.section} ${type === "default" ? styles.default : ""} `}>
      <header>
        <p>OFERTA</p>
        <hr></hr>
        <h1>{sectionData.headerTitlte}</h1>
      </header>
      <div className={`${styles.wrapper}`}>
        <h2>{sectionData.title}</h2>
        <CurvedLines></CurvedLines>
        {type === "default" ? (
          <div className={styles.default_wrapper}>
            {sectionData.paragraphs.map((paragraphData, index) => {
              const { id, content } = paragraphData;

              return <p key={id}>{content}</p>;
            })}
          </div>
        ) : (
          <div className={`${styles.wrapper}`} role="group">
            <article>
              {sectionData.paragraphs.map((paragraphData, index) => {
                const { id, content } = paragraphData;
                if (index <= 2) {
                  return (
                    <p className={`${index === 0 ? styles.caption1 : styles.caption2}`} key={id}>
                      {content}
                    </p>
                  );
                }
              })}
            </article>
            <article>
              {sectionData.paragraphs.map((paragraphData, index) => {
                const { id, content } = paragraphData;
                if (index > 2) {
                  return (
                    <p className={`${index === 3 ? styles.caption1 : styles.caption2}`} key={id}>
                      {content}
                    </p>
                  );
                }
              })}
            </article>
          </div>
        )}
      </div>
    </section>
  );
};

export default Section27;
