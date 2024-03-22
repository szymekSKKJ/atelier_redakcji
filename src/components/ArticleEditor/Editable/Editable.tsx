"use client";

import styles from "./styles.module.scss";
import { Children, cloneElement, createElement, useEffect, useLayoutEffect, useRef, useState } from "react";

const isEmpty = (string: string) => string.trim().length === 0;

type textFormattingTypes = "italic" | "bold";

const createElementBaesOnType = (type: textFormattingTypes) => {
  if (type === "bold") {
    const element = document.createElement("b");
    return element;
  } else if (type === "italic") {
    const element = document.createElement("i");
    return element;
  }
};

const getTagNameBasedOnType = (type: textFormattingTypes) => {
  if (type === "bold") {
    return "B";
  } else if (type === "italic") {
    return "I";
  }
};

const removeAllEmptyChildren = (element: ChildNode) => {
  element.childNodes.forEach((child) => {
    if (child.textContent === "") {
      child.remove();
    } else if (child.childNodes.length > 0) {
      removeAllEmptyChildren(child);
    }
  });
};

const addTextFormatting = (type: textFormattingTypes, editableChild: HTMLElement) => {
  // const selection = window.getSelection()!;
  // const range = selection.getRangeAt(0);
  // const commonAncestorContainer = range.commonAncestorContainer;
  // const stringValue = range.toString().trim();
  // const createdElement = createElementBaesOnType(type)!;
  // createdElement.innerHTML = stringValue;
  // selection.deleteFromDocument();
  // range.deleteContents();
  // const tagName = getTagNameBasedOnType(type);
  // if (commonAncestorContainer.parentElement!.tagName === tagName) {
  //   const elementForFirstPart = document.createElement(tagName);
  //   const elementForSecondPart = document.createElement(tagName);
  //   range.insertNode(createdElement);
  //   const firstPart = commonAncestorContainer.parentElement!.childNodes[0];
  //   const secondPart = commonAncestorContainer.parentElement!.childNodes[2];
  //   const middlePart = document.createElement("span");
  //   middlePart.innerHTML = stringValue;
  //   elementForFirstPart.innerHTML = firstPart.textContent!;
  //   elementForSecondPart.innerHTML = secondPart.textContent!;
  //   editableChild.insertBefore(elementForFirstPart, commonAncestorContainer.parentElement!);
  //   editableChild.insertBefore(elementForSecondPart, commonAncestorContainer.parentElement!.nextSibling);
  //   editableChild.insertBefore(middlePart.firstChild!, elementForSecondPart);
  //   commonAncestorContainer.parentElement!.remove();
  // } else {
  //   range.insertNode(createdElement);
  // }
  // removeAllEmptyChildren(editableChild);
  // editableChild.childNodes.forEach((child) => {
  //   if (child.nodeName === child.nextSibling?.nodeName) {
  //     const mergedParent = document.createElement(child.nodeName);
  //     mergedParent.innerHTML = `${child.textContent}${child.nextSibling.textContent}`;
  //     editableChild.insertBefore(mergedParent, child);
  //     child.nextSibling.remove();
  //     child.remove();
  //   }
  // });
  // editableChild.childNodes.forEach((child) => {
  //   if (child.nodeName === child.previousSibling?.nodeName) {
  //     const mergedParent = document.createElement(child.nodeName);
  //     mergedParent.innerHTML = `${child.textContent}${child.previousSibling.textContent}`;
  //     editableChild.insertBefore(mergedParent, child.previousSibling);
  //     child.previousSibling.remove();
  //     child.remove();
  //   }
  // });
};

const ContextMenu = ({
  contextMenuOptions,
}: {
  contextMenuOptions: {
    isOpen: boolean;
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | null;
    editableChildTagName: string;
    position: {
      x: number;
      y: number;
    };
    onRemove: () => void;
  };
}) => {
  return (
    <span
      onMouseDown={(event) => {
        event.stopPropagation();
      }}
      className={`${styles.context_menu}`}
      style={{ top: `${contextMenuOptions.position.y}px`, left: `${contextMenuOptions.position.x}px` }}>
      <button
        className={`${styles.option}`}
        onClick={() => {
          document.execCommand("bold");
        }}>
        <i className="fa-solid fa-bold"></i>
      </button>
      <button
        className={`${styles.option}`}
        onClick={() => {
          document.execCommand("italic");
        }}>
        <i className="fa-solid fa-italic"></i>
      </button>
      {contextMenuOptions.editableChildTagName === "table" && (
        <button
          className={`${styles.option}`}
          onClick={() => {
            const rowDataElement = contextMenuOptions.event?.target as HTMLElement;
            const rowElement = rowDataElement.parentElement as HTMLElement;

            rowElement.remove();
          }}>
          Usuń ten wiersz
        </button>
      )}
      {contextMenuOptions.editableChildTagName === "table" && (
        <button
          className={`${styles.option}`}
          onClick={() => {
            const rowDataElement = contextMenuOptions.event?.target as HTMLElement;
            const rowElement = rowDataElement.parentElement as HTMLElement;
            const tableElement = rowElement.parentElement as HTMLElement;

            const indexOfColumn = [...rowElement.children].findIndex((rowDataElementLocal) => rowDataElementLocal.isSameNode(rowDataElement));

            [...tableElement.children].forEach((rowElement) => {
              [...rowElement.children].forEach((rowDataElement, index) => {
                if (indexOfColumn === index) {
                  rowDataElement.remove();
                }
              });
            });
          }}>
          Usuń tę kolumnę
        </button>
      )}
      {contextMenuOptions.editableChildTagName === "table" && (
        <button
          className={`${styles.option}`}
          onClick={() => {
            const rowDataElement = contextMenuOptions.event?.target as HTMLElement;
            const rowElement = rowDataElement.parentElement as HTMLElement;
            const tableElement = rowElement.parentElement as HTMLElement;

            const countOfColumns = rowElement.children.length;

            [...tableElement.children].forEach((rowElement, index) => {
              const createdRowDataElement = document.createElement(index === 0 ? "th" : "td");
              createdRowDataElement.innerText = index === 0 ? `Nagłówek ${countOfColumns + 1}` : "Dane";

              rowElement.appendChild(createdRowDataElement);
            });
          }}>
          Dodaj kolumnę
        </button>
      )}
      {contextMenuOptions.editableChildTagName === "table" && (
        <button
          className={`${styles.option}`}
          onClick={() => {
            const rowDataElement = contextMenuOptions.event?.target as HTMLElement;
            const rowElement = rowDataElement.parentElement as HTMLElement;
            const tableElement = rowElement.parentElement as HTMLElement;

            const createdRowElement = document.createElement("tr");

            const countOfColumns = rowElement.children.length;

            for (let i = 0; i < countOfColumns; i++) {
              const createdRowDataElement = document.createElement("td");

              createdRowDataElement.innerText = "Dane";

              createdRowElement.appendChild(createdRowDataElement);
            }

            tableElement.appendChild(createdRowElement);
          }}>
          Dodaj wiersz
        </button>
      )}
      <button
        className={`${styles.option}`}
        onClick={() => {
          contextMenuOptions.onRemove();
        }}>
        <i className={`fa-regular fa-trash-can ${styles.faTrashCan}`}></i>
      </button>
    </span>
  );
};

interface componentProps {
  children: string;
  placeholder?: string;
  onRemove?: () => void;
  onSave: (value: string) => void;
}

const Editable = ({ children, placeholder = "Edytuj", onRemove, onSave }: componentProps) => {
  const childElement = new DOMParser().parseFromString(children, "text/html").body.firstChild as HTMLElement;

  const [isContentEmpty, setIsContentEmpty] = useState(isEmpty(childElement.innerText));

  const componentElementRef = useRef<null | HTMLDivElement>(null);

  const [contextMenuOptions, setContextMenuOptions] = useState<{
    isOpen: boolean;
    editableChildTagName: string;
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | null;
    position: {
      x: number;
      y: number;
    };
    onRemove: () => void;
  }>({
    editableChildTagName: childElement.tagName.toLowerCase(),
    event: null,
    isOpen: false,
    position: {
      x: 0,
      y: 0,
    },
    onRemove: () => {
      onRemove && onRemove();
    },
  });

  useEffect(() => {
    const closeContextMenu = (event: MouseEvent) => {
      setContextMenuOptions((currentValue) => {
        const target = {};
        const copiedCurrentValue = Object.assign(target, currentValue);

        copiedCurrentValue.isOpen = false;

        return copiedCurrentValue;
      });
    };

    document.addEventListener("click", closeContextMenu);

    return () => {
      document.removeEventListener("click", closeContextMenu);
    };
  }, []);

  useLayoutEffect(() => {
    componentElementRef.current!.innerHTML = childElement.innerHTML;
  }, []);

  const createdElement = createElement(childElement.tagName.toLowerCase(), {
    className: `${styles.editable} ${isContentEmpty ? styles.childrenEmpty : ""}  `,
    ref: componentElementRef,
    contentEditable: true,
    "data-placeholder": placeholder,
    suppressContentEditableWarning: true,
    onPaste: (event) => {
      event.preventDefault();

      const text = event.clipboardData.getData("text/plain");

      document.execCommand("insertHTML", false, text);
    },
    onContextMenu: (event) => {
      event.preventDefault();

      setContextMenuOptions((currentValue) => {
        const target = {};
        const copiedCurrentValue = Object.assign(target, currentValue);

        copiedCurrentValue.isOpen = true;
        copiedCurrentValue.position = {
          x: event.clientX,
          y: event.clientY,
        };

        copiedCurrentValue.event = event;

        return copiedCurrentValue;
      });
    },
    onInput: (event) => {
      const thisElement = event.currentTarget as HTMLDivElement;
      if (isEmpty(thisElement.innerText)) {
        if (childElement.tagName !== "UL" && childElement.tagName !== "TABLE") {
          thisElement.innerHTML = "";
        } else if (childElement.tagName === "UL") {
          thisElement.innerHTML = "<li></li>";
        }

        setIsContentEmpty(true);
      } else {
        setIsContentEmpty(false);
      }
    },
    onBlur: (event) => {
      const clonedThisElement = event.currentTarget.cloneNode(true) as HTMLElement;

      while (clonedThisElement.attributes.length > 0) clonedThisElement.removeAttribute(clonedThisElement.attributes[0].name);

      onSave(clonedThisElement.outerHTML);
    },
  });

  if (childElement.tagName === "TABLE") {
    return (
      <div className={`${styles.tableWrapper}`}>
        {createdElement}
        {contextMenuOptions.isOpen && <ContextMenu contextMenuOptions={contextMenuOptions}></ContextMenu>}
      </div>
    );
  } else {
    return (
      <>
        {createdElement}
        {contextMenuOptions.isOpen && <ContextMenu contextMenuOptions={contextMenuOptions}></ContextMenu>}
      </>
    );
  }
};

export default Editable;
