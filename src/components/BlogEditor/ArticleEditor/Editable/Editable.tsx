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

const textFormattingTypesData: {
  elementTag: string;
  type: string;
  styles: object;
}[] = [
  {
    elementTag: "b",
    type: "bold",
    styles: {
      fontWeight: "700",
    },
  },
  {
    elementTag: "i",
    type: "italic",
    styles: {
      fontStyle: "italic",
    },
  },
];

type textFormattingTypes = "italic" | "bold";

const addTextFormatting = (type: textFormattingTypes) => {
  const foundTypeData = textFormattingTypesData.find((typeData) => typeData.type === type);

  if (foundTypeData) {
    const selection = window.getSelection()!;

    const doesAlreadyExistThisTextFormat = selection.anchorNode?.parentElement?.closest(foundTypeData.elementTag);

    if (!selection.isCollapsed) {
      const { elementTag, styles: stylesData } = foundTypeData;

      const range = selection.getRangeAt(0);

      const createdElement = document.createElement(elementTag) as HTMLElement;

      createdElement.classList.add(styles.createdElement);

      Object.keys(stylesData).forEach((key) => {
        //@ts-ignore
        createdElement.style[key] = stylesData[key];
      });

      createdElement.innerHTML = range.toString();

      range.deleteContents();
      range.insertNode(createdElement);
    }
  }
};

const ContextMenu = ({
  contextMenuOptions,
}: {
  contextMenuOptions: {
    isOpen: boolean;
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
          addTextFormatting("bold");
        }}>
        Pogrub
      </button>
      <button
        className={`${styles.option}`}
        onClick={() => {
          addTextFormatting("italic");
        }}>
        Pochyl
      </button>
    </div>
  );
};

interface componentProps {
  children: JSX.Element;
  onSave: (event: any) => any;
  onRemove?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
  defaultValue?: string;
}

const Editable = ({ children, onSave, onRemove, defaultValue = "Edytuj" }: componentProps) => {
  const currentChild = Children.only(children);

  const [uniqueKey] = useState(crypto.randomUUID());
  const [contextMenuOptions, setContextMenuOptions] = useState<{
    isOpen: boolean;
    position: {
      x: number;
      y: number;
    };
  }>({
    isOpen: false,
    position: {
      x: 0,
      y: 0,
    },
  });
  const [hasFocus, setHasFocus] = useState(false);

  const thisElementRef = useRef<null | HTMLElement>(null);

  const copiedChild = cloneElement(currentChild, {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: thisElementRef,
    key: uniqueKey,
    placeholder: defaultValue,
    onContextMenu: (event: MouseEvent) => {
      event.preventDefault();
      setContextMenuOptions((currentValue) => {
        const copiedCurrentValue = structuredClone(currentValue);

        copiedCurrentValue.isOpen = true;
        copiedCurrentValue.position = {
          x: event.clientX,
          y: event.clientY,
        };

        return copiedCurrentValue;
      });
    },
    onClick: (event: MouseEvent) => {
      const currentSelection = window.getSelection()!;
      setHasFocus(true);

      if (hasFocus && event.target !== event.currentTarget && currentSelection.isCollapsed) {
        const anyChildElement = event.target as HTMLElement;
        const anyChildElementContent = anyChildElement.innerHTML;

        anyChildElement.outerHTML = anyChildElementContent;
      }
    },
    onFocus: (event: FocusEvent) => {
      // const range = document.createRange();
      // const selection = window.getSelection();
      // range.selectNode(event.currentTarget as HTMLElement);
      // selection.removeAllRanges();
      // selection.addRange(range);
    },
    onPaste: (event: ClipboardEvent) => {
      event.preventDefault();
      if (event.clipboardData && event.currentTarget) {
        const clipboardData = event.clipboardData.getData("text/plain");

        document.execCommand("insertText", false, clipboardData);
      }
    },

    onBlur: (event: FocusEvent) => {
      setHasFocus(false);
      setTimeout(() => {
        onSave(event);
      }, 100);
    },
    onKeyDown: (event: KeyboardEvent) => {
      // Dodaj historię
    },
  });

  useEffect(() => {
    const closeContextMenu = () => {
      setContextMenuOptions((currentValue) => {
        const copiedCurrentValue = structuredClone(currentValue);

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
      <div className={`${styles.editable_child}`}>{copiedChild}</div>
      {onRemove && (
        <div className={`${styles.delete}`} onClick={(event) => onRemove(event)}>
          <DeleteIcon width={24} height={24}></DeleteIcon>
        </div>
      )}
      {contextMenuOptions.isOpen && <ContextMenu contextMenuOptions={contextMenuOptions}></ContextMenu>}
    </div>
  );
};

export default Editable;
