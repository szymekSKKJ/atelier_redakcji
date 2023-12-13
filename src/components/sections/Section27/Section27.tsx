import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";

const formattedTypesFromParams = [
  {
    key: "prace-licenjcackie",
    value: "Prace licencjackie",
    title: (
      <>
        Czym powinna charakteryzować się <mark>praca licencjacka?</mark>
      </>
    ),
  },
  {
    key: "prace-inzynierskie",
    value: "Prace inżynierskie",
    title: (
      <>
        Czym powinna charakteryzować się <mark>praca inżynierska?</mark>
      </>
    ),
  },
  {
    key: "prace-magisterskie",
    value: "Prace magisterskie",
    title: (
      <>
        Czym powinna charakteryzować się <mark> praca magisterska?</mark>
      </>
    ),
  },
  {
    key: "prace-doktorskie-i-habilitacyjne",
    value: "Prace doktorskie i habilitacyjne",
    title: (
      <>
        Czym powinna charakteryzować się praca <mark>doktorska i habilitacyjna?</mark>
      </>
    ),
  },
  {
    key: "prace-zaliczeniowe",
    value: "Prace zaliczeniowe",
    title: (
      <>
        Czym powinna charakteryzować się <mark>praca zaliczeniowa?</mark>
      </>
    ),
  },
  {
    key: "prace-dyplomowe",
    value: "Prace dyplomowe",
    title: (
      <>
        Czym powinna charakteryzować się <mark> praca dyplomowa?</mark>
      </>
    ),
  },
  {
    key: "publikacje-naukowe",
    value: "Publikacje naukowe",
    title: (
      <>
        Czym powinna charakteryzować się <mark>praca naukowa?</mark>
      </>
    ),
  },
  {
    key: "teksty-specjalistyczne",
    value: "Teksty specjalistyczne",
    title: (
      <>
        Czym powinien charakteryzować się <mark>tekst specjalistyczny?</mark>
      </>
    ),
  },
  {
    key: "inny-tekst",
    value: "Inny tekst",
    title: (
      <>
        Czym powinien charakteryzować się <mark>inny tekst?</mark>
      </>
    ),
  },
];

interface props {
  type: string;
}

const Section27 = ({ type }: props) => {
  const foundTitle = formattedTypesFromParams.find((formattedType) => formattedType.key === type)!;

  return (
    <section className={`${styles.section}`}>
      <header>
        <p>OFERTA</p>
        <hr></hr>
        <h1>{foundTitle.value}</h1>
      </header>
      <div className={`${styles.wrapper}`}>
        <h2>{foundTitle.title}</h2>
        <CurvedLines></CurvedLines>
        <div className={`${styles.wrapper}`} role="group">
          <article>
            <p className={`${styles.caption1}`}>
              Praca licencjacka dla większości studentów jest pierwszą pracą dyplomową, którą należy przedstawić podczas obrony.
            </p>
            <p className={`${styles.caption2}`}>
              Jak każdy inny tekst akademicki charakteryzuje się wykorzystaniem specyficznego stylu naukowego, który wymaga od autora zachowania obiektywizmu,
              neutralności oraz rezygnacji z wykorzystywania środków ekspresji słownej. Podczas pisania <mark>pracy dyplomowej</mark> konieczne jest także
              zachowanie zasad formatowania tekstu
            </p>
            <p className={`${styles.caption2}`}>
              <mark>Standardy pracy licencjackiej obejmują</mark> m.in. spis treści, cytaty, tytuły rozdziałów, przypisy oraz bibliografię.
            </p>
          </article>
          <article>
            <p className={`${styles.caption1}`}>
              Pisanie prac licencjackich wymaga od autorów umiejętności spójnego i klarownego przedstawiania badań oraz spostrzeżeń.
            </p>
            <p>
              Konieczne jest zachowanie zasad poprawnej polszczyzny oraz sprawne operowanie językiem technicznym i specjalistycznym. W przypadku znalezienia
              nieścisłości i błędów logicznych promotor oraz recenzenci mogą odrzucić treść i wymagać naniesienia stosownych poprawek, co znacznie wydłuża
              pisanie pracy i zdobycie tytułu naukowego.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Section27;
