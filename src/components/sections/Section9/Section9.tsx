import styles from "./styles.module.scss";

import CurvedLines from "@/design/CurvedLines/CurvedLines";
import BlogArticlesBrief from "@/components/BlogArticlesBrief/BlogArticlesBrief";
import { db } from "@/firebaseConfig";
import { collection, documentId, getDocs, limit, orderBy, query } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const Section9 = async () => {
  const blogArticlesQuerySnapshot = await getDocs(query(collection(db, "blogArticles"), orderBy(documentId()), limit(3)));

  const blogArticles: {
    id: string;
    image: string;
    title: string;
    brief: string;
    mainImageAlt: string;
  }[] = await Promise.all(
    blogArticlesQuerySnapshot.docs.map(async (doc) => {
      const { title, brief, mainImageAlt } = doc.data();

      const storage = getStorage();
      const image = await getDownloadURL(ref(storage, `blogArticles/${doc.id}/main.jpg`));

      return {
        id: doc.id,
        image: image,
        title: title,
        brief: brief,
        mainImageAlt: mainImageAlt,
      };
    })
  );

  return (
    <section className={styles.section}>
      <header>
        <h2>Zapraszamy na naszego bloga</h2>
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
