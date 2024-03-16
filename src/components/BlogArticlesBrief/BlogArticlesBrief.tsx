"use client";
import Link from "next/link";
import Button from "../UI/Button/Button";
import styles from "./styles.module.scss";
import Image from "next/image";
import { blogArticle } from "@/app/api/blog/get/[pathname]/route";

interface componentProps {
  articles: blogArticle[];
  page?: null | "blog";
  callback?: () => void;
}

const BlogArticlesBrief = ({ articles, page, callback }: componentProps) => {
  if (articles.length !== 0) {
    return (
      <div className={`${styles.articles}`} role="group">
        {articles.map((articleData) => {
          const { id, image, title, entry, pathname, category } = articleData;

          if (articles.length > 1) {
            return (
              <article key={id} className={`${styles.notSingle}`}>
                <Link
                  href={`/${pathname}`}
                  onClick={() => {
                    callback && callback();
                  }}>
                  <figure>
                    <div className={`${styles.wrapper}`} role="img" aria-label="Zdjęcie">
                      <Image height={380} width={275} src={image.string} alt="Zdjęcie artykułu bloga"></Image>
                      {page === "blog" && (
                        <div className={`${styles.category}`}>
                          <p>{category}</p>
                        </div>
                      )}
                    </div>
                    <figcaption>
                      <h3 className={`${styles.title}`}>{title}</h3>
                    </figcaption>
                  </figure>
                  <p dangerouslySetInnerHTML={{ __html: entry[0].content }}></p>
                  {page === "blog" || (
                    <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute={`/blog/${id}`}>
                      Czytaj więcej
                    </Button>
                  )}
                </Link>
              </article>
            );
          } else {
            return (
              <article key={id} className={`${styles.single}`}>
                <Link
                  href={`/${pathname}`}
                  onClick={() => {
                    callback && callback();
                  }}>
                  <figure>
                    <div className={`${styles.wrapper}`} role="img" aria-label="Zdjęcie">
                      <Image height={1000} width={1000} src={image.string} alt="Zdjęcie artykułu bloga"></Image>
                      {page === "blog" && (
                        <div className={`${styles.category}`}>
                          <p>{category}</p>
                        </div>
                      )}
                    </div>
                    <figcaption>
                      <h3 className={`${styles.title}`}>{title}</h3>
                      <p className={`${styles.entry}`} dangerouslySetInnerHTML={{ __html: entry[0].content }}></p>
                      {page !== "blog" && (
                        <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute={`/blog/${id}`}>
                          Czytaj więcej
                        </Button>
                      )}
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
