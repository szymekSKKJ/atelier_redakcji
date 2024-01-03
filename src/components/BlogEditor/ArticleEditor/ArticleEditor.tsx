"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Timestamp, addDoc, collection, deleteDoc, doc, or, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import { db } from "@/firebaseConfig";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import getBlogArticle from "@/api/blog/getBlogArticle";
import Editable from "./Editable/Editable";
import { blogArticlesBriefSignalData } from "../BlogEditor";
import { settings } from "firebase/analytics";

interface componentProps {
  currentActiveBlogId: string | null;
  setCurrentActiveBlogId: Dispatch<SetStateAction<string | null>>;
  setDisplayEditor: Dispatch<SetStateAction<boolean>>;
}

const ArticleEditor = ({ currentActiveBlogId, setCurrentActiveBlogId, setDisplayEditor }: componentProps) => {
  const [article, setArticle] = useState<{
    id: null | string;
    mainImage: File | null | string;
    createdAt: Timestamp | null;
    chapters: {
      order: number;
      title: string;
      paragraphs: {
        order: number;
        content: string;
      }[];
    }[];
  } | null>(() => {
    if (currentActiveBlogId) {
      return null;
    } else {
      return {
        id: null,
        mainImage: null,
        createdAt: null,
        chapters: [
          {
            order: 1,
            title: "",
            paragraphs: [
              {
                order: 1,
                content: "",
              },
            ],
          },
          {
            order: 2,
            title: "",
            paragraphs: [
              {
                order: 1,
                content: "",
              },
            ],
          },
        ],
      };
    }
  });

  useEffect(() => {
    if (currentActiveBlogId) {
      (async () => {
        const currentActiveBlogData = await getBlogArticle(currentActiveBlogId);

        setArticle((currentValue) => {
          let copiedCurrentValue = structuredClone(currentValue);

          return { ...copiedCurrentValue, ...currentActiveBlogData };
        });
      })();
    }
  }, []);

  if (article) {
    const { chapters, mainImage } = article;

    return (
      <>
        <div className={`${styles.article_editor}`}>
          <div className={`${styles.options}`}>
            <Button
              style={{ padding: "10px 15px 10px 15px", fontSize: "14px" }}
              onClick={() => {
                setCurrentActiveBlogId(null);
                setDisplayEditor(false);
              }}>
              Powrót
            </Button>
            {currentActiveBlogId && (
              <Button
                theme="danger"
                style={{ padding: "10px 15px 10px 15px", fontSize: "14px" }}
                onClick={async () => {
                  await deleteDoc(doc(db, "blogArticles", currentActiveBlogId));

                  setDisplayEditor(false);
                  setCurrentActiveBlogId(null);
                  blogArticlesBriefSignalData.value = null;
                }}>
                Usuń artykuł
              </Button>
            )}
            <Button
              theme="transparent-blue"
              style={{ padding: "10px 15px 10px 15px", fontSize: "14px", marginLeft: "auto" }}
              onClick={async () => {
                if (mainImage) {
                  const { chapters, mainImage } = article;

                  const storage = getStorage();

                  const brief = chapters[0].paragraphs[0].content
                    .split("")
                    .filter((char, index) => index <= 200 && char)
                    .join("");

                  if (currentActiveBlogId) {
                    await updateDoc(doc(db, "blogArticles", currentActiveBlogId!), {
                      brief: brief,
                      createdAt: new Date(),
                      chapters: chapters,
                    });

                    if (typeof mainImage !== "string") {
                      await uploadBytes(ref(storage, `blogArticles/${currentActiveBlogId}/mainImage.jpg`), mainImage as File);
                      console.log("done with image");
                    }
                    console.log("done update");
                  } else {
                    const articleBlogDocRef = await addDoc(collection(db, "blogArticles"), {
                      brief: brief,
                      createdAt: new Date(),
                      chapters: chapters,
                    });

                    await uploadBytes(ref(storage, `blogArticles/${articleBlogDocRef.id}/mainImage.jpg`), mainImage as File);
                    console.log("done adding");
                    blogArticlesBriefSignalData.value = null;
                  }
                }
              }}>
              Dodaj Artykuł
            </Button>
          </div>
          <section className={`${styles.section}`}>
            {chapters.map((chapterData, chapterIndex) => {
              const { title, paragraphs, order } = chapterData;

              if (chapterIndex === 0) {
                return (
                  <div key={order}>
                    <main>
                      <article id={`${order}`}>
                        <Editable
                          onSave={(event) => {
                            const currentElement = event.target as HTMLHeadElement;

                            setArticle((currentValue) => {
                              const copiedCurrentValue = structuredClone(currentValue)!;

                              copiedCurrentValue.chapters[chapterIndex].title = currentElement.innerText;

                              return copiedCurrentValue;
                            });
                          }}>
                          <h1>{title}</h1>
                        </Editable>

                        <p className={`${styles.date}`}>
                          {new Date().toLocaleDateString("pl-PL", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        {paragraphs.map((paragraphData, paragraphIndex) => {
                          const { content, order } = paragraphData;

                          return (
                            <Editable
                              key={order}
                              onRemove={() => {
                                setArticle((currentValue) => {
                                  const copiedCurrentValue = structuredClone(currentValue)!;

                                  copiedCurrentValue.chapters[chapterIndex].paragraphs.splice(paragraphIndex, 1);

                                  return copiedCurrentValue;
                                });
                              }}
                              onSave={(event) => {
                                const currentElement = event.target as HTMLParagraphElement;

                                setArticle((currentValue) => {
                                  const copiedCurrentValue = structuredClone(currentValue)!;

                                  copiedCurrentValue.chapters[chapterIndex].paragraphs[paragraphIndex].content = currentElement.innerText;

                                  return copiedCurrentValue;
                                });
                              }}>
                              <p>{content}</p>
                            </Editable>
                          );
                        })}
                        <Button
                          style={{ padding: "10px 15px 10px 15px", fontSize: "14px" }}
                          onClick={() => {
                            setArticle((currentValue) => {
                              const copiedCurrentValue = structuredClone(currentValue)!;

                              const lastChapterParagraph = copiedCurrentValue.chapters[chapterIndex].paragraphs.at(-1);

                              copiedCurrentValue.chapters[chapterIndex].paragraphs.push({
                                order: lastChapterParagraph ? lastChapterParagraph.order + 1 : 1,
                                content: "Edytuj akapit",
                              });

                              return copiedCurrentValue;
                            });
                          }}>
                          Dodaj akapit
                        </Button>
                      </article>
                      <div className={`${styles.banner} ${mainImage === null ? styles.empty : ""}`}>
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          hidden
                          onChange={(event) => {
                            setArticle((currentValue) => {
                              const copiedCurrentValue = structuredClone(currentValue)!;
                              const file = event.target.files && event.target.files[0];

                              if (file) {
                                copiedCurrentValue.mainImage = file;
                              }

                              return copiedCurrentValue;
                            });
                          }}></input>
                        {mainImage && (
                          <Image
                            src={(() => {
                              if (typeof mainImage !== "string") {
                                return URL.createObjectURL(mainImage);
                              } else {
                                return mainImage;
                              }
                            })()}
                            width={1180}
                            height={1180}
                            alt="Zdjęcia artykułu bloga"></Image>
                        )}
                        <Button
                          style={{ padding: "10px 15px 10px 15px", fontSize: "14px", zIndex: "123", position: "absolute" }}
                          onClick={(event) => {
                            const inputElement = event.currentTarget.parentElement!.querySelector("input") as HTMLInputElement;
                            inputElement.click();
                          }}>
                          {article.mainImage ? "Zmień zdjęcie główne" : "Dodaj zdjęcie główne"}
                        </Button>
                      </div>
                      <ol>
                        <p>Spis Treści:</p>
                        {chapters.map((chapterData) => {
                          if (chapterData.order !== 1) {
                            return (
                              <li key={chapterData.order}>
                                <a href={`/#${chapterData.order}`}>{chapterData.title}</a>
                              </li>
                            );
                          }
                        })}
                      </ol>
                    </main>
                  </div>
                );
              } else {
                return (
                  <div key={order}>
                    <article id={`${order}`}>
                      <Editable
                        key={order}
                        onRemove={() => {
                          setArticle((currentValue) => {
                            const copiedCurrentValue = structuredClone(currentValue)!;

                            copiedCurrentValue.chapters.splice(chapterIndex, 1);

                            return copiedCurrentValue;
                          });
                        }}
                        onSave={(event) => {
                          const currentElement = event.target as HTMLHeadElement;

                          setArticle((currentValue) => {
                            const copiedCurrentValue = structuredClone(currentValue)!;

                            copiedCurrentValue.chapters[chapterIndex].title = currentElement.innerText;

                            return copiedCurrentValue;
                          });
                        }}>
                        <h2>{title}</h2>
                      </Editable>
                      {paragraphs.map((paragraphData, paragraphIndex) => {
                        const { content, order } = paragraphData;

                        return (
                          <Editable
                            key={order}
                            onRemove={() => {
                              setArticle((currentValue) => {
                                const copiedCurrentValue = structuredClone(currentValue)!;

                                copiedCurrentValue.chapters[chapterIndex].paragraphs.splice(paragraphIndex, 1);

                                return copiedCurrentValue;
                              });
                            }}
                            onSave={(event) => {
                              const currentElement = event.target as HTMLParagraphElement;

                              setArticle((currentValue) => {
                                const copiedCurrentValue = structuredClone(currentValue)!;

                                copiedCurrentValue.chapters[chapterIndex].paragraphs[paragraphIndex].content = currentElement.innerText;

                                return copiedCurrentValue;
                              });
                            }}>
                            <p>{content}</p>
                          </Editable>
                        );
                      })}
                      <Button
                        style={{ padding: "10px 15px 10px 15px", fontSize: "14px" }}
                        onClick={() => {
                          setArticle((currentValue) => {
                            const copiedCurrentValue = structuredClone(currentValue)!;

                            const lastChapterParagraph = copiedCurrentValue.chapters[chapterIndex].paragraphs.at(-1);

                            copiedCurrentValue.chapters[chapterIndex].paragraphs.push({
                              order: lastChapterParagraph ? lastChapterParagraph.order + 1 : 1,
                              content: "Edytuj akapit",
                            });

                            return copiedCurrentValue;
                          });
                        }}>
                        Dodaj akapit
                      </Button>
                    </article>
                  </div>
                );
              }
            })}
            <Button
              style={{ padding: "10px 15px 10px 15px", fontSize: "14px", alignSelf: "start" }}
              onClick={() => {
                setArticle((currentValue) => {
                  const copiedCurrentValue = structuredClone(currentValue)!;

                  copiedCurrentValue.chapters.push({
                    order: copiedCurrentValue.chapters.at(-1)!.order + 1,
                    title: "Edytuj tytuł",
                    paragraphs: [
                      {
                        order: 1,
                        content: "Edytuj akapit",
                      },
                    ],
                  });

                  return copiedCurrentValue;
                });
              }}>
              Dodaj rozdział
            </Button>
          </section>
        </div>
      </>
    );
  }
};

export default ArticleEditor;
