import { db } from "@/firebaseConfig";
import { getDocs, query, collection, orderBy, documentId, limit } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const getBlogArticlesBrief = async (limitValue: number) => {
  const blogArticlesQuerySnapshot = await getDocs(query(collection(db, "blogArticles"), orderBy(documentId()), limit(limitValue)));

  const blogArticles = await Promise.all(
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
      } as {
        id: string;
        image: string;
        title: string;
        brief: string;
        mainImageAlt: string;
      };
    })
  );

  return blogArticles;
};

export default getBlogArticlesBrief;
