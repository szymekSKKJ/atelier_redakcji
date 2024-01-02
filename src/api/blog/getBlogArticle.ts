import { db, storage } from "@/firebaseConfig";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const getBlogArticle = async (id: string) => {
  const articleBlogDocSnap = await getDoc(doc(db, "blogArticles", id));

  const { brief, createdAt, chapters } = articleBlogDocSnap.data() as {
    brief: string;
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

  const storage = getStorage();
  const image = await getDownloadURL(ref(storage, `blogArticles/${id}/mainImage.jpg`));

  return {
    id: id,
    mainImage: image,
    brief: brief,
    createdAt: createdAt,
    chapters: chapters,
  };
};

export default getBlogArticle;
