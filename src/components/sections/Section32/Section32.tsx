import CustomOfferForm from "@/components/Forms/CustomOfferForm/CustomOfferForm";
import Section27 from "../Section27/Section27";
import styles from "./styles.module.scss";

const defaultOfferType = {
  headerTitlte: "Własna oferta",
  title: <>Żaden typ kategorii nie pasuje do Twojego tekstu?</>,
  paragraphs: [
    {
      id: 1,
      content: <>Nic nie szkodzi!</>,
    },
    {
      id: 2,
      content: (
        <>
          Skontaktuj się z nami, <mark>pisząc do nas maila</mark> lub wypełniając poniższy formularz. <mark>Zachęcamy do dodania pliku</mark> ze swoim tekstem -
          będzie nam łatwiej zrozumieć Twój problem :)
        </>
      ),
    },
  ],
};

const Section32 = () => {
  return (
    <section className={`${styles.section}`}>
      <main>
        <Section27 sectionData={defaultOfferType} type={"default"}></Section27>
      </main>
      <div className={`${styles.form_wrapper}`}>
        <CustomOfferForm></CustomOfferForm>
      </div>
    </section>
  );
};

export default Section32;
