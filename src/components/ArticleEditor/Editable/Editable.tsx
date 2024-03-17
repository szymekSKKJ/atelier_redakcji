"use client";

import styles from "./styles.module.scss";
import { Children, cloneElement, useEffect, useLayoutEffect, useRef, useState } from "react";

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
  document.execCommand(type);
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
    editableChild: HTMLElement | null;
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
          addTextFormatting("bold", contextMenuOptions.editableChild!);
        }}>
        <i className="fa-solid fa-bold"></i>
      </button>
      <button
        className={`${styles.option}`}
        onClick={() => {
          addTextFormatting("italic", contextMenuOptions.editableChild!);
        }}>
        <i className="fa-solid fa-italic"></i>
      </button>
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
  children?: string | null;
  defaultValue?: string;
  onRemove?: () => void;
  onSave: (value: string | null) => void;
}

const Editable = ({ children, defaultValue = "Edytuj", onRemove, onSave }: componentProps) => {
  const [savedChildren] = useState(children);
  const [isContentEmpty, setIsContentEmpty] = useState(savedChildren === null || savedChildren === undefined ? true : isEmpty(savedChildren) ? true : false);
  const [runOnSave, setRunOnSave] = useState(false);

  const componentElementRef = useRef<null | HTMLDivElement>(null);

  const [contextMenuOptions, setContextMenuOptions] = useState<{
    isOpen: boolean;
    editableChild: HTMLElement | null;
    position: {
      x: number;
      y: number;
    };
    onRemove: () => void;
  }>({
    editableChild: componentElementRef.current,
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
    componentElementRef.current!.innerHTML = savedChildren ? savedChildren : "";
  }, []);

  useEffect(() => {
    if (runOnSave === true) {
      if (isContentEmpty) {
        onSave(null);
      } else {
        onSave(componentElementRef.current!.innerHTML);
      }

      setRunOnSave(false);
    }
  }, [runOnSave, isContentEmpty, onSave]);

  return (
    <>
      <span
        className={`${styles.editable} ${isContentEmpty ? styles.childrenEmpty : ""}`}
        data-placeholder={defaultValue}
        ref={componentElementRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onContextMenu={(event) => {
          event.preventDefault();

          setContextMenuOptions((currentValue) => {
            const target = {};
            const copiedCurrentValue = Object.assign(target, currentValue);

            copiedCurrentValue.isOpen = true;
            copiedCurrentValue.position = {
              x: event.clientX,
              y: event.clientY,
            };

            return copiedCurrentValue;
          });
        }}
        onInput={(event) => {
          const thisElement = event.currentTarget as HTMLDivElement;
          if (isEmpty(thisElement.innerText)) {
            thisElement.innerText = "";
            setIsContentEmpty(true);
          } else {
            setIsContentEmpty(false);
          }
        }}
        onBlur={() => {
          // Lepiej jest wykonywać tę funkcję w momencie kiedy faktycznie wiemy, że dana akcja jest wykonywana, niż zawsze kiedy jest "blur" (np. wykonać "onSave" dopiero po wykonanej akcji z contextmenu)
          setRunOnSave(true);
        }}></span>
      {contextMenuOptions.isOpen && <ContextMenu contextMenuOptions={contextMenuOptions}></ContextMenu>}
    </>
  );
};

export default Editable;
