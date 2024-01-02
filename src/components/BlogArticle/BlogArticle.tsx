"use client";

import { Timestamp } from "firebase/firestore";
import Section13 from "../sections/Section13/Section13";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Section34 from "../sections/Section34/Section34";

interface componentProps {
  data: {
    id: string;
    mainImage: string;
    createdAt: Timestamp;
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
  const { chapters, mainImage, createdAt, id } = data;
  const router = useRouter();

  return (
    <section className={`${styles.section}`}>
      {chapters.map((chapterData, index) => {
        const { title, paragraphs, order } = chapterData;

        if (index === 0) {
          return (
            <>
              <main>
                <article key={order} id={`${order}`}>
                  <h1>{title}</h1>

                  <p className={`${styles.date}`}>
                    {new Date(createdAt.seconds * 1000).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {paragraphs.map((paragraphData) => {
                    const { content, order } = paragraphData;

                    return <p key={order} dangerouslySetInnerHTML={{ __html: content }}></p>;
                  })}
                </article>
                <div className={`${styles.banner}`}>
                  <Image src={mainImage} width={1180} height={1180} alt="Zdjęcia artykuł€ bloga"></Image>
                </div>
                <ol>
                  <p>Spis Treści:</p>
                  {chapters.map((chapterData) => {
                    if (chapterData.order !== 1) {
                      return (
                        <li
                          key={chapterData.order}
                          onClick={() => {
                            router.push(`/blog/${id}/#${chapterData.order}`);
                          }}>
                          {chapterData.title}
                        </li>
                      );
                    }
                  })}
                </ol>
              </main>
            </>
          );
        } else {
          return (
            <>
              <article key={order} id={`${order}`}>
                <h2>{title}</h2>
                {paragraphs.map((paragraphData) => {
                  const { content, order } = paragraphData;

                  return <p key={order} dangerouslySetInnerHTML={{ __html: content }}></p>;
                })}
              </article>
              {Math.floor(chapters.length / 2) === index && <Section13></Section13>}
            </>
          );
        }
      })}
      <Section34></Section34>
    </section>
  );
};

export default BlogArticle;
