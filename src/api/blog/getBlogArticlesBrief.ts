import { db } from "@/firebaseConfig";
import { getDocs, query, collection, orderBy, documentId, limit, QueryDocumentSnapshot, DocumentData, startAt, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const getQuery = async (limitValue: number, lastDoc?: QueryDocumentSnapshot<DocumentData, DocumentData>, keyWord?: string) => {
  if (lastDoc) {
    return await getDocs(query(collection(db, "blogArticles"), orderBy("createdAt", "desc"), limit(limitValue), startAt(lastDoc)));
  }
  if (keyWord) {
    return await getDocs(query(collection(db, "blogArticles"), limit(limitValue), where("word", "<=", keyWord + "\uf8ff")));
  }

  return await getDocs(query(collection(db, "blogArticles"), orderBy("createdAt", "desc"), limit(limitValue)));
};

const getBlogArticlesBrief = async (limitValue: number, lastDoc?: QueryDocumentSnapshot<DocumentData, DocumentData>, keyWord?: string) => {
  const blogArticlesQuerySnapshot = await getQuery(limitValue, lastDoc, keyWord);

  const blogArticles = await Promise.all(
    blogArticlesQuerySnapshot.docs.map(async (doc) => {
      const { brief, chapters } = doc.data();

      const storage = getStorage();
      const image = await getDownloadURL(ref(storage, `blogArticles/${doc.id}/mainImage.jpg`));

      return {
        id: doc.id,
        image: image,
        title: chapters[0].title,
        brief: brief,
        docRef: doc,
      } as {
        id: string;
        image: string;
        title: string;
        brief: string;
        docRef: QueryDocumentSnapshot<DocumentData, DocumentData>;
      };
    })
  );

  return blogArticles;
};

export default getBlogArticlesBrief;
