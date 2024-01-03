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
  const [currentUser, setCurrentUser] = useState<null | UserCredential>({
    user: {
      uid: "RJADqwIaU4aYzUUK299fqkliNA72",
      email: "admin@gmail.com",
      emailVerified: false,
      isAnonymous: false,
      providerData: [
        {
          providerId: "password",
          uid: "admin@gmail.com",
          displayName: null,
          email: "admin@gmail.com",
          phoneNumber: null,
          photoURL: null,
        },
      ],
      stsTokenManager: {
        refreshToken:
          "AMf-vBwBY0JVcxM4UeDQdUQDeXEh5wUV_Pgo3p2GuekTUUnK28E9HcU8CSB4O8zfDSqeeW4C3amCmlYW7qNjoyLQfNn_K5S3NFO53garLEEDH-Ntpw9Cf7_FUTbjXYX0d9nV5lPI8NanXO0W7voCzEdvI7UYwKd9J2-JUQLI9cJv9Ux1Jw3roUOn34hOJ1oxHxv5g8_15xjhqTXYDSmq_5HOWPiR8A314w",
        accessToken:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUyNmM2YTg0YWMwNjcwMDVjZTM0Y2VmZjliM2EyZTA4ZTBkZDliY2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXRlbGllci1yZWRha2NqaSIsImF1ZCI6ImF0ZWxpZXItcmVkYWtjamkiLCJhdXRoX3RpbWUiOjE3MDQyMjI3NjgsInVzZXJfaWQiOiJSSkFEcXdJYVU0YVl6VVVLMjk5ZnFrbGlOQTcyIiwic3ViIjoiUkpBRHF3SWFVNGFZelVVSzI5OWZxa2xpTkE3MiIsImlhdCI6MTcwNDIyMjc2OCwiZXhwIjoxNzA0MjI2MzY4LCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZG1pbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.So4Zig3MgESeokjeW306RHuZvEupfSf8CKzSejSmbNR0qAqTPvtW5gDpRMXwsfw8rykqFAFdnwejespdaXfmpGY-Fr0RnR9OAc0uoOJC0ZHvo0JLijre-553WWW2Jpjfj0i5WoOGgm_XZ5_pskklmgrUI9NT8J3jTv96cRGcBMNHj4IP-wu8kiMuIA9rkLlZSaxgj4fA20a8aiu0Gp1mEkJxZbPjYN50zW_-VzuJtCI9QmeZOPKARtExUY4cFv8ldvYWRUBWfySurp_lolpKgyK_Lzcqv3Os3X-5wBJCNEbY6BfCBgSLNDWzviiQhM2-gge8Flhei6lnsft3wH1sQQ",
        expirationTime: 1704226368676,
      },
      createdAt: "1704209682020",
      lastLoginAt: "1704222768064",
      apiKey: "AIzaSyCIvB3QRd4cravjVR05utkCmhhiMkDYq0s",
      appName: "[DEFAULT]",
    },
    providerId: null,
    _tokenResponse: {
      kind: "identitytoolkit#VerifyPasswordResponse",
      localId: "RJADqwIaU4aYzUUK299fqkliNA72",
      email: "admin@gmail.com",
      displayName: "",
      idToken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUyNmM2YTg0YWMwNjcwMDVjZTM0Y2VmZjliM2EyZTA4ZTBkZDliY2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXRlbGllci1yZWRha2NqaSIsImF1ZCI6ImF0ZWxpZXItcmVkYWtjamkiLCJhdXRoX3RpbWUiOjE3MDQyMjI3NjgsInVzZXJfaWQiOiJSSkFEcXdJYVU0YVl6VVVLMjk5ZnFrbGlOQTcyIiwic3ViIjoiUkpBRHF3SWFVNGFZelVVSzI5OWZxa2xpTkE3MiIsImlhdCI6MTcwNDIyMjc2OCwiZXhwIjoxNzA0MjI2MzY4LCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZG1pbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.So4Zig3MgESeokjeW306RHuZvEupfSf8CKzSejSmbNR0qAqTPvtW5gDpRMXwsfw8rykqFAFdnwejespdaXfmpGY-Fr0RnR9OAc0uoOJC0ZHvo0JLijre-553WWW2Jpjfj0i5WoOGgm_XZ5_pskklmgrUI9NT8J3jTv96cRGcBMNHj4IP-wu8kiMuIA9rkLlZSaxgj4fA20a8aiu0Gp1mEkJxZbPjYN50zW_-VzuJtCI9QmeZOPKARtExUY4cFv8ldvYWRUBWfySurp_lolpKgyK_Lzcqv3Os3X-5wBJCNEbY6BfCBgSLNDWzviiQhM2-gge8Flhei6lnsft3wH1sQQ",
      registered: true,
      refreshToken:
        "AMf-vBwBY0JVcxM4UeDQdUQDeXEh5wUV_Pgo3p2GuekTUUnK28E9HcU8CSB4O8zfDSqeeW4C3amCmlYW7qNjoyLQfNn_K5S3NFO53garLEEDH-Ntpw9Cf7_FUTbjXYX0d9nV5lPI8NanXO0W7voCzEdvI7UYwKd9J2-JUQLI9cJv9Ux1Jw3roUOn34hOJ1oxHxv5g8_15xjhqTXYDSmq_5HOWPiR8A314w",
      expiresIn: "3600",
    },
    operationType: "signIn",
  });
  const [error, setError] = useState<null | string>(null);

  return (
    <div className={`${styles.blog_editor}`}>
      {currentUser === null ? (
        <form className={`${styles.login}`} onSubmit={(event) => event.preventDefault()} method="POST">
          {error && <p className={`${styles.error}`}>{error}</p>}
          <input placeholder="Email (admin@gmail.com)" name="email" required></input>
          <input placeholder="Hasło (adminQwe)" name="password" type="password" required></input>
          <Button
            type="submit"
            style={{ padding: "20px 30px 20px 30px" }}
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
