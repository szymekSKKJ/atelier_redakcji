"use client";

import { Mulish } from "next/font/google";
import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import document from "../../../../public/document.svg";
import { useRef, useState } from "react";
import Loader from "@/design/Loader/Loader";
import sendCustomOfferForm from "@/api/nodemailer/sendCustomOfferForm";

const mulishFont = Mulish({ subsets: ["latin"] });

type themeType = "dark" | "light";

const stylesModules = [
  { id: 1, key: "dark", style: styles.dark },
  { id: 2, key: "light", style: styles.light },
];

interface props {
  theme?: themeType;
}

const CustomOfferForm = ({ theme = "dark" }: props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [attachedFile, setAttachedFile] = useState<null | File>(null);
  const [formStatus, setFormStatus] = useState<"error" | "ok" | "sending" | null>(null);

  const formElementRef = useRef<null | HTMLFormElement>(null);

  const foundStyle = stylesModules.find((styleData) => styleData.key === theme);

  return (
    <>
      {formStatus === null || formStatus === "sending" ? (
        <form
          className={`${styles.form} ${foundStyle?.style} ${formStatus === "sending" ? styles.sending : ""}`}
          ref={formElementRef}
          onSubmit={(event) => event.preventDefault()}>
          {formStatus === "sending" && (
            <Loader style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "100" }}></Loader>
          )}
          <div className={`${styles.input_wrapper}`}>
            <label>
              Imię<br></br>
              <em>(pole obowiązkowe)</em>
            </label>
            <input pattern="[A-Za-z0-9]{1,20}" required placeholder="Imię" name="name"></input>
          </div>
          <div className={`${styles.input_wrapper}`}>
            <label>
              Adres e-mail<br></br>
              <em>(pole obowiązkowe)</em>
            </label>
            <input name="email" required pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" placeholder="Adres e-mail"></input>
          </div>
          <div className={`${styles.input_wrapper} ${styles.textarea}`}>
            <label>
              Treść wiadomości<br></br>
              <em>(pole obowiązkowe)</em>
            </label>
            <textarea placeholder="Treść wiadomości" className={`${mulishFont.className}`} required name="additionalInformation"></textarea>
          </div>
          <div className={`${styles.input_wrapper} ${styles.drop_down_section_wrapper}`} role="group">
            <div className={`${styles.drop_down_section}`}>
              <input
                name="file"
                type="file"
                id="fileInput"
                required={attachedFile === null ? true : false}
                onChange={(event) => {
                  const inputFileElement = event.currentTarget as HTMLInputElement;
                  setAttachedFile(inputFileElement.files ? inputFileElement.files[0] : null);
                }}></input>
              <label
                className={`${isDragging ? styles.dragging : ""}`}
                htmlFor="fileInput"
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                  setAttachedFile(event.dataTransfer.files[0]);
                }}>
                <Image src={document} alt="Ikonka dokumentu"></Image>
                <p>
                  Przeciągnij plik tutaj lub <mark>wybierz z komputera</mark>
                </p>
                {attachedFile && <p className={`${styles.attatched_file}`}>{attachedFile.name}</p>}
              </label>
            </div>
          </div>
          <div className={`${styles.input_wrapper} ${styles.agree}`}>
            <input id="checkbox1" type="checkbox" required></input>
            <label htmlFor="checkbox1">
              Wysyłając zgłoszenie wyrażasz zgodę na przetwarzanie Twoich danych osobowych w celu odpowiedzi na wiadomość. Więcej informacji w Polityce
              prywatności
            </label>
          </div>
          <Button
            style={{ padding: "20px 30px 20px 30px" }}
            className={`${formStatus === "sending" ? styles.sending : ""}`}
            onClick={async () => {
              if (formElementRef.current && attachedFile) {
                const formData = new FormData(formElementRef.current!);
                formData.append("file", attachedFile);

                const areAllInputsCorrect = [...formElementRef.current.elements].every((element) => {
                  const inputElement = element as HTMLInputElement;

                  return inputElement.checkValidity() === true;
                });

                if (areAllInputsCorrect) {
                  setFormStatus("sending");
                  try {
                    const response = await sendCustomOfferForm(formData);

                    if (response.includes("250")) {
                      setFormStatus("ok");
                    } else {
                      setFormStatus("error");
                    }
                  } catch (error) {
                    setFormStatus("error");
                  }
                }
              }
            }}>
            Wyślij wiadomość
          </Button>
        </form>
      ) : (
        <div className={`${styles.sent}`}>
          {formStatus === "ok" ? (
            <div className={`${styles.ok} ${foundStyle?.style}`}>
              <p>Świetnie!</p>
              <svg xmlns="http://www.w3.org/2000/svg" height="128" viewBox="0 -960 960 960" width="128">
                <path fill="#18A77C" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
              <p>
                Już nie długo <mark>skontakujemy się z Tobą!</mark>
              </p>
            </div>
          ) : (
            <div className={`${styles.error} ${foundStyle?.style}`}>
              <p>Upsss...</p>
              <svg xmlns="http://www.w3.org/2000/svg" height="128" viewBox="0 -960 960 960" width="128">
                <path fill="#ff6666" d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
              <p>Coś poszło nie tak...</p>
              <Button
                style={{ padding: "20px 30px 20px 30px", alignSelf: "center" }}
                onClick={() => {
                  setFormStatus(null);
                  setAttachedFile(null);
                }}>
                Spróbuj ponownie
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CustomOfferForm;
