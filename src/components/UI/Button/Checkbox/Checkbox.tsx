"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface componentsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: string;
  color?: string;
}

const Checkbox = ({ children, color, onInput, ...rest }: componentsProps) => {
  const [isCheck, setIsChecked] = useState(false);

  const id = useId();

  const checkboxElementRef = useRef<null | HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (checkboxElementRef.current) {
    }
  }, []);

  return (
    <>
      <div className={`${styles.checkbox}`} data-color={color} ref={checkboxElementRef}>
        <input
          id={id}
          type="checkbox"
          onInput={(event) => {
            if (onInput) {
              onInput(event);
            }
            setIsChecked(event.currentTarget.checked);
          }}
          {...rest}></input>
        <label htmlFor={id} className={`${styles.checkbox}`}></label>
      </div>
      <label className={`${styles.checkbox_label}`} style={isCheck && color ? { color: color } : {}} htmlFor={id}>
        {children}
      </label>
    </>
  );
};

export default Checkbox;
