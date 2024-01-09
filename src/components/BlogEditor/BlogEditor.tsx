"use client";

import { useEffect, useState } from "react";
import ArticleEditor from "./ArticleEditor/ArticleEditor";
import BlogArticles from "./BlogArticles/BlogArticles";
import styles from "./styles.module.scss";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { signal } from "@preact/signals-react";
import Button from "../UI/Button/Button";
import { UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const blogArticlesBriefSignalData = signal<
  | null
  | {
      id: string;
      image: string;
      title: string;
      brief: string;
      docRef: QueryDocumentSnapshot<DocumentData, DocumentData>;
    }[]
>(null);

const BlogEditor = () => {
  const [currentActiveBlogId, setCurrentActiveBlogId] = useState<null | string>(null);
  const [displayEditor, setDisplayEditor] = useState(false);
  const [currentUser, setCurrentUser] = useState<null | UserCredential>("null");
  const [error, setError] = useState<null | string>(null);

  //lookaszek86@gmail.com
  //Lookaszek321

  return (
    <div className={`${styles.blog_editor}`}>
      {currentUser === null ? (
        <form className={`${styles.login}`} onSubmit={(event) => event.preventDefault()} method="POST">
          {error && <p className={`${styles.error}`}>{error}</p>}
          <input placeholder="Email (admin@gmail.com)" name="email" required></input>
          <input placeholder="Hasło (adminQwe)" name="password" type="password" required></input>
          <Button
            type="submit"
            style={{ padding: "15px 20px 15px 20px" }}
            onClick={(event) => {
              const formElement = event.currentTarget.parentElement as HTMLFormElement;
              const formData = new FormData(formElement);
              const password = formData.get("password")! as string;
              const email = formData.get("email")! as string;

              if (password && email) {
                const auth = getAuth();
                signInWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    setCurrentUser(userCredential);
                  })
                  .catch((error) => {
                    setError(error.code);
                  });
              }
            }}>
            Zaloguj się
          </Button>
        </form>
      ) : displayEditor ? (
        <ArticleEditor
          setDisplayEditor={setDisplayEditor}
          setCurrentActiveBlogId={setCurrentActiveBlogId}
          currentActiveBlogId={currentActiveBlogId}></ArticleEditor>
      ) : (
        <BlogArticles setDisplayEditor={setDisplayEditor} setCurrentActiveBlogId={setCurrentActiveBlogId}></BlogArticles>
      )}
    </div>
  );
};

export default BlogEditor;
