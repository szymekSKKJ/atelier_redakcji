import Section13 from "../sections/Section13/Section13";
import styes from "./styles.module.scss";
import Image from "next/image";

interface componentProps {
  data: {
    mainImage: string;
    mainImageAlt: string;
    chapters: {
      order: number;
      title: string;
      paragraphs: {
        order: number;
        content: string;
      }[];
    }[];
  };
}

const BlogArticle = ({ data }: componentProps) => {
  const { chapters, mainImage, mainImageAlt } = data;

  return (
    <section className={`${styes.section}`}>
      {chapters.map((chapterData, index) => {
        const { title, paragraphs, order } = chapterData;

        if (index === 0) {
          return (
            <>
              <main>
                <article key={order}>
                  <h1>{title}</h1>
                  <div className={`${styes.paragraphs}`}>
                    {paragraphs.map((paragraphData) => {
                      const { content, order } = paragraphData;

                      return <p key={order} dangerouslySetInnerHTML={{ __html: content }}></p>;
                    })}
                  </div>
                </article>
                <div className={`${styes.banner}`}>
                  <Image src={mainImage} width={1180} height={1180} alt={mainImageAlt}></Image>
                </div>
                <ol>
                  <p>Spis Treści:</p>
                  {chapters.map((chapterData) => {
                    if (chapterData.order !== 1) {
                      return <li key={chapterData.order}>{chapterData.title}</li>;
                    }
                  })}
                </ol>
              </main>
            </>
          );
        } else {
          return (
            <>
              <article key={order}>
                <h2>{title}</h2>
                <div className={`${styes.paragraphs}`}>
                  {paragraphs.map((paragraphData) => {
                    const { content, order } = paragraphData;

                    return <p key={order} dangerouslySetInnerHTML={{ __html: content }}></p>;
                  })}
                </div>
              </article>
              {Math.floor(chapters.length / 2) === index && <Section13></Section13>}
            </>
          );
        }
      })}
    </section>
  );
};

export default BlogArticle;
