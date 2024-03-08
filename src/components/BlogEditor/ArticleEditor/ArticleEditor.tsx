"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import NextImage from "next/image";
import arrowRightGrayIcon from "../../../../public/arrow_right_grey.svg";
import Editable from "./Editable/Editable";
import Button from "@/components/UI/Button/Button";
import { blogCreate } from "@/app/api/blog/create/route";
import AvatarEditor from "react-avatar-editor";
import { blogGetSome } from "@/app/api/blog/get/some/route";
import { blogArticle, blogGetByUrl } from "@/app/api/blog/get/[url]/route";
import { createNotification } from "../BlogEditor";
import { blogUpdate } from "@/app/api/blog/update/[id]/route";

const isEmpty = (str: string) => !str.trim().length;

function isValidPathname(pathname: string) {
  try {
    const url = new URL("http://dummy/" + pathname);

    return url.pathname.substring(1);
  } catch (error) {
    return false;
  }
}

interface componentProps {
  setCurrentActiveArticle: Dispatch<SetStateAction<null | blogArticle>>;
  currentActiveArticle: blogArticle | null;
}

const ArticleEditor = ({ setCurrentActiveArticle, currentActiveArticle }: componentProps) => {
  const [articleData, setArticleData] = useState<{
    id: string | null;
    title: string | null;
    category: string | null;
    url: string | null;
    createdAt: Date;
    entry: {
      id: string;
      content: string;
    }[];
    image: File | null | string;
    content: {
      id: string;
      title: string;
      content: {
        id: string;
        content: string;
      }[];
    }[];
  }>(
    currentActiveArticle
      ? currentActiveArticle
      : {
          id: null,
          title: null,
          category: null,
          url: null,
          createdAt: new Date(),
          entry: [
            {
              id: crypto.randomUUID(),
              content: ``,
            },
            {
              id: crypto.randomUUID(),
              content: ``,
            },
          ],
          image: null,
          content: [
            {
              id: crypto.randomUUID(),
              title: "",
              content: [
                {
                  id: crypto.randomUUID(),
                  content: ``,
                },
              ],
            },
          ],
        }
  );
  const [appendChanges, setAppendCahnges] = useState(false);

  const avatarEditorRef = useRef<null | AvatarEditor>(null);

  useEffect(() => {
    if (appendChanges) {
      setAppendCahnges(false);
      (async () => {
        // @ts-ignore
        const isAnyValueNull = Object.keys(articleData).find((key) => key !== "id" && articleData[key] === null);

        const isAnyEntryEmpty = articleData.entry.find((data) => isEmpty(data.content));

        const isAnyContentEmpty = articleData.content.find((data) => isEmpty(data.title) || data.content.some((data) => isEmpty(data.content)));

        console.log(isAnyValueNull, isAnyEntryEmpty, isAnyContentEmpty);

        if (isAnyValueNull === undefined && isAnyEntryEmpty === undefined && isAnyContentEmpty === undefined) {
          if (articleData.id && typeof articleData.image === "string") {
            const response = await blogUpdate(
              articleData.id,
              articleData.url!,
              articleData.category!,
              articleData.title!,
              JSON.stringify(articleData.content),
              JSON.stringify(articleData.entry)
            );

            if (response.status === 200) {
              createNotification("Artykuł został zaaktualizowany");
            } else {
              createNotification(response.error!, "error");
            }
          } else {
            avatarEditorRef.current!.getImageScaledToCanvas().toBlob(async (imageBlob) => {
              const imageFile = new File([imageBlob!], "backgroundImage.webp", { type: imageBlob!.type });

              if (articleData.id) {
                const response = await blogUpdate(
                  articleData.id,
                  articleData.url!,
                  articleData.category!,
                  articleData.title!,
                  JSON.stringify(articleData.content),
                  JSON.stringify(articleData.entry)
                );

                if (response.status === 200) {
                  createNotification("Artykuł został zaaktualizowany");
                } else {
                  createNotification(response.error!, "error");
                }
              } else {
                const response = await blogCreate(
                  articleData.url!,
                  articleData.category!,
                  articleData.title!,
                  JSON.stringify(articleData.content),
                  JSON.stringify(articleData.entry),
                  imageFile
                );

                if (response.status === 200) {
                  createNotification("Artykuł został dodany");
                } else {
                  createNotification(response.error!, "error");
                }
              }
            }, "image/webp");
          }
        }
      })();
    }
  }, [articleData, appendChanges]);

  return (
    <div className={`${styles.articleEditor}`}>
      <div className={`${styles.header}`}>
        <Button
          style={{ padding: "10px 15px 10px 15px" }}
          onClick={() => {
            setCurrentActiveArticle(null);
          }}>
          Powrót
        </Button>
        <Button
          style={{ padding: "10px 15px 10px 15px", marginLeft: "auto" }}
          onClick={async (event) => {
            setAppendCahnges(true);
          }}>
          Zapisz
        </Button>
      </div>
      <div className={`${styles.linksPath}`}>
        <p>Blog</p>
        <NextImage src={arrowRightGrayIcon} alt="Ikonka strzałki"></NextImage>
        <p>Artykuły</p>
        <NextImage src={arrowRightGrayIcon} alt="Ikonka strzałki"></NextImage>
        <p className={`${styles.current}`}>{articleData.category}</p>
      </div>
      <Editable
        defaultValue="Edytuj Tytuł artykułu"
        onSave={(event, value) => {
          setArticleData((currentValue) => {
            const copiedCurrentValue = structuredClone(currentValue);

            if (isEmpty(value)) {
              copiedCurrentValue.title = "";
            } else {
              copiedCurrentValue.title = value;
            }

            return copiedCurrentValue;
          });
        }}>
        <h1 dangerouslySetInnerHTML={{ __html: articleData.title === null ? "" : articleData.title }}></h1>
      </Editable>
      <Editable
        defaultValue="Edytuj URL"
        onSave={(event, value) => {
          setArticleData((currentValue) => {
            const copiedCurrentValue = structuredClone(currentValue);

            if (isEmpty(value)) {
              copiedCurrentValue.url = "";
            } else {
              const isValid = isValidPathname(value.replace(/&nbsp;/g, ""));

              if (isValid) {
                copiedCurrentValue.url = isValid;
              }
            }

            return copiedCurrentValue;
          });
        }}>
        <p className={`${styles.url}`} dangerouslySetInnerHTML={{ __html: articleData.url === null ? "" : articleData.url }}></p>
      </Editable>
      <div className={`${styles.articleMetaDataWrapper}`}>
        <div className={`${styles.selectWrapper}`}>
          <p>{articleData.category === null ? "Wybierz kategorię" : articleData.category}</p>
          <select
            name="category"
            defaultValue="default"
            onChange={(event) => {
              const thisElement = event.currentTarget as HTMLSelectElement;

              setArticleData((currentValue) => {
                const copiedCurrentValue = structuredClone(currentValue);

                copiedCurrentValue.category = thisElement.value;

                return copiedCurrentValue;
              });
            }}>
            <option value="default" disabled>
              Wybierz kategorię
            </option>
            <option value="prace licencjackie">Prace licencjackie</option>
            <option value="prace inżynierskie">Prace inżynierskie</option>
            <option value="prace magisterskie">Prace magisterskie</option>
            <option value="prace inżynierskie">Prace inżynierskie</option>
            <option value="prace doktorskie i habilitacyjne">Prace doktorskie i habilitacyjne</option>
            <option value="prace zaliczeniowe">Prace zaliczeniowe</option>
            <option value="prace dyplomowe">Prace dyplomowe</option>
            <option value="prace naukowe">Prace naukowe</option>
            <option value="prace specjalistyczne">Prace specjalistyczne</option>
            <option value="inne teksty">Inne teksty</option>
          </select>
        </div>
        <p className={`${styles.date}`}>
          {new Date(articleData.createdAt).toLocaleDateString("pl-PL", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className={`${styles.entry}`}>
        {articleData.entry.map((entryData, index) => {
          if (index > 0) {
            return (
              <Editable
                defaultValue="Edytuj treść wstępną"
                key={entryData.id}
                onRemove={() => {
                  setArticleData((currentValue) => {
                    const copiedCurrentValue = structuredClone(currentValue);

                    const foundEntryIndex = copiedCurrentValue.entry.findIndex((data) => data.id === entryData.id)!;

                    copiedCurrentValue.entry.splice(foundEntryIndex, 1);

                    return copiedCurrentValue;
                  });
                }}
                onSave={(event, value) => {
                  setArticleData((currentValue) => {
                    const copiedCurrentValue = structuredClone(currentValue);

                    const foundEntryElement = copiedCurrentValue.entry.find((data) => data.id === entryData.id)!;

                    if (isEmpty(value)) {
                      foundEntryElement.content = "";
                    } else {
                      foundEntryElement.content = value;
                    }

                    return copiedCurrentValue;
                  });
                }}>
                <p className={`${index === 0 ? styles.first : ""}`} dangerouslySetInnerHTML={{ __html: entryData.content }}></p>
              </Editable>
            );
          } else {
            return (
              <Editable
                defaultValue="Edytuj treść wstępną"
                key={entryData.id}
                onSave={(event, value) => {
                  setArticleData((currentValue) => {
                    const copiedCurrentValue = structuredClone(currentValue);

                    const foundEntryElement = copiedCurrentValue.entry.find((data) => data.id === entryData.id)!;

                    if (isEmpty(value)) {
                      foundEntryElement.content = "";
                    } else {
                      foundEntryElement.content = value;
                    }

                    return copiedCurrentValue;
                  });
                }}>
                <p className={`${index === 0 ? styles.first : ""}`} dangerouslySetInnerHTML={{ __html: entryData.content }}></p>
              </Editable>
            );
          }
        })}
        <Button
          style={{ padding: "20px 30px 20px 30px" }}
          onClick={(event) => {
            setArticleData((currentValue) => {
              const copiedCurrentValue = structuredClone(currentValue);

              copiedCurrentValue.entry.push({
                id: crypto.randomUUID(),
                content: "",
              });

              return copiedCurrentValue;
            });
          }}>
          Dodaj treść
        </Button>
      </div>
      <div className={`${styles.imageWrapper}`}>
        <input
          type="file"
          hidden
          onChange={(event) => {
            const thisInputElement = event.currentTarget as HTMLInputElement;

            const files = thisInputElement.files;

            if (files && files[0]) {
              const file = files[0];

              setArticleData((currentValue) => {
                const copiedCurrentValue = structuredClone(currentValue);

                copiedCurrentValue.image = file;

                return copiedCurrentValue;
              });
            } else {
              setArticleData((currentValue) => {
                const copiedCurrentValue = structuredClone(currentValue);

                copiedCurrentValue.image = null;

                return copiedCurrentValue;
              });
            }
          }}></input>
        <div className={`${styles.imageWrapper}`}>
          {articleData.image && (
            <AvatarEditor
              ref={avatarEditorRef}
              image={articleData.image instanceof File ? URL.createObjectURL(articleData.image) : articleData.image}
              width={1180}
              height={500}
              rotate={0}
            />
          )}
        </div>
        <Button
          style={{ padding: "20px 30px 20px 30px" }}
          onClick={(event) => {
            const parentElement = event.currentTarget.parentElement as HTMLDivElement;
            const inputElement = parentElement.querySelector("input");

            inputElement?.click();
          }}>
          Dodaj zdjęcie
        </Button>
      </div>
      <div className={`${styles.TableOfContents}`}>
        <p>Spis treści</p>
        <ol>
          {articleData.content.map((contentData) => {
            return <li key={contentData.id}>{contentData.title}</li>;
          })}
        </ol>
      </div>
      <div className={`${styles.articleContentDataWrapper}`}>
        {articleData.content.map((contentData, index) => {
          const { id, title, content } = contentData;

          return (
            <div className={`${styles.singleData}`} key={id}>
              {index !== 0 ? (
                <Editable
                  defaultValue="Edytuj nagłówek"
                  onRemove={() => {
                    setArticleData((currentValue) => {
                      const copiedCurrentValue = structuredClone(currentValue);

                      const foundEntryElementIndex = copiedCurrentValue.content.findIndex((data) => data.id === id)!;

                      copiedCurrentValue.content.splice(foundEntryElementIndex, 1);

                      return copiedCurrentValue;
                    });
                  }}
                  onSave={(event, value) => {
                    setArticleData((currentValue) => {
                      const copiedCurrentValue = structuredClone(currentValue);

                      const foundEntryElement = copiedCurrentValue.content.find((data) => data.id === id)!;

                      if (isEmpty(value)) {
                        foundEntryElement.title = "";
                      } else {
                        foundEntryElement.title = value;
                      }

                      return copiedCurrentValue;
                    });
                  }}>
                  <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
                </Editable>
              ) : (
                <Editable
                  defaultValue="Edytuj nagłówek"
                  onSave={(event, value) => {
                    setArticleData((currentValue) => {
                      const copiedCurrentValue = structuredClone(currentValue);

                      const foundEntryElement = copiedCurrentValue.content.find((data) => data.id === id)!;

                      if (isEmpty(value)) {
                        foundEntryElement.title = "";
                      } else {
                        foundEntryElement.title = value;
                      }

                      return copiedCurrentValue;
                    });
                  }}>
                  <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
                </Editable>
              )}
              <div className={`${styles.content}`}>
                {content.map((contentData, index) => {
                  if (index !== 0) {
                    return (
                      <Editable
                        defaultValue="Edytuj treść nagłówka"
                        key={contentData.id}
                        onRemove={() => {
                          setArticleData((currentValue) => {
                            const copiedCurrentValue = structuredClone(currentValue);

                            const foundEntryElementIndex = copiedCurrentValue.content
                              .find((data) => data.id === id)!
                              .content.findIndex((data) => data.id === contentData.id)!;

                            copiedCurrentValue.content.find((data) => data.id === id)!.content.splice(foundEntryElementIndex, 1);

                            return copiedCurrentValue;
                          });
                        }}
                        onSave={(event, value) => {
                          setArticleData((currentValue) => {
                            const copiedCurrentValue = structuredClone(currentValue);

                            const foundEntryElement = copiedCurrentValue.content
                              .find((data) => data.id === id)!
                              .content.find((data) => data.id === contentData.id)!;

                            if (isEmpty(value)) {
                              foundEntryElement.content = "";
                            } else {
                              foundEntryElement.content = value;
                            }

                            return copiedCurrentValue;
                          });
                        }}>
                        <p dangerouslySetInnerHTML={{ __html: contentData.content }}></p>
                      </Editable>
                    );
                  } else {
                    return (
                      <Editable
                        defaultValue="Edytuj treść nagłówka"
                        key={contentData.id}
                        onSave={(event, value) => {
                          setArticleData((currentValue) => {
                            const copiedCurrentValue = structuredClone(currentValue);

                            const foundEntryElement = copiedCurrentValue.content
                              .find((data) => data.id === id)!
                              .content.find((data) => data.id === contentData.id)!;

                            if (isEmpty(value)) {
                              foundEntryElement.content = "";
                            } else {
                              foundEntryElement.content = value;
                            }

                            return copiedCurrentValue;
                          });
                        }}>
                        <p dangerouslySetInnerHTML={{ __html: contentData.content }}></p>
                      </Editable>
                    );
                  }
                })}
                <Button
                  style={{ padding: "20px 30px 20px 30px" }}
                  onClick={() => {
                    setArticleData((currentValue) => {
                      const copiedCurrentValue = structuredClone(currentValue);

                      const fountContent = copiedCurrentValue.content.find((data) => data.id === id)!;

                      fountContent.content.push({
                        id: crypto.randomUUID(),
                        content: "",
                      });

                      return copiedCurrentValue;
                    });
                  }}>
                  Dodaj treść
                </Button>
              </div>
            </div>
          );
        })}
        <Button
          style={{ padding: "20px 30px 20px 30px" }}
          onClick={() => {
            setArticleData((currentValue) => {
              const copiedCurrentValue = structuredClone(currentValue);

              copiedCurrentValue.content.push({
                id: crypto.randomUUID(),
                title: "",
                content: [
                  {
                    id: crypto.randomUUID(),
                    content: ``,
                  },
                ],
              });

              return copiedCurrentValue;
            });
          }}>
          Dodaj nagłówek
        </Button>
      </div>
    </div>
  );
};

export default ArticleEditor;
