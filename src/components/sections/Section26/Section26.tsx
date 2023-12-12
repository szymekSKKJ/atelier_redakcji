"use client";

import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";
import { useEffect } from "react";

const Section26 = () => {
  useEffect(() => {}, []);
  return (
    <section className={`${styles.section}`}>
      <article>
        <h2>Dane firmy</h2>
        <CurvedLines></CurvedLines>
        <p className={`${styles.caption1}`}>Korektapress Małgorzata Frąckowiak</p>
        <p>ul. Gen. Wł. Bortnowskiego 5/12, 85-793 Bydgoszcz</p>
        <p className={`${styles.caption2}`}>
          <b>NIP:</b> 9532496443
        </p>
        <p className={`${styles.caption2}`}>
          <b>REGON</b>: 340703994
        </p>
      </article>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1196.1350567303214!2d18.170590800000003!3d53.159192600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa3eda3c65385c18f%3A0xb97866dd372eccec!2sRedakcja%20i%20korekta%20tekstu%20%E2%80%93%20%F0%9F%93%9A%20Atelier%20redakcji%20tekstu%20Bydgoszcz%20%F0%9F%96%8B%EF%B8%8F!5e0!3m2!1spl!2spl!4v1702416745989!5m2!1spl!2spl"
        width="800"
        height="800"
        style={{ border: "0" }}
        loading="lazy"></iframe>
    </section>
  );
};

export default Section26;
