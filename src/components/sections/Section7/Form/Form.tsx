"use client";

import { Mulish } from "next/font/google";
import styles from "./styles.module.scss";
import document from "../../../../../public/document.svg";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import { FormEvent, useRef, useState } from "react";

import Loader from "@/design/Loader/Loader";
import Checkbox from "@/components/UI/Checkbox/Checkbox";
import Link from "next/link";
import calendarIcon from "../../../../../public/calendar.svg";
import sendMainForm from "@/app/api/nodemailer/sendMainForm";

const mulishFont = Mulish({ subsets: ["latin"] });

const toggleRequiredAttributeToCheckboxElements = (event: FormEvent<HTMLInputElement>) => {
  const checboxWrapperElement = event.currentTarget.parentElement!.parentElement!.parentElement as HTMLDivElement;
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
  const [attachedFile, setAttachedFile] = useState<null | File | undefined>(null);
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
                <input type="text" name="name" required placeholder=""></input>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>
                  Adres e-mail <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
                </label>
                <input type="email" name="email" required placeholder=""></input>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>Numer telefonu</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder=""
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
                <input type="text" name="companyName" placeholder=""></input>
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
                <div className={`${styles.select_wrapper}`}>
                  <select defaultValue="" name="textType" required className={`${mulishFont.className}`}>
                    <option disabled hidden value="">
                      Wybierz rodzaj tekstu
                    </option>
                    <option className={`${mulishFont.className}`} value="Praca licencjacka">
                      Praca licencjacka
                    </option>
                    <option className={`${mulishFont.className}`} value="Praca inżynierska">
                      Praca inżynierska
                    </option>
                    <option className={`${mulishFont.className}`} value="Praca magisterska">
                      Praca magisterska
                    </option>
                    <option className={`${mulishFont.className}`} value="Praca doktorska">
                      Praca doktorska
                    </option>
                    <option className={`${mulishFont.className}`} value="Praca habilitacyjna">
                      Praca habilitacyjna
                    </option>
                    <option className={`${mulishFont.className}`} value="Praca zaliczeniowa">
                      Praca zaliczeniowa
                    </option>
                    <option className={`${mulishFont.className}`} value="Praca dyplomowa">
                      Praca dyplomowa
                    </option>
                    <option className={`${mulishFont.className}`} value="Publikacja naukowa">
                      Publikacja naukowa
                    </option>
                    <option className={`${mulishFont.className}`} value="Tekst specjalistyczny">
                      Tekst specjalistyczny
                    </option>
                    <option className={`${mulishFont.className}`} value="Książka">
                      Książka
                    </option>
                    <option className={`${mulishFont.className}`} value="Post blogowy/Artykuł">
                      Post blogowy/Artykuł
                    </option>
                    <option className={`${mulishFont.className}`} value="Inny">
                      Inny
                    </option>
                  </select>
                  <span></span>
                </div>
              </div>
              <div className={`${styles.input_wrapper} ${styles.calendar}`}>
                <label className={`${styles.title}`}>
                  Termin realizacji <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
                </label>
                <Image src={calendarIcon} alt="Ikona kalendarza"></Image>
                <input type="date" required name="deadline" placeholder="" className={`${mulishFont.className}`}></input>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>
                  Ilość stron <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
                </label>
                <input
                  type="text"
                  name="pages"
                  placeholder=""
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
                  name="numberOfCharactersWithSpaces"
                  required
                  placeholder=""
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
                <input type="text" name="topic" required placeholder=""></input>
              </div>
            </div>
            <div className={`${styles.row}`}>
              <div className={`${styles.checkbox_inputs_wrapper}`}>
                <label className={`${styles.title}`}>
                  Czego potrzebujesz? <em className={`${styles.mandatory_field}`}>(Wybierz przynajmniej jedno)</em>
                </label>
                <div className={`${styles.wrapper}`}>
                  <div className={`${styles.input_wrapper}`}>
                    <Checkbox color="#18a77c" required placeholder="" onInput={(event) => toggleRequiredAttributeToCheckboxElements(event)}>
                      Korekta
                    </Checkbox>
                  </div>
                  <div className={`${styles.input_wrapper}`}>
                    <Checkbox color="#18a77c" required placeholder="" onInput={(event) => toggleRequiredAttributeToCheckboxElements(event)}>
                      Redakcja
                    </Checkbox>
                  </div>
                  <div className={`${styles.input_wrapper}`}>
                    <Checkbox color="#18a77c" required placeholder="" onInput={(event) => toggleRequiredAttributeToCheckboxElements(event)}>
                      Formatowanie
                    </Checkbox>
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
                <textarea placeholder="" className={`${mulishFont.className}`} name="additionalInformation"></textarea>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label className={`${styles.title}`}>Załącz plik</label>
                <div className={`${styles.drop_down_section} ${attachedFile ? styles.fileAttached : ""}`}>
                  <input
                    type="file"
                    id="fileInput"
                    placeholder=""
                    accept="text/*, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                    <p className={`${styles.caption}`}>(Tylko pliki tekstowe)</p>
                    {attachedFile && (
                      <p
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setAttachedFile(null);
                        }}
                        className={`${styles.attatched_file}`}>
                        {attachedFile.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </section>
          <div className={`${styles.agree}`}>
            <Checkbox required placeholder="">
              Wysyłając zgłoszenie wyrażasz zgodę na przetwarzanie Twoich danych osobowych w celu odpowiedzi na wiadomość. Więcej informacji w{" "}
              <Link href="/privacyPolicy">Polityce prywatności</Link>
            </Checkbox>
          </div>
          <Button
            type="submit"
            className={`${formStatus === "sending" ? styles.sending : ""}`}
            style={{ padding: "20px 30px 20px 30px", alignSelf: "center" }}
            onClick={async () => {
              if (formElementRef.current) {
                const formData = new FormData(formElementRef.current!);

                if (attachedFile) {
                  formData.append("file", attachedFile);
                }

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
                Już niedługo <mark>skontakujemy się z Tobą!</mark>
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
      <hr style={{ border: "solid 0px transparent", borderBottom: "solid 1px #dce3e9", width: "100%", marginTop: "140px", marginBottom: "40px" }}></hr>
    </>
  );
};

export default Form;
