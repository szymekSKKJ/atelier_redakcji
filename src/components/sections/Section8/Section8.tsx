"use client";

import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";
import { useRef } from "react";

const Section8 = () => {
  const sectionRef = useRef<null | HTMLElement>(null);

  const defaultData = [
    {
      id: 1,
      question: "Czy korekta pracy jest legalna?",
      answer:
        "Tak, korekta pracy jest legalna, o ile nie narusza zasad uczciwości akademickiej. Korekta może obejmować poprawę gramatyki, interpunkcji oraz stylu, ale nie może wpływać na treść merytoryczną pracy.",
    },
    {
      id: 2,
      question: "Jak sprawdzić plagiat pracy?",
      answer: "Aby sprawdzić plagiat pracy, można skorzystać z dedykowanych programów i serwisów online, takich jak Turnitin czy Plagscan.",
    },
    {
      id: 3,
      question: "Ile kosztuje koretka jednej strony A4?",
      answer: "Średni koszt korekty jednej strony wynosi od 10 do 20 zł, w zależności od stopnia skomplikowania tekstu.",
    },
    {
      id: 4,
      question: "Ile kosztuje sprawdzenie pracy?",
      answer: "Sprawdzenie pracy pod względem merytorycznym, stylistycznym oraz pod kątem plagiatu kosztuje zazwyczaj od 200 do 900 zł za całość.",
    },
    {
      id: 5,
      question: "Ile trwa redakcja pracy?",
      answer:
        "Czas redakcji pracy zależy od jej objętości, jakości pierwotnego tekstu oraz zakresu usług redakcyjnych. Średnio redakcja pracy trwa od 3 do 7 dni. W przypadku bardziej skomplikowanych lub obszernych prac czas może się wydłużyć.",
    },
    {
      id: 6,
      question: "Ile trwa korekta pracy?",
      answer:
        "Korekta pracy zazwyczaj jest szybsza niż redakcja. Średnio korekta trwa od 3 do 6 dni, zależnie od ilości stron oraz błędów w tekście. Ważne jest, aby uwzględnić dodatkowy czas na ewentualne poprawki po pierwszej korekcie.",
    },
    {
      id: 7,
      question: "Ile kosztuje formatowanie pracy ?",
      answer: "Formatowanie pracy, w zależności od wymagań, kosztuje średnio od 5 do 15 zł za stronę.",
    },
    {
      id: 8,
      question: "Ile kosztuje redakcja 1 strony?",
      answer:
        "Redakcja jednej strony pracy, obejmująca zarówno korektę językową, jak i poprawę struktury treści, kosztuje przeważnie od 10 do 30 zł. Cena jest uzależniona od zakresu wymaganej ingerencji.",
    },
  ];

  return (
    <section className={`${styles.section}`} ref={sectionRef}>
      <header>
        <h2>FAQ</h2>
        <CurvedLines></CurvedLines>
        <p className={styles.caption1}>Przygotowaliśmy najczęściej pojawiające się od Was pytania.</p>
        <p className={`${styles.caption2}`}>
          Prawdopodobnie znajdziesz odpowiedź na swoje pytanie poniżej, a jeśli to coś nowego, napisz do nas - na pewno pomożemy!
        </p>
      </header>
      <div className={`${styles.questions}`} role="group">
        {defaultData.map((data) => {
          const { id, question, answer } = data;

          return (
            <div key={id}>
              <input type="checkbox" id={`${id}`} hidden />
              <details data-is-open={"false"} open>
                <summary
                  onClick={(event) => {
                    const contentElement = event.currentTarget.nextSibling as HTMLElement;
                    const currentElement = event.currentTarget as HTMLElement;

                    if (currentElement.parentElement!.dataset.isOpen === "false") {
                      currentElement.parentElement!.style.maxHeight = `${100 + contentElement.getBoundingClientRect().height}px`;

                      currentElement.parentElement!.dataset.isOpen = "true";
                    } else {
                      currentElement.parentElement!.style.maxHeight = `100px`;
                      currentElement.parentElement!.dataset.isOpen = "false";
                    }
                  }}>
                  <label htmlFor={`${id}`}>{question}</label>
                </summary>
                <div className={`${styles.content}`}>
                  <p>{answer}</p>
                </div>
              </details>
            </div>
          );
        })}
      </div>
      <p className={styles.caption3}>Masz dodatkowe pytania?</p>
      <p className={styles.caption4}>
        Napisz do nas na adres <mark>kontakt@atelier-redakcji.eu</mark>
      </p>
    </section>
  );
};

export default Section8;
