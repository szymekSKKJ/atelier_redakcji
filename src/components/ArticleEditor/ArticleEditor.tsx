"use client";

import { blogCreateOrUpdate } from "@/app/api/blog/createOrUpdate/route";
import { userCreateOrLogin } from "@/app/api/user/createOrLogin/route";
import Button from "@/components/UI/Button/Button";
import { categories as blogCategories } from "@/data/blog/categories";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { Mulish } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import arrowRightGrayIcon from "../../../public/arrow_right_grey.svg";
import { activeBlogArticle } from "../BlogEditor/BlogEditor";
import Editable from "./Editable/Editable";
import styles from "./styles.module.scss";

const notifications = signal<
  {
    id: string;
    content: string;
    type: "error" | "success";
  }[]
>([]);

export const createNotification = (content: string, type: "error" | "success" = "success") => {
  const copiedValue = [...notifications.value];
  const generatedId = crypto.randomUUID();

  copiedValue.push({
    id: generatedId,
    content: content,
    type: type,
  });

  setTimeout(() => {
    const copiedValue = [...notifications.value];

    copiedValue.splice(
      copiedValue.findIndex((data) => data.id === generatedId),
      1
    );

    notifications.value = copiedValue;
  }, 3500); // Animation time

  notifications.value = copiedValue;
};

const mulishFont = Mulish({ subsets: ["latin"] });

const isEmpty = (string: string) => string.trim().length === 0;

function isValidUrl(pathname: string) {
  try {
    const url = new URL(`https://www.atelier-redakcji.eu/${pathname}`);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

const saveBlog = async (articleData: activeBlogArticle, setArticleData: Dispatch<SetStateAction<activeBlogArticle>>) => {
  const { category, pathname, entry, image, sections, title, id } = articleData;
  let foundEmptyValue = false;

  if (title === null) {
    foundEmptyValue = true;
    createNotification("Uzupełnij tytuł", "error");
  } else if (category === null) {
    foundEmptyValue = true;
    createNotification("Wybierz kategorię", "error");
  } else if (pathname === null) {
    foundEmptyValue = true;
    createNotification("Uzupełnij url", "error");
  } else if (entry.length === 0) {
    foundEmptyValue = true;
    createNotification("Jedno z pól pierwszego akapitu jest puste", "error");
  } else {
    const isAnyContentEmpty = entry.find((data) => data.content === null);

    if (isAnyContentEmpty) {
      foundEmptyValue = true;
      createNotification("Jedno z pól pierwszego akapitu jest puste", "error");
    } else if (sections.length === 0) {
      foundEmptyValue = true;
      createNotification("Jedna z sekcji jest nieuzupełnionia", "error");
    } else {
      const DomParser = new DOMParser();

      const isAnySectionEmpty = sections.find((data) => {
        if (data.title === null) {
          foundEmptyValue = true;
          createNotification("Jedna z sekcji jest nieuzupełnionia", "error");
          return true;
        } else {
          const isAnyParagraphEmpty = data.paragraphs.find((data) => {
            const wrapperElement = DomParser.parseFromString(data.content, "text/html").body.firstChild as HTMLElement;

            if (isEmpty(wrapperElement.innerHTML)) {
              return true;
            }
          });

          if (isAnyParagraphEmpty) {
            foundEmptyValue = true;
            createNotification("Jedna z sekcji jest nieuzupełnionia", "error");

            return true;
          }
        }
      });

      if (isAnySectionEmpty) {
        foundEmptyValue = true;
        createNotification("Jedna z sekcji jest nieuzupełnionia", "error");
      }
    }
  }

  if (foundEmptyValue === false) {
    const createdBlogResponse = await blogCreateOrUpdate(
      id,
      pathname!,
      category!,
      title!,
      entry as {
        order: number;
        content: string;
      }[],
      image as {
        file: File | null;
        url: string | null;
      },
      sections as {
        order: number;
        title: string;
        paragraphs: {
          order: number;
          content: string;
        }[];
      }[]
    );

    if (createdBlogResponse.error === null) {
      setArticleData((currentValue) => {
        const copiedCurrentValue = structuredClone(currentValue);

        copiedCurrentValue.id = createdBlogResponse.data!.id;

        return copiedCurrentValue;
      });

      createNotification(id === null ? `Artykuł został utworzony` : `Artykuł został zaaktualizowany`);
    } else {
      createNotification(createdBlogResponse.error, "error");
    }
  }
};

interface componentProps {
  currentActiveArticle: activeBlogArticle;
}

const ArticleEditor = ({ currentActiveArticle }: componentProps) => {
  useSignals();

  const [articleData, setArticleData] = useState<activeBlogArticle>(currentActiveArticle);
  const [isMovingInAvatarEditor, setIsMovingInAvatarEditor] = useState(false);
  const [isHoveringOnAvatarEditor, setIsHoveringOnAvatarEditor] = useState(false);
  const [isPressingControlKey, setIsPressingControlKey] = useState(false);
  const [avatarEditorScale, setAvatarEditorScale] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const avatarEditorRef = useRef<null | AvatarEditor>(null);
  const avatarEditorBounceTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const router = useRouter();
  const DomParser = new DOMParser();

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

  useEffect(() => {
    (async () => {
      const response = await userCreateOrLogin();

      if (response.data && response.data.user && response.data.user.isActivated) {
        setIsLoggedIn(true);
      } else {
        router.push("/blogEditor");
      }
    })();
  }, []);

  return (
    <>
      {isLoggedIn && (
        <div className={`${styles.articleEditor}`}>
          <div className={`${styles.notifications}`}>
            {notifications.value.map((data) => {
              const { content, type, id } = data;

              return (
                <div className={`${styles.notifiaction} ${type === "error" ? styles.error : ""} `} key={id}>
                  <p>{content}</p>
                </div>
              );
            })}
          </div>
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
                  saveBlog(articleData, setArticleData);
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

                      const wrapperElementForPathname = DomParser.parseFromString(value, "text/html").body.firstChild as HTMLElement;

                      copiedCurrentValue.pathname = wrapperElementForPathname.innerText;

                      return copiedCurrentValue;
                    });
                  }}
                  placeholder="URL">
                  {`<span>${articleData.pathname === null ? "" : articleData.pathname}</span>`}
                </Editable>
              </p>
              <div className={`${styles.linksPath}`}>
                <p>Blog</p>
                <Image src={arrowRightGrayIcon} alt="Ikonka strzałki"></Image>
                <p>Artykuły</p>
                <Image src={arrowRightGrayIcon} alt="Ikonka strzałki"></Image>
                <p className={`${styles.current}`}>{articleData.category}</p>
              </div>
              <Editable
                onSave={(value) => {
                  setArticleData((currentValue) => {
                    const copiedCurrentValue = structuredClone(currentValue);

                    const wrappedElement = DomParser.parseFromString(value, "text/html").body.firstChild as HTMLElement;

                    copiedCurrentValue.title = wrappedElement.innerText;

                    return copiedCurrentValue;
                  });
                }}>
                {`<h1>${articleData.title === null ? "" : articleData.title}</h1>`}
              </Editable>
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
                  {new Date(articleData.createdAt ? articleData.createdAt : new Date()).toLocaleTimeString("pl-PL", {
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
                    <Editable
                      key={order}
                      onSave={(value) => {
                        setArticleData((currentValue) => {
                          const copiedCurrentValue = structuredClone(currentValue);

                          const foundContent = copiedCurrentValue.entry.find((data) => data.order === order)!;

                          const wrapperElement = DomParser.parseFromString(value, "text/html").body.firstChild as HTMLElement;

                          foundContent.content = wrapperElement.innerText;

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
                      {`<p>${content === null ? "" : content}</p>`}
                    </Editable>
                  );
                })}
                <Button
                  style={{ padding: "12px 24px 12px 24px", alignSelf: "flex-start" }}
                  onClick={() => {
                    setArticleData((currentValue) => {
                      const copiedCurrentValue = structuredClone(currentValue);

                      copiedCurrentValue.entry.push({
                        content: `<p></p>`,
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
                  (isMovingInAvatarEditor && articleData.image.url !== null) ||
                  (isPressingControlKey && isHoveringOnAvatarEditor && articleData.image.url !== null)
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

                  if (articleData.image.url === null) {
                    inputElement.click();
                  }
                }}
                onDoubleClick={() => {
                  setArticleData((currentValue) => {
                    const copiedCurrentValue = structuredClone(currentValue);

                    copiedCurrentValue.image = {
                      file: null,
                      url: null,
                    };

                    return copiedCurrentValue;
                  });
                }}>
                {articleData.image.url && (
                  <AvatarEditor
                    crossOrigin="anonymous"
                    ref={avatarEditorRef}
                    onImageChange={() => {
                      if (avatarEditorBounceTimeoutRef.current) {
                        clearTimeout(avatarEditorBounceTimeoutRef.current);
                      }

                      avatarEditorBounceTimeoutRef.current = setTimeout(() => {
                        avatarEditorRef.current!.getImageScaledToCanvas().toBlob((blob) => {
                          const file = blob as File;

                          setArticleData((currentValue) => {
                            const copiedCurrentValue = structuredClone(currentValue);

                            copiedCurrentValue.image.file = file;

                            return copiedCurrentValue;
                          });
                        }, "image/webp");
                      }, 100);
                    }}
                    image={articleData.image.url}
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
                        url: src,
                      };

                      return copiedCurrentValue;
                    });
                  }}></input>
                <p>
                  {articleData.image.url === null
                    ? "Dodaj zdjęcie"
                    : "Kliknij dwukrotnie aby usunąć lub przytrzymaj lewy control i użyj scrolla aby przybliżyć lub oddalić"}
                </p>
              </div>
              <div className={`${styles.tableOfContents}`}>
                <p>Spis treści</p>
                <ol>
                  {articleData.sections.map((contentData) => {
                    const { order, title } = contentData;

                    const wrapperElementForTitle = title ? (DomParser.parseFromString(title, "text/html").body as HTMLElement) : null;

                    if (wrapperElementForTitle) {
                      return (
                        <li key={order}>
                          <a href={`/blogEditor/${articleData.pathname}#${order}`}>{wrapperElementForTitle.innerText}</a>
                        </li>
                      );
                    }
                  })}
                </ol>
              </div>
              <div className={`${styles.articleContentDataWrapper}`}>
                {articleData.sections
                  .sort((a, b) => a.order - b.order)
                  .map((contentData, index) => {
                    const { order, title, paragraphs } = contentData;

                    return (
                      <div key={order}>
                        <div className={`${styles.singleData}`} id={`${order}`}>
                          <div className={`${styles.h2Wrapper}`}>
                            {index + 1}.
                            <Editable
                              onSave={(value) => {
                                setArticleData((currentValue) => {
                                  const copiedCurrentValue = structuredClone(currentValue);

                                  const foundSection = copiedCurrentValue.sections.find((data) => data.order === order)!;

                                  const wrappedElement = DomParser.parseFromString(value, "text/html").body.firstChild as HTMLElement;

                                  foundSection.title = wrappedElement.innerText;

                                  return copiedCurrentValue;
                                });
                              }}
                              onRemove={() => {
                                setArticleData((currentValue) => {
                                  const copiedCurrentValue = structuredClone(currentValue);

                                  const foundElementIndex = copiedCurrentValue.sections.findIndex((data) => data.order === order);

                                  copiedCurrentValue.sections.splice(foundElementIndex, 1);

                                  return copiedCurrentValue;
                                });
                              }}>
                              {`<h2>${title === null ? "" : title}</h2>`}
                            </Editable>
                          </div>
                          <div className={`${styles.content}`}>
                            {paragraphs.map((data) => {
                              const { order: orderLocal, content } = data;

                              return (
                                <Editable
                                  key={orderLocal}
                                  onSave={(value) => {
                                    setArticleData((currentValue) => {
                                      const copiedCurrentValue = structuredClone(currentValue);

                                      console.log(value);

                                      const foundContent = copiedCurrentValue.sections
                                        .find((data) => data.order === order)!
                                        .paragraphs.find((data) => data.order === orderLocal)!;

                                      foundContent.content = value;

                                      return copiedCurrentValue;
                                    });
                                  }}
                                  onRemove={() => {
                                    setArticleData((currentValue) => {
                                      const copiedCurrentValue = structuredClone(currentValue);

                                      const foundSection = copiedCurrentValue.sections.find((data) => data.order === order)!;

                                      const foundElementIndex = foundSection.paragraphs.findIndex((data) => data.order === orderLocal);

                                      foundSection.paragraphs.splice(foundElementIndex, 1);

                                      return copiedCurrentValue;
                                    });
                                  }}>
                                  {content}
                                </Editable>
                              );
                            })}
                          </div>
                          <div className={`${styles.paragraphOptions}`}>
                            <Button
                              style={{ padding: "10px 20px 10px 20px", alignSelf: "flex-start", fontSize: "14px" }}
                              onClick={() => {
                                setArticleData((currentValue) => {
                                  const copiedCurrentValue = structuredClone(currentValue);

                                  const foundSection = copiedCurrentValue.sections.find((data) => data.order === order)!;

                                  foundSection.paragraphs.push({
                                    order: foundSection.paragraphs.at(-1) ? foundSection.paragraphs.at(-1)!.order + 1 : 0,
                                    content: `<p></p>`,
                                  });

                                  return copiedCurrentValue;
                                });
                              }}>
                              Dodaj Akapit
                            </Button>
                            <Button
                              style={{ padding: "10px 20px 10px 20px", alignSelf: "flex-start", fontSize: "14px" }}
                              onClick={() => {
                                setArticleData((currentValue) => {
                                  const copiedCurrentValue = structuredClone(currentValue);

                                  const foundSection = copiedCurrentValue.sections.find((data) => data.order === order)!;

                                  foundSection.paragraphs.push({
                                    order: foundSection.paragraphs.at(-1) ? foundSection.paragraphs.at(-1)!.order + 1 : 0,
                                    content: `<ul><li></li></ul>`,
                                  });

                                  return copiedCurrentValue;
                                });
                              }}>
                              Dodaj listę
                            </Button>
                            <Button
                              style={{ padding: "10px 20px 10px 20px", alignSelf: "flex-start", fontSize: "14px" }}
                              onClick={() => {
                                setArticleData((currentValue) => {
                                  const copiedCurrentValue = structuredClone(currentValue);

                                  const foundSection = copiedCurrentValue.sections.find((data) => data.order === order)!;

                                  foundSection.paragraphs.push({
                                    order: foundSection.paragraphs.at(-1) ? foundSection.paragraphs.at(-1)!.order + 1 : 0,
                                    content: `
                                <table>
                                  <tr>
                                    <th>Nagłówek 1</th>
                                    <th>Nagłówek 2</th>
                                    <th>Nagłówek 3</th>
                                    <th>Nagłówek 4</th>
                                  </tr>
                                  <tr>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                  </tr>
                                  <tr>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                  </tr>
                                  <tr>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                  </tr>
                                  <tr>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                  </tr>
                                  <tr>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                    <td>Dane</td>
                                  </tr>
                                </table>
                              `,
                                  });

                                  return copiedCurrentValue;
                                });
                              }}>
                              Dodaj tabelę
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

                      copiedCurrentValue.sections.push({
                        order: copiedCurrentValue.sections.at(-1) ? copiedCurrentValue.sections.at(-1)!.order + 1 : 0,
                        title: `<h2></h2>`,
                        paragraphs: [
                          {
                            order: 0,
                            content: `<p></p>`,
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
      )}
    </>
  );
};

export default ArticleEditor;
