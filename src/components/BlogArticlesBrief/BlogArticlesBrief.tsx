"use client";
import Link from "next/link";
import Button from "../UI/Button/Button";
import styles from "./styles.module.scss";
import Image from "next/image";
import { blogArticle } from "@/app/api/blog/get/[url]/route";

interface componentProps {
  articles: blogArticle[];
  callback?: () => void;
}

const BlogArticlesBrief = ({ articles, callback }: componentProps) => {
  if (articles.length !== 0) {
    return (
      <div className={`${styles.articles}`} role="group">
        {articles.map((articleData) => {
          const { id, image, title, entry, url } = articleData;

          if (articles.length > 1) {
            return (
              <article key={id} className={`${styles.notSingle}`}>
                <Link
                  href={`/${url}`}
                  onClick={() => {
                    callback && callback();
                  }}>
                  <figure>
                    <div className={`${styles.wrapper}`} role="img" aria-label="Zdjęcie">
                      <Image height={380} width={275} src={image} alt="Zdjęcie artykułu bloga"></Image>
                    </div>
                    <figcaption>
                      <h3 className={`${styles.title}`}>{title}</h3>
                    </figcaption>
                  </figure>
                  <p dangerouslySetInnerHTML={{ __html: entry[0].content }}></p>
                  <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute={`/blog/${id}`}>
                    Czytaj więcej
                  </Button>
                </Link>
              </article>
            );
          } else {
            return (
              <article key={id} className={`${styles.single}`}>
                <Link
                  href={`/${url}`}
                  onClick={() => {
                    callback && callback();
                  }}>
                  <figure>
                    <div className={`${styles.wrapper}`} role="img" aria-label="Zdjęcie">
                      <Image height={1000} width={1000} src={image} alt="Zdjęcie artykułu bloga"></Image>
                    </div>
                    <figcaption>
                      <h3 className={`${styles.title}`}>{title}</h3>
                      <p className={`${styles.entry}`} dangerouslySetInnerHTML={{ __html: entry[0].content }}></p>
                      <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute={`/blog/${id}`}>
                        Czytaj więcej
                      </Button>
                    </figcaption>
                  </figure>
                </Link>
              </article>
            );
          }
        })}
      </div>
    );
  } else {
    return <></>;
  }
};

export default BlogArticlesBrief;
