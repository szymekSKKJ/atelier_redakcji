"use client";
import CurvedLines from "@/globalComponents/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";
import { AnimatedCounter } from "react-animated-counter";
import { useEffect, useRef, useState } from "react";

// Zmienić value of counter gdy ta sekcja będzie widoczna #SKKJ

const Section5 = () => {
  const [isSectionIntersecting, setIsSectionIntersecting] = useState(false);

  const intersectionObserverRef = useRef<null | IntersectionObserver>(null);
  const sectionElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (intersectionObserverRef.current === null) {
      intersectionObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsSectionIntersecting(entry.isIntersecting);
          });
        },
        {
          root: null,
          threshold: 0.6,
        }
      );

      intersectionObserverRef.current.observe(sectionElementRef.current!);
    }
  }, []);

  return (
    <section className={`${styles.section}`} ref={sectionElementRef}>
      <h2>Atelier redakcji tekstu w liczbach</h2>
      <CurvedLines></CurvedLines>
      <div className={`${styles.articles}`}>
        <article>
          <div className={`${styles.animated_counter}`}>
            <AnimatedCounter
              fontSize="56px"
              color="#fbfbfb"
              incrementColor="#fbfbfb"
              decrementColor="#fbfbfb"
              value={isSectionIntersecting ? 6 : 0}
              decimalPrecision={0}></AnimatedCounter>
            +
          </div>
          <p>LAT</p>
          <p>doświadczenia</p>
        </article>
        <article>
          <div className={`${styles.animated_counter}`}>
            <AnimatedCounter
              fontSize="56px"
              color="#fbfbfb"
              incrementColor="#fbfbfb"
              decrementColor="#fbfbfb"
              value={isSectionIntersecting ? 12 : 0}
              decimalPrecision={0}></AnimatedCounter>
            +
          </div>
          <p>REDAKTORÓW</p>
          <p>w zespole</p>
        </article>
        <article>
          <div className={`${styles.animated_counter}`}>
            <AnimatedCounter
              fontSize="56px"
              color="#fbfbfb"
              incrementColor="#fbfbfb"
              decrementColor="#fbfbfb"
              value={isSectionIntersecting ? 880 : 0}
              decimalPrecision={0}></AnimatedCounter>
            +
          </div>
          <p>ZADOWOLONYCH</p>
          <p>klientów</p>
        </article>
        <article>
          <div className={`${styles.animated_counter}`}>
            <AnimatedCounter
              fontSize="56px"
              color="#fbfbfb"
              incrementColor="#fbfbfb"
              decrementColor="#fbfbfb"
              value={isSectionIntersecting ? 54000 : 0}
              decimalPrecision={0}></AnimatedCounter>
            +
          </div>
          <p>ZREDAGOWANYCH</p>
          <p>korekt A4</p>
        </article>
      </div>
    </section>
  );
};

export default Section5;
