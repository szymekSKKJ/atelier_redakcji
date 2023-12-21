import styles from "./styles.module.scss";
import Image from "next/image";
import documentBlue from "../../../../public/document_blue.svg";
import Button from "@/components/UI/Button/Button";

interface componentProps {
  type?: "landing page" | "blog";
}

const Section11 = ({ type = "landing page" }: componentProps) => {
  return (
    <section className={`${styles.section}`}>
      <Image className={`${styles.icon}`} src={documentBlue} alt="Ikonka dokumentu"></Image>
      <header>
        <h2>
          {type === "landing page" ? (
            <>
              A może <mark>jesteś już zdecydowany/a</mark> i chcesz zostawić nam swój tekst do korekty?
            </>
          ) : (
            <>
              <mark>Potrzebujesz pomocy</mark> doświadczonej osoby do skontrolowania tekstu?
            </>
          )}
        </h2>
        {type === "landing page" ? (
          <>
            <p>Skorzystaj zatem z prostego i intuicyjnego formularza, w którym wstawisz swój plik, a my wrócimy do Ciebie zi nformacjami i wyceną.</p>
          </>
        ) : (
          <>
            <p>
              <b>Oferujemy kompleksową pomoc w zakresie</b> <mark>redakcji i korekty tekstu</mark>, a nasze usługi świadczymy na najwyższym poziomie.
            </p>
            <p>
              <b>Tekst będzie spełniał</b> <mark>wszelkie wymogi uczelniane, redakcyjne i językowe.</mark> Dostaniesz tekst gotowy w 100% do publikacji/wydruku.
            </p>
          </>
        )}
      </header>
      <Button style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute="/#mainForm">
        Wyceń swój tekst
      </Button>
    </section>
  );
};

export default Section11;
