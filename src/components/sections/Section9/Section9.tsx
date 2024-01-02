import styles from "./styles.module.scss";

import CurvedLines from "@/design/CurvedLines/CurvedLines";
import BlogArticlesBrief from "@/components/BlogArticlesBrief/BlogArticlesBrief";
import { db } from "@/firebaseConfig";
import { collection, documentId, getDocs, limit, orderBy, query } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import getBlogArticlesBrief from "@/api/blog/getBlogArticlesBrief";

interface componentProps {
  type?: "landing page" | "blog";
}

const Section9 = async ({ type = "landing page" }: componentProps) => {
  const blogArticles = await getBlogArticlesBrief(3);

  return (
    <section className={styles.section}>
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
      <BlogArticlesBrief articles={blogArticles}></BlogArticlesBrief>
    </section>
  );
};

export default Section9;
