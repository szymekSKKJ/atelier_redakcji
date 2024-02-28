import styles from "./styles.module.scss";
import CurvedLines from "@/design/CurvedLines/CurvedLines";
import BlogArticlesBrief from "@/components/BlogArticlesBrief/BlogArticlesBrief";
import { blogGetSome } from "@/app/api/blog/get/some/route";
import { HTMLAttributes } from "react";

export const runtime = "edge";

interface componentProps extends HTMLAttributes<HTMLElement> {
  type?: "landing page" | "blog";
}

const Section9 = async ({ type = "landing page", style }: componentProps) => {
  const blogAriclesResponse = await blogGetSome(0, 3, true);

  return (
    <section className={`${styles.section} ${type === "blog" ? styles.blog : ""}`} style={style}>
      <header>
        <h2>
          {type === "blog" ? (
            <>
              <mark>Podobne</mark> artykuły
            </>
          ) : (
            <>Zapraszamy na naszego bloga</>
          )}
        </h2>
        <CurvedLines></CurvedLines>
        <p className={styles.caption1}>
          Znajdziesz tam praktyczne wskazówki dot. m.in.:<br></br> aspektów związanych z pisaniem prac oraz poprawnością językową.
        </p>
      </header>
      {blogAriclesResponse.data && <BlogArticlesBrief page={"blog"} articles={blogAriclesResponse.data}></BlogArticlesBrief>}
    </section>
  );
};

export default Section9;
