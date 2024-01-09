import Link from "next/link";
import Button from "../UI/Button/Button";
import styles from "./styles.module.scss";
import Image from "next/image";

interface componentProps {
  articles: {
    id: string;
    image: string;
    title: string;
    brief: string;
  }[];
}

const BlogArticlesBrief = ({ articles }: componentProps) => {
  if (articles.length !== 0) {
    return (
      <div className={`${articles.length === 1 ? styles.articles_single : styles.articles_multiple}`} role="group">
        {articles.map((articleData) => {
          const { id, image, title, brief } = articleData;

          if (articles.length === 1) {
            return (
              <article key={id}>
                <Link href={`/blog/${id}`}>
                  <div className={`${styles.image_wrapper}`} role="img" aria-label="Zdjęcie">
                    <Image height={512} width={512} src={image} alt="Zdjęcie artykułu bloga"></Image>
                  </div>
                  <div className={`${styles.content_wrapper}`}>
                    <h2>{title}</h2>
                    <p className={`${styles.brief}`} dangerouslySetInnerHTML={{ __html: brief }}></p>
                    <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute={`/blog/${id}`}>
                      Czytaj więcej
                    </Button>
                  </div>
                </Link>
              </article>
            );
          } else {
            return (
              <article key={id}>
                <Link href={`/blog/${id}`}>
                  <figure>
                    <div className={`${styles.wrapper}`} role="img" aria-label="Zdjęcie">
                      <Image height={512} width={512} src={image} alt="Zdjęcie artykułu bloga"></Image>
                    </div>
                    <figcaption>{title}</figcaption>
                  </figure>
                  <p dangerouslySetInnerHTML={{ __html: brief }}></p>
                  <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute={`/blog/${id}`}>
                    Czytaj więcej
                  </Button>
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
