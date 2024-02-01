"use client";

import quote from "../../../../../public/quote.svg";
import arrowWhite from "../../../../../public/arrow_white.svg";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";

const OpinionsGallery = () => {
  const wrapperElementRef = useRef<null | HTMLDivElement>(null);

  const [galleryOffest, setGalleryOffest] = useState(0);
  const [currentVisibleOpinionsOffest, setCurrentVisibleOpinionsOffest] = useState(3); // It depends of main wrapper element width

  const opinions = [
    {
      id: 1,
      username: "Karolina",
      description:
        "Z całego serca polecam Atelier redakcji tekstu! Przemiła, życzliwa i pomocna obsługa klienta, a do tego ekspresowy czas działania. Nic dodać, nic ująć - rewelacja :):):)",
    },
    {
      id: 2,
      username: "Ania",
      description:
        "Zlecona przeze mnie redakcja pracy magisterskiej wykonana została terminowo, jestem bardzo zadowolona z usługi. Przez cały czas realizacji mieliśmy świetny kontakt. Dzięki Atelier mogę się pochwalić 5 na dyplomie.",
    },
    {
      id: 3,
      username: "Paulina",
      description:
        "Korzystałam z oferty Atelier przy pisaniu pracy zaliczeniowej. Korekta i redakcja mojej pracy została wykonana świetnie - zauważyli błędy, na które ja nie zwróciłabym uwagi.",
    },
    {
      id: 4,
      username: "Karolina",
      description:
        "Z całego serca polecam Atelier redakcji tekstu! Przemiła, życzliwa i pomocna obsługa klienta, a do tego ekspresowy czas działania. Nic dodać, nic ująć - rewelacja :):):)",
    },
    {
      id: 5,
      username: "Karolina",
      description:
        "Z całego serca polecam Atelier redakcji tekstu! Przemiła, życzliwa i pomocna obsługa klienta, a do tego ekspresowy czas działania. Nic dodać, nic ująć - rewelacja :):):)",
    },
    {
      id: 6,
      username: "Karolina",
      description:
        "Z całego serca polecam Atelier redakcji tekstu! Przemiła, życzliwa i pomocna obsługa klienta, a do tego ekspresowy czas działania. Nic dodać, nic ująć - rewelacja :):):)",
    },
    {
      id: 7,
      username: "Karolina",
      description:
        "Z całego serca polecam Atelier redakcji tekstu! Przemiła, życzliwa i pomocna obsługa klienta, a do tego ekspresowy czas działania. Nic dodać, nic ująć - rewelacja :):):)",
    },
  ];

  useEffect(() => {
    const changeCurrentVisibleOpinionsCount = () => {
      if (window.innerWidth > 1440) {
        setCurrentVisibleOpinionsOffest(3);
      } else if (window.innerWidth <= 1440 && window.innerWidth > 1024) {
        setCurrentVisibleOpinionsOffest(2);
      } else if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        setCurrentVisibleOpinionsOffest(1);
      } else if (window.innerWidth <= 768 && window.innerWidth > 425) {
        setCurrentVisibleOpinionsOffest(1); // Due to the static offset on styles in max-width: 768px at .opinions
      } else if (window.innerWidth <= 425) {
        setCurrentVisibleOpinionsOffest(1);
      }
    };

    changeCurrentVisibleOpinionsCount();

    window.addEventListener("resize", changeCurrentVisibleOpinionsCount);

    return () => {
      window.removeEventListener("resize", changeCurrentVisibleOpinionsCount);
    };
  }, []);

  useEffect(() => {
    if (wrapperElementRef.current) {
      wrapperElementRef.current.style.setProperty("--gallery-offset", `${galleryOffest}`);
    }
  }, [galleryOffest]);

  return (
    <div className={`${styles.wrapper}`} ref={wrapperElementRef} role="group">
      <div className={`${styles.buttons}`} role="group">
        <button
          className={`${galleryOffest === 0 ? styles.light : ""}`}
          onClick={() => {
            setGalleryOffest((currentValue) => (currentValue > 0 ? currentValue - 1 : currentValue));
          }}>
          <Image src={arrowWhite} alt="Strzłka w lewo"></Image>
        </button>
        <button
          className={`${galleryOffest === opinions.length - currentVisibleOpinionsOffest ? styles.light : ""}`}
          onClick={() => {
            setGalleryOffest((currentValue) => (currentValue < opinions.length - currentVisibleOpinionsOffest ? currentValue + 1 : currentValue));
          }}>
          <Image src={arrowWhite} alt="Strzłka w prawo"></Image>
        </button>
      </div>
      <div className={`${styles.wrapper_inside}`} role="group">
        {opinions.map((opinionData) => {
          const { id, username, description } = opinionData;
          return (
            <article key={id}>
              <Image src={quote} alt="Ikonka czudzysłowia"></Image>
              <p className={styles.username}>{username}</p>
              <p className={styles.description}>{description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default OpinionsGallery;
