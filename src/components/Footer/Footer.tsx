import styles from "./styles.module.scss";
import sygnet from "../../../public/logoFooter/sygnet.svg";
import text from "../../../public/logoFooter/text.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "../UI/Button/Button";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.wrapper}`}>
          <div className={`${styles.wrapper}`}>
            <div className={`${styles.logo_wrapper}`}>
              <Image src={sygnet} alt="Logo"></Image>
              <Image src={text} alt="text"></Image>
            </div>
            <nav>
              <div className={`${styles.column}`}>
                <Link href="/">Strona główna</Link>
                <Link href="/dlaczego-my">Dlaczego my?</Link>
                <Link href="/oferta">Oferta</Link>
              </div>
              <div className={`${styles.column}`}>
                <Link href="/faq">FAQ</Link>
                <Link href="/kontakt">Kontakt</Link>
                <Link href="/blog">Blog</Link>
              </div>
              <div className={`${styles.column}`}>
                <Link href="/warunki-swiadczenia-uslug">Ogólne warunki świadczenia usług</Link>
                <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
                <Link href="/cennik">Cennik</Link>
              </div>
            </nav>
          </div>
          <Button style={{ padding: "15px 20px 15px 20px", fontSize: "16px" }} changeRoute="/#mainForm">
            Wyceń swój tekst
          </Button>
        </div>
        <span>
          <p>Copyright © 2022-{new Date().getFullYear()} atelier-redakcji.eu</p>
          <p>Projekt strony: Damian Kiliszek</p>
          <p>Wdrożenie: Szymon Stępniak#SKKJ</p>
        </span>
      </div>
      <div className={`${styles.disclaimer}`}>
        <p>
          Nota prawna - zakaz kopiowania. Wszystkie materiały umieszczone na stronie atelier-redakcji.eu są chronione prawami autorskimi na mocy przepisów
          ustawy z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych. Właścicielem autorskich praw majątkowych jest Administrator (Małgorzata
          Frąckowiak prowadząca działalność gospodarczą pod firmą Korektapress Małgorzata Frąckowiak z siedzibą przy ul. Gen. Władysława Bortnowskiego 5/12,
          85-793 Bydgoszcz, NIP 9532496443, REGON 340703994). Właściciel autorskich praw majątkowych zastrzega, w rozumieniu art. 25 ust. 1 pkt. 1 ustawy z dnia
          4 lutego 1994 r. o prawie autorskim i prawach pokrewnych, że dalsze rozpowszechnianie materiałów opublikowanych na stronie atelier-redakcji.eu jest
          zabronione niezależnie od celu, w jakim rozpowszechnienie miałoby nastąpić oraz niezależnie od użytego środka przekazu. Zabrania się kopiowania i
          rozpowszechniania zamieszczonych na stronie atelier-redakcji.eu tekstów, banerów, znaków itp. pod groźbą sankcji prawnych.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
