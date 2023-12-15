"use client";

import { Mulish } from "next/font/google";
import styles from "./styles.module.scss";
import document from "../../../../../public/document.svg";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import { MouseEvent } from "react";

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
  return (
    <form className={`${styles.form}`}>
      <section>
        <p className={`${styles.title}`}>1. Dane kontaktowe:</p>
        <div className={`${styles.row}`}>
          <div className={`${styles.input_wrapper}`}>
            <label className={`${styles.title}`}>
              Imię <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
            </label>
            <input type="text" placeholder="Imię" required></input>
          </div>
          <div className={`${styles.input_wrapper}`}>
            <label className={`${styles.title}`}>
              Adres e-mail <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
            </label>
            <input type="text" placeholder="Adres e-mail" required></input>
          </div>
          <div className={`${styles.input_wrapper}`}>
            <label className={`${styles.title}`}>Numer telefonu</label>
            <input type="text" placeholder="Numer telefonu" required></input>
          </div>
          <div className={`${styles.input_wrapper}`}>
            <label className={`${styles.title}`}>Nazwa firmy</label>
            <input type="text" placeholder="Nazwa firmy" required></input>
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
            <input type="text" placeholder="Rodzaj tekstu" required></input>
          </div>
          <div className={`${styles.input_wrapper}`}>
            <label className={`${styles.title}`}>
              Termin realizacji <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
            </label>
            <input type="date" placeholder="Termin realizacji" required></input>
          </div>
          <div className={`${styles.input_wrapper}`}>
            <label className={`${styles.title}`}>
              Ilość stron <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
            </label>
            <input type="text" placeholder="Ilość stron" required></input>
          </div>
          <div className={`${styles.input_wrapper}`}>
            <label className={`${styles.title}`}>
              Ilość znaków ze spacją <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
            </label>
            <input type="text" placeholder="Ilość znaków ze spacją" required></input>
          </div>
        </div>
        <div className={`${styles.row}`}>
          <div className={`${styles.input_wrapper}`}>
            <label className={`${styles.title}`}>
              Temat przewodni utworu <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
            </label>
            <input type="text" placeholder="Temat przewodni utworu" required></input>
          </div>
        </div>
        <div className={`${styles.row}`}>
          <div className={`${styles.checkbox_inputs_wrapper}`}>
            <label className={`${styles.title}`}>
              Czego potrzebujesz? <em className={`${styles.mandatory_field}`}>(pole obowiązkowe)</em>
            </label>
            <div className={`${styles.wrapper}`}>
              <div className={`${styles.input_wrapper}`}>
                <label>Korekta</label>
                <input type="checkbox" required></input>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label>Redakcja</label>
                <input type="checkbox" required></input>
              </div>
              <div className={`${styles.input_wrapper}`}>
                <label>Formatowanie</label>
                <input type="checkbox" required></input>
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
            <textarea className={`${mulishFont.className}`} placeholder="Dodatkowe informacje" required></textarea>
          </div>
          <div className={`${styles.input_wrapper}`}>
            <label className={`${styles.title}`}>
              Załącz plik
              <em className={`${styles.mandatory_field}`}>(Pole obowiązkowe)</em>
            </label>
            <div className={`${styles.drop_down_section}`}>
              <input type="file" id="fileInput" required></input>
              <label htmlFor="fileInput">
                <Image src={document} alt="Ikonka dokumentu"></Image>
                <p>
                  Przeciągnij plik tutaj lub <mark>wybierz z komputera</mark>
                </p>
              </label>
            </div>
          </div>
        </div>
      </section>
      <Button style={{ padding: "20px 30px 20px 30px", alignSelf: "center" }}>Wyślij zapytanie</Button>
    </form>
  );
};

export default Form;
