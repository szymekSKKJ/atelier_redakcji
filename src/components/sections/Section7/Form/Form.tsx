"use client";

import { Mulish } from "next/font/google";
import styles from "./styles.module.scss";
import document from "../../../../../public/document.svg";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import { MouseEvent, useRef, useState } from "react";
import sendMainForm from "@/api/nodemailer/sendMainForm";
import Loader from "@/design/Loader/Loader";

const mulishFont = Mulish({ subsets: ["latin"] });

const toggleRequiredAttributeToCheckboxElements = (event: MouseEvent<HTMLInputElement>) => {
  const checboxWrapperElement = event.currentTarget.parentElement!.parentElement as HTMLDivElement;
  const checboxElements = [...checboxWrapperElement.querySelectorAll('input[type="checkbox"]')] as HTMLInputElement[];

  const isAnyInputChecked = checboxElements.some((inputElement) => inputElement.checked);

  if (isAnyInputChecked) {
    checboxElements.forEach((inputElement) => {
      inputElement.removeAttribute("required");
    });
  } else {
    checboxElements.forEach((inputElement) => {
      inputElement.setAttribute("required", "");
    });
  }
};

const Form = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [attachedFile, setAttachedFile] = useState<null | File>(null);
  const [formStatus, setFormStatus] = useState<"error" | "ok" | "sending" | null>(null);

  const formElementRef = useRef<null | HTMLFormElement>(null);

  return (
    <>
      {formStatus === null || formStatus === "sending" ? (
        <form
          className={`${styles.form} ${formStatus === "sending" ? styles.sending : ""}`}
          id="mainForm"
          ref={formElementRef}
          method="POST"
          onSubmit={(e) => e.preventDefault()}>
          {formStatus === "sending" && (
            <Loader style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "100" }}></Loader>
          )}
          <section>
            <p className={`${styles.title}`}>1. Dane kontaktowe:</p>
            <div className={`${styles.row}`}>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>
                  Imię <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
                </label>
                <input type="text" placeholder="Imię" name="name" required></input>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>
                  Adres e-mail <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
                </label>
                <input type="email" placeholder="Adres e-mail" name="email" required></input>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>Numer telefonu</label>
                <input
                  type="text"
                  placeholder="Numer telefonu"
                  name="phoneNumber"
                  onChange={(event) => {
                    const inputElement = event.currentTarget as HTMLInputElement;

                    if (inputElement.value.includes("+")) {
                      inputElement.value = inputElement.value
                        .replace(/[^\d+]+/g, "")
                        .replace(/\++/g, "+")
                        .slice(0, 12);
                    } else {
                      inputElement.value = inputElement.value.replace(/[^\d]+/g, "").slice(0, 9);
                    }
                  }}></input>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>Nazwa firmy</label>
                <input type="text" placeholder="Nazwa firmy" name="companyName"></input>
              </div>
            </div>
          </section>
          <section>
            <p className={`${styles.title}`}>2. Informacje dotyczące Twojej tekstu:</p>
            <div className={`${styles.row}`}>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>
                  Rodzaj tekstu <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
                </label>
                <input type="text" placeholder="Rodzaj tekstu" name="textType" required></input>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>
                  Termin realizacji <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
                </label>
                <input type="date" placeholder="Termin realizacji" required name="deadline"></input>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>
                  Ilość stron <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
                </label>
                <input
                  type="text"
                  placeholder="Ilość stron"
                  name="pages"
                  required
                  onChange={(event) => {
                    const inputElement = event.currentTarget as HTMLInputElement;

                    inputElement.value = inputElement.value.replace(/[^\d]+/g, "");
                  }}></input>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>
                  Ilość znaków ze spacją <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
                </label>
                <input
                  type="text"
                  placeholder="Ilość znaków ze spacją"
                  name="numberOfCharactersWithSpaces"
                  required
                  onChange={(event) => {
                    const inputElement = event.currentTarget as HTMLInputElement;

                    inputElement.value = inputElement.value.replace(/[^\d]+/g, "");
                  }}></input>
              </div>
            </div>
            <div className={`${styles.row}`}>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>
                  Temat przewodni utworu <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
                </label>
                <input type="text" placeholder="Temat przewodni utworu" name="topic" required></input>
              </div>
            </div>
            <div className={`${styles.row}`}>
              <div className={`${styles.checkbox_inputs_wrapper}`}>
                <label className={`${styles.title}`}>
                  Czego potrzebujesz? <em className={`${styles.mandatory_field}`}>(Wybierz przynajmniej jedno)</em>
                </label>
                <div className={`${styles.wrapper}`}>
                  <div className={`${styles.input_wrapper}`}>
                    <label htmlFor="adjustment">Korekta</label>
                    <input
                      id="adjustment"
                      type="checkbox"
                      name="adjustment"
                      required
                      onClick={(event) => toggleRequiredAttributeToCheckboxElements(event)}></input>
                  </div>
                  <div className={`${styles.input_wrapper}`}>
                    <label htmlFor="proofreading">Redakcja</label>
                    <input
                      id="proofreading"
                      type="checkbox"
                      name="proofreading"
                      required
                      onClick={(event) => toggleRequiredAttributeToCheckboxElements(event)}></input>
                  </div>
                  <div className={`${styles.input_wrapper}`}>
                    <label htmlFor="formatting">Formatowanie</label>
                    <input
                      id="formatting"
                      type="checkbox"
                      name="formatting"
                      required
                      onClick={(event) => toggleRequiredAttributeToCheckboxElements(event)}></input>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.row}`}>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>
                  Dodatkowe informacje
                  <em className={`${styles.mandatory_field}`}>(Możesz w skrócie opisać, z czym się borykasz w swoim tekście i czego od nas potrzebujesz)</em>
                </label>
                <textarea className={`${mulishFont.className}`} placeholder="Dodatkowe informacje" name="additionalInformation"></textarea>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>
                  Załącz plik
                  <em className={`${styles.mandatory_field}`}>(Pole obowiązkowe)</em>
                </label>
                <div className={`${styles.drop_down_section}`}>
                  <input
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
            </div>
          </section>
          <div className={` ${styles.agree}`}>
            <input id="checkbox1" type="checkbox" required></input>
            <label htmlFor="checkbox1">
              Wysyłając zgłoszenie wyrażasz zgodę na przetwarzanie Twoich danych osobowych w celu odpowiedzi na wiadomość. Więcej informacji w Polityce
              prywatności
            </label>
          </div>
          <Button
            type="submit"
            className={`${formStatus === "sending" ? styles.sending : ""}`}
            style={{ padding: "20px 30px 20px 30px", alignSelf: "center" }}
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
                    const response = await sendMainForm(formData);

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
            {formStatus === "sending" ? "Wysyłanie..." : "Wyślij zapytanie"}
          </Button>
        </form>
      ) : (
        <div className={`${styles.sent}`}>
          {formStatus === "ok" ? (
            <div>
              <p>Świetnie!</p>
              <svg xmlns="http://www.w3.org/2000/svg" height="128" viewBox="0 -960 960 960" width="128">
                <path fill="#18A77C" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
              <p>
                Już nie długo <mark>skontakujemy się z Tobą!</mark>
              </p>
            </div>
          ) : (
            <div>
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

export default Form;
