import { db, storage } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const getBlogArticle = async (id: string) => {
  const chaptersQuerySnapshot = await getDocs(collection(db, "blogArticles", id, "chapters"));
  const articleDocRef = doc(db, "blogArticles", id);
  const articleDocSnap = await getDoc(articleDocRef);

  if (chaptersQuerySnapshot.size === 0) {
    return undefined;
  } else {
    const { mainImageAlt } = articleDocSnap.data()!;

    const chapters = await Promise.all(
      chaptersQuerySnapshot.docs.map(async (doc) => {
        const { title, order } = doc.data() as { title: string; order: number };

        const paragraphsQuerySnapshot = await getDocs(collection(db, "blogArticles", id, "chapters", doc.id, "paragraphs"));

        const paragraphs = paragraphsQuerySnapshot.docs.map((doc) => {
          const { order, content } = doc.data() as { order: number; content: string };

          return {
            order: order,
            content: content,
          };
        });

        paragraphs.sort((a, b) => a.order - b.order);

        return {
          order: order,
          title: title,
          paragraphs: paragraphs,
        };
      })
    );

    const mainImage = await getDownloadURL(ref(storage, `blogArticles/${id}/main.jpg`));

    chapters.sort((a, b) => a.order - b.order);

    const articleData = {
      mainImage: mainImage,
      chapters: chapters,
      mainImageAlt: mainImageAlt,
    };

    return articleData;
  }
};

export default getBlogArticle;
