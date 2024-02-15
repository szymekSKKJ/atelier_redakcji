"use client";

import styles from "./styles.module.scss";
import { Children, cloneElement, useEffect, useRef, useState } from "react";

const DeleteIcon = ({ width = 24, height = 24, color = "white" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill={color}>
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </svg>
  );
};

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
  };
}) => {
  return (
    <div className={`${styles.context_menu}`} style={{ top: `${contextMenuOptions.position.y}px`, left: `${contextMenuOptions.position.x}px` }}>
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
    </div>
  );
};

interface componentProps {
  children: JSX.Element;
  onSave: (event: any, value: string) => any;
  onRemove?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
  defaultValue?: string;
}

const Editable = ({ children, onSave, onRemove, defaultValue = "Edytuj" }: componentProps) => {
  const currentChild = Children.only(children);

  const thisElementRef = useRef<null | HTMLElement>(null);

  const [uniqueKey] = useState(crypto.randomUUID());
  const [contextMenuOptions, setContextMenuOptions] = useState<{
    isOpen: boolean;
    editableChild: HTMLElement | null;
    position: {
      x: number;
      y: number;
    };
  }>({
    editableChild: thisElementRef.current,
    isOpen: false,
    position: {
      x: 0,
      y: 0,
    },
  });

  const copiedChild = cloneElement(currentChild, {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: thisElementRef,
    key: uniqueKey,
    placeholder: defaultValue,
    onContextMenu: (event: MouseEvent) => {
      event.preventDefault();
      setContextMenuOptions((currentValue) => {
        const copiedCurrentValue = Object.assign({}, currentValue);

        copiedCurrentValue.isOpen = true;
        copiedCurrentValue.editableChild = thisElementRef.current;
        copiedCurrentValue.position = {
          x: event.clientX,
          y: event.clientY,
        };

        return copiedCurrentValue;
      });
    },
    onClick: (event: MouseEvent) => {
      const currentSelection = window.getSelection()!;

      // if (event.target !== event.currentTarget && currentSelection.isCollapsed) {
      //   const anyChildElement = event.target as HTMLElement;
      //   const anyChildElementContent = anyChildElement.innerHTML;

      //   anyChildElement.outerHTML = anyChildElementContent;
      // }
    },

    onPaste: (event: ClipboardEvent) => {
      event.preventDefault();
      if (event.clipboardData && event.currentTarget) {
        const clipboardData = event.clipboardData.getData("text/plain");

        document.execCommand("insertText", false, clipboardData);
      }
    },

    onBlur: (event: FocusEvent) => {
      setTimeout(() => {
        onSave(event, thisElementRef.current!.innerHTML);
      }, 100);
    },
  });

  useEffect(() => {
    const closeContextMenu = () => {
      setContextMenuOptions((currentValue) => {
        const copiedCurrentValue = Object.assign({}, currentValue);

        copiedCurrentValue.isOpen = false;

        return copiedCurrentValue;
      });
    };

    document.addEventListener("click", closeContextMenu);

    return () => {
      document.removeEventListener("click", closeContextMenu);
    };
  }, []);

  return (
    <div className={`${styles.editable}`}>
      <div
        className={`${styles.editable_child}`}
        onMouseDown={(event) => {
          // For 100% sure
          const copiedChildElement = event.currentTarget.firstChild as HTMLElement;
          copiedChildElement.focus();
        }}>
        {copiedChild}
        {onRemove && (
          <div className={`${styles.delete}`} onClick={(event) => onRemove(event)}>
            <DeleteIcon width={24} height={24}></DeleteIcon>
          </div>
        )}
      </div>

      {contextMenuOptions.isOpen && <ContextMenu contextMenuOptions={contextMenuOptions}></ContextMenu>}
    </div>
  );
};

export default Editable;
