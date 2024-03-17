"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import arrowRightGrayIcon from "../../../public/arrow_right_grey.svg";
import Editable from "./Editable/Editable";
import Button from "@/components/UI/Button/Button";
import { blogCreateOrUpdate } from "@/app/api/blog/createOrUpdate/route";
import AvatarEditor from "react-avatar-editor";
import Image from "next/image";
import Section13 from "@/components/sections/Section13/Section13";
import { Mulish } from "next/font/google";
import { categories as blogCategories } from "@/data/blog/categories";
import { useRouter } from "next/navigation";
import { activeBlogArticle } from "../BlogEditor/BlogEditor";

const mulishFont = Mulish({ subsets: ["latin"] });

function isValidUrl(pathname: string) {
  try {
    const url = new URL(`https://www.atelier-redakcji.eu/${pathname}`);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

const saveBlog = async (articleData: {
  id: string | null;
  title: string | null;
  category: string | null;
  pathname: string | null;
  entry: {
    order: number;
    content: string | null;
  }[];
  image: {
    file: File | null;
    string: string | null;
  };
  content: {
    order: number;
    title: string | null;
    content: {
      order: number;
      content: string | null;
    }[];
  }[];
}) => {
  const { category, pathname, entry, image, content, title } = articleData;
  let foundEmptyValue: null | string = null;

  if (title === null) {
    foundEmptyValue = "title";
  } else if (category === null) {
    foundEmptyValue = "category";
  } else if (pathname === null) {
    foundEmptyValue = "pathname";
  } else if (image.file === null && image.string === null) {
    foundEmptyValue = "image";
  }

  if (entry.length === 0) {
    foundEmptyValue = "entry";
  } else if (entry.length !== 0) {
    const isAnyContentEmpty = entry.find((data) => data.content === null);

    if (isAnyContentEmpty) {
      foundEmptyValue = "any entry empty";
    }
  }

  if (content.length === 0) {
    foundEmptyValue = "content";
  } else if (content.length !== 0) {
    const isAnyContentEmpty = content.find((data) => data.title === null || data.content.find((data) => data.content === null));

    if (isAnyContentEmpty) {
      foundEmptyValue = "any content empty";
    }
  }

  if (foundEmptyValue === null) {
    const createdBlogResponse = await blogCreateOrUpdate(pathname!, category!, title!, content, entry, image.file);

    console.log(createdBlogResponse);
  } else {
    console.log(foundEmptyValue);
  }
};

interface componentProps {
  currentActiveArticle: activeBlogArticle;
}

const ArticleEditor = ({ currentActiveArticle }: componentProps) => {
  const [articleData, setArticleData] = useState<activeBlogArticle>(currentActiveArticle);

  const [isMovingInAvatarEditor, setIsMovingInAvatarEditor] = useState(false);
  const [isHoveringOnAvatarEditor, setIsHoveringOnAvatarEditor] = useState(false);
  const [isPressingControlKey, setIsPressingControlKey] = useState(false);
  const [avatarEditorScale, setAvatarEditorScale] = useState(1);

  const avatarEditorRef = useRef<null | AvatarEditor>(null);
  const avatarEditorBounceTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const router = useRouter();

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsPressingControlKey(true);
      } else {
        setIsPressingControlKey(false);
      }
    };

    const keyUp = (event: KeyboardEvent) => {
      setIsPressingControlKey(false);
    };

    const wheel = (event: WheelEvent) => {
      if (isPressingControlKey && isHoveringOnAvatarEditor && event.ctrlKey) {
        event.preventDefault();
        const addValue = event.deltaY * -0.001;

        setAvatarEditorScale((currentValue) => currentValue + addValue);
      }
    };

    document.addEventListener("wheel", wheel, { passive: false });
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

    return () => {
      document.removeEventListener("wheel", wheel);
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
    };
  }, [isPressingControlKey, isHoveringOnAvatarEditor]);

  return (
    <div className={`${styles.articleEditor}`}>
      <div className={`${styles.headerWrapper}`}>
        <div className={`${styles.header}`}>
          <button
            onClick={() => {
              router.push("/blogEditor");
            }}>
            <i className={`fa-solid fa-right-to-bracket ${styles.faRightToBracket}`} aria-hidden></i>
          </button>
          <button
            onClick={() => {
              saveBlog(articleData);
            }}>
            <i className="fa-regular fa-floppy-disk" aria-hidden></i>
          </button>
          <button style={{ marginLeft: "auto" }}>
            <i className={`fa-solid fa-trash-can ${styles.faTrashCan}`} aria-hidden></i>
          </button>
        </div>
      </div>
      <div className={`${styles.blogArticle}`}>
        <div className={`${styles.blogArticleWrapper}`}>
          <p className={`${styles.url}`}>
            <span>https://www.atelier-redakcji.eu/</span>
            <Editable
              onSave={(value) => {
                setArticleData((currentValue) => {
                  const copiedCurrentValue = structuredClone(currentValue);

                  copiedCurrentValue.pathname = value;

                  return copiedCurrentValue;
                });
              }}
              defaultValue="URL">
              {articleData.pathname}
            </Editable>
          </p>
          <div className={`${styles.linksPath}`}>
            <p>Blog</p>
            <Image src={arrowRightGrayIcon} alt="Ikonka strzałki"></Image>
            <p>Artykuły</p>
            <Image src={arrowRightGrayIcon} alt="Ikonka strzałki"></Image>
            <p className={`${styles.current}`}>{articleData.category}</p>
          </div>
          <h1>
            <Editable
              onSave={(value) => {
                setArticleData((currentValue) => {
                  const copiedCurrentValue = structuredClone(currentValue);

                  copiedCurrentValue.title = value;

                  return copiedCurrentValue;
                });
              }}>
              {articleData.title}
            </Editable>
          </h1>
          <div className={`${styles.articleMetaDataWrapper}`}>
            <select
              className={`${styles.category} ${mulishFont.className}`}
              defaultValue={articleData.category ? articleData.category : "Wybierz kategorię"}
              onChange={(event) => {
                const thisElement = event.currentTarget as HTMLSelectElement;

                setArticleData((currentValue) => {
                  const copiedCurrentValue = structuredClone(currentValue);

                  copiedCurrentValue.category = thisElement.value;

                  return copiedCurrentValue;
                });
              }}>
              <option disabled>Wybierz kategorię</option>
              {blogCategories.map((data) => {
                const { name } = data;

                return (
                  <option key={name} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
            <p className={`${styles.date}`}>
              {new Date().toLocaleTimeString("pl-PL", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
          <div className={`${styles.entry}`}>
            {articleData.entry.map((entryData) => {
              const { order, content } = entryData;
              return (
                <p key={order}>
                  <Editable
                    onSave={(value) => {
                      setArticleData((currentValue) => {
                        const copiedCurrentValue = structuredClone(currentValue);

                        const foundContent = copiedCurrentValue.entry.find((data) => data.order === order)!;

                        foundContent.content = value;

                        return copiedCurrentValue;
                      });
                    }}
                    onRemove={() => {
                      setArticleData((currentValue) => {
                        const copiedCurrentValue = structuredClone(currentValue);

                        const foundElementIndex = copiedCurrentValue.entry.findIndex((data) => data.order === order);

                        copiedCurrentValue.entry.splice(foundElementIndex, 1);

                        return copiedCurrentValue;
                      });
                    }}>
                    {content}
                  </Editable>
                </p>
              );
            })}
            <Button
              style={{ padding: "12px 24px 12px 24px", alignSelf: "flex-start" }}
              onClick={() => {
                setArticleData((currentValue) => {
                  const copiedCurrentValue = structuredClone(currentValue);

                  copiedCurrentValue.entry.push({
                    content: null,
                    order: copiedCurrentValue.entry.at(-1) ? copiedCurrentValue.entry.at(-1)!.order + 1 : 0,
                  });

                  return copiedCurrentValue;
                });
              }}>
              Dodaj akapit
            </Button>
          </div>
          <div
            className={`${styles.imageWrapper} ${
              (isMovingInAvatarEditor && articleData.image.string !== null) ||
              (isPressingControlKey && isHoveringOnAvatarEditor && articleData.image.string !== null)
                ? styles.movingInAvatarEditor
                : ""
            }`}
            onMouseEnter={() => {
              setIsHoveringOnAvatarEditor(true);
            }}
            onMouseLeave={() => {
              setIsHoveringOnAvatarEditor(false);
            }}
            onMouseDown={() => {
              setIsMovingInAvatarEditor(true);
            }}
            onMouseUp={() => {
              setIsMovingInAvatarEditor(false);
            }}
            onClick={(event) => {
              const inputElement = event.currentTarget.querySelector("input") as HTMLInputElement;

              if (articleData.image.string === null) {
                inputElement.click();
              }
            }}
            onDoubleClick={() => {
              setArticleData((currentValue) => {
                const copiedCurrentValue = structuredClone(currentValue);

                copiedCurrentValue.image = {
                  file: null,
                  string: null,
                };

                return copiedCurrentValue;
              });
            }}>
            {articleData.image.string && (
              <AvatarEditor
                crossOrigin="anonymous"
                ref={avatarEditorRef}
                onImageChange={() => {
                  if (avatarEditorBounceTimeoutRef.current) {
                    clearTimeout(avatarEditorBounceTimeoutRef.current);
                  }

                  avatarEditorBounceTimeoutRef.current = setTimeout(() => {
                    avatarEditorRef.current!.getImageScaledToCanvas().toBlob(
                      (blob) => {
                        const file = blob as File;

                        setArticleData((currentValue) => {
                          const copiedCurrentValue = structuredClone(currentValue);

                          copiedCurrentValue.image.file = file;

                          return copiedCurrentValue;
                        });
                      },
                      "image/webp",
                      75
                    );
                  }, 100);
                }}
                image={articleData.image.string}
                width={1180}
                height={500}
                scale={avatarEditorScale}
              />
            )}
            <input
              type="file"
              hidden
              style={{ display: "none" }}
              onChange={(event) => {
                const file = event.currentTarget.files![0];

                const src = URL.createObjectURL(file);

                setArticleData((currentValue) => {
                  const copiedCurrentValue = structuredClone(currentValue);

                  copiedCurrentValue.image = {
                    file: file,
                    string: src,
                  };

                  return copiedCurrentValue;
                });
              }}></input>
            <p>
              {articleData.image.string === null
                ? "Dodaj zdjęcie"
                : "Kliknij dwukrotnie aby usunąć lub przytrzymaj lewy control i użyj scrolla aby przybliżyć lub oddalić"}
            </p>
          </div>
          <div className={`${styles.tableOfContents}`}>
            <p>Spis treści</p>
            <ol>
              {articleData.content.map((contentData) => {
                const { order, title } = contentData;

                return (
                  <li key={order}>
                    <a href={`/blogEditor/${articleData.pathname}/#${order}`}>{title}</a>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className={`${styles.articleContentDataWrapper}`}>
            {articleData.content.map((contentData, index, array) => {
              const { order, title, content } = contentData;

              return (
                <div key={order}>
                  <div className={`${styles.singleData}`} id={`${order}`}>
                    <h2>
                      {index + 1}.
                      <Editable
                        onSave={(value) => {
                          setArticleData((currentValue) => {
                            const copiedCurrentValue = structuredClone(currentValue);

                            const foundContent = copiedCurrentValue.content.find((data) => data.order === order)!;

                            foundContent.title = value;

                            return copiedCurrentValue;
                          });
                        }}
                        onRemove={() => {
                          setArticleData((currentValue) => {
                            const copiedCurrentValue = structuredClone(currentValue);

                            const foundElementIndex = copiedCurrentValue.content.findIndex((data) => data.order === order);

                            copiedCurrentValue.content.splice(foundElementIndex, 1);

                            return copiedCurrentValue;
                          });
                        }}>
                        {title}
                      </Editable>
                    </h2>
                    <div className={`${styles.content}`}>
                      {content.map((contentData) => {
                        const { order: orderLocal, content } = contentData;

                        return (
                          <p key={orderLocal}>
                            <Editable
                              onSave={(value) => {
                                setArticleData((currentValue) => {
                                  const copiedCurrentValue = structuredClone(currentValue);

                                  const foundContent = copiedCurrentValue.content
                                    .find((data) => data.order === order)!
                                    .content.find((data) => data.order === orderLocal)!;

                                  foundContent.content = value;

                                  return copiedCurrentValue;
                                });
                              }}
                              onRemove={() => {
                                setArticleData((currentValue) => {
                                  const copiedCurrentValue = structuredClone(currentValue);

                                  const foundContent = copiedCurrentValue.content.find((data) => data.order === order)!;

                                  const foundElementIndex = foundContent.content.findIndex((data) => data.order === orderLocal);

                                  foundContent.content.splice(foundElementIndex, 1);

                                  return copiedCurrentValue;
                                });
                              }}>
                              {content}
                            </Editable>
                          </p>
                        );
                      })}
                      <Button
                        style={{ padding: "10px 20px 10px 20px", alignSelf: "flex-start", fontSize: "14px" }}
                        onClick={() => {
                          setArticleData((currentValue) => {
                            const copiedCurrentValue = structuredClone(currentValue);

                            const foundContent = copiedCurrentValue.content.find((data) => data.order === order)!;

                            foundContent.content.push({
                              order: foundContent.content.at(-1) ? foundContent.content.at(-1)!.order + 1 : 0,
                              content: null,
                            });

                            return copiedCurrentValue;
                          });
                        }}>
                        Dodaj Akapit
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            <Button
              style={{ padding: "12px 24px 12px 24px", alignSelf: "flex-start", marginTop: "50px" }}
              onClick={() => {
                setArticleData((currentValue) => {
                  const copiedCurrentValue = structuredClone(currentValue);

                  copiedCurrentValue.content.push({
                    order: copiedCurrentValue.content.at(-1) ? copiedCurrentValue.content.at(-1)!.order + 1 : 0,
                    title: null,
                    content: [
                      {
                        order: 0,
                        content: null,
                      },
                    ],
                  });

                  return copiedCurrentValue;
                });
              }}>
              Dodaj Akapit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
