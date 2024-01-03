"use client";

import { randomUUID } from "crypto";
import styles from "./styles.module.scss";
import { Children, cloneElement, useEffect, useLayoutEffect, useRef, useState } from "react";

const DeleteIcon = ({ width = 24, height = 24, color = "white" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill={color}>
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </svg>
  );
};

interface componentProps {
  children: JSX.Element;
  onSave: (event: FocusEvent) => any;
  onRemove?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
  defaultValue?: string;
}

const Editable = ({ children, onSave, onRemove, defaultValue = "Edytuj" }: componentProps) => {
  const currentChild = Children.only(children);

  const [uniqueKey] = useState(crypto.randomUUID());

  const thisElementRef = useRef<null | HTMLElement>(null);

  const copiedChild = cloneElement(currentChild, {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: thisElementRef,
    key: uniqueKey,
    onFocus: (event: FocusEvent) => {
      const range = document.createRange();
      range.selectNodeContents(event.currentTarget as HTMLElement);
      const sel = window.getSelection()!;
      sel.removeAllRanges();
      sel.addRange(range);
    },
    onPaste: (event: ClipboardEvent) => {
      event.preventDefault();
      if (event.clipboardData && event.currentTarget) {
        const clipboardData = event.clipboardData.getData("text/plain");
        const currentElement = event.currentTarget as HTMLElement;

        currentElement.innerText = clipboardData;
      }
    },

    onBlur: (event: FocusEvent) => {
      onSave(event);
    },
    onKeyDown: (event: KeyboardEvent) => {
      // Dodaj historię
    },
  });

  useEffect(() => {
    thisElementRef.current?.focus();
  }, []);

  return (
    <div className={`${styles.editable}`}>
      {copiedChild}
      {onRemove && (
        <div className={`${styles.delete}`} onClick={(event) => onRemove(event)}>
          <DeleteIcon width={24} height={24}></DeleteIcon>
        </div>
      )}
    </div>
  );
};

export default Editable;
