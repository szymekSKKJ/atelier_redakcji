import styles from "./styles.module.scss";
import Button from "@/components/UI/Button/Button";

const Section12 = () => {
  return (
    <header className={`${styles.header}`}>
      <h1>Piszesz licencjat, magisterkę, doktorat? A może książkę lub artykuł?</h1>
      <p>Dobrze, że jesteś! Poprawimy Twój tekst!</p>
      <div className={`${styles.buttons_wrapper}`} role="group">
        <Button theme="transparent-white" style={{ padding: "20px 30px 20px 30px", fontSize: "20px" }} changeRoute="/oferta">
          Poznaj ofertę
        </Button>
        <Button style={{ padding: "20px 30px 20px 30px", fontSize: "20px" }} changeRoute="/#mainForm">
          Wyceń swój tekst
        </Button>
      </div>
    </header>
  );
};

export default Section12;
