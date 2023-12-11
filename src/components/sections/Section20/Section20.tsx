import styles from "./styles.module.scss";
import Image from "next/image";
import image1 from "../../../../public/sections/section20/image1.jpg";
import image2 from "../../../../public/sections/section20/image2.jpg";
import image3 from "../../../../public/sections/section20/image3.jpg";
import image4 from "../../../../public/sections/section20/image4.jpg";

const articles = [
  {
    id: 1,
    image: image1,
    header: (
      <>
        <mark>Korekta</mark> tekstów
      </>
    ),
    captions: [
      {
        id: 1,
        content:
          "Zajmujemy się kompleksową korektą treści, która obejmuje usunięcie błędów ortograficznych, stylistycznych, gramatycznych, językowych i interpunkcyjnych.",
      },
      {
        id: 2,
        content:
          "Dzięki temu zaprezentujesz swoje myśli w profesjonalnej formie. Przedstawienie poprawnego tekstu to najlepszy sposób na okazanie szacunku każdemuzytelnikowi.",
      },
      {
        id: 3,
        content: "W przypadku treści naukowych i zawodowych wzmocnisz swoją pozycję eksperta, budując przy tym autorytet w branży.",
      },
      {
        id: 4,
        content: "Z korekty językowej mogą skorzystać także autorzy tekstów literackich.",
      },
    ],
  },
  {
    id: 2,
    image: image2,
    header: (
      <>
        <mark>Redakcja</mark> tekstów
      </>
    ),
    captions: [
      {
        id: 1,
        content:
          "Jeśli zależy Ci na całościowej poprawie tekstu, postaw na redakcję językową i edytorską. Oprócz poprawienia błędów językowych zajmiemy się opracowaniem graficznym treści, czyli tzw. redakcją techniczną.",
      },
      {
        id: 2,
        content:
          "Adiustacja pozwoli na ustandaryzowanie struktury, która stanie się prosta i przyjemna w odbiorze. Zajmiemy się ujednoliceniem formatowania, czcionek oraz opracowaniem tabeli, wykresów i przypisów.",
      },
      {
        id: 3,
        content: "Dzięki temu pomożemy w stworzeniu tekstu gotowego do druku lub publikacji, uwzględniając przy tym ewentualne wytyczne konkretnych wydawców.",
      },
    ],
  },
  {
    id: 3,
    image: image3,
    header: (
      <>
        <mark>Poprawa</mark> prac naukowych
      </>
    ),
    captions: [
      {
        id: 1,
        content:
          "Nasz zespół specjalizuje się w poprawie i redakcji tekstów o charakterze naukowym, zarówno prac dyplomowych, jak i treści prezentacji czy artykułów recenzowanych.",
      },
      {
        id: 2,
        content:
          "Pomożemy w znalezieniu wszelkich błędów językowych i logicznych. Zaznaczymy ewentualne niespójności lub sprzeczności, które mogą utrudnić zrozumienie treści. Zadbamy przy tym, aby forma prezentowania badań była przyjemna i profesjonalna.",
      },
      {
        id: 3,
        content:
          "W razie konieczności naniesiemy także poprawki stylistyczne, usuwając środki ekspresji słownej oraz dodając terminologię specjalistyczną. Dopracowana forma zwiększy Twoją szansę na akceptację tekstu przez promotora i recenzentów.",
      },
    ],
  },
  {
    id: 4,
    image: image4,
    header: (
      <>
        <mark>Usługi dla</mark> firm i instytucji
      </>
    ),
    captions: [
      {
        id: 1,
        content:
          "Współczesne zarządzanie firmą wiąże się z koniecznością prowadzenia aktywnej działalności w Internecie. Niezależnie od tego, w jakiej branży działasz, przekonujące opisy prezentowanych produktów i usług zwiększają Twoją szansę na sukces i pomnożenie przychodów.",
      },
      {
        id: 2,
        content:
          "Publikowane treści, wolne od błędów i nieścisłości, zbudują profesjonalny wizerunek przedsiębiorstwa. Sprawdzimy specjalistyczne treści, które staną się najlepszą wizytówką prowadzonej przez Ciebie działalności, stawiając Cię w pozycji eksperta, któremu można zaufać.",
      },
    ],
  },
];

const Section20 = () => {
  return (
    <section className={`${styles.section}`}>
      {articles.map((articleData) => {
        const { id, image, header, captions } = articleData;

        return (
          <article key={id}>
            <div className={`${styles.wrapper}`} role="img">
              <Image src={image} alt="Zdjęcie artykułu"></Image>
            </div>
            <h2>{header}</h2>
            {captions.map((captionData, index) => {
              const { id, content } = captionData;

              return (
                <p key={id} className={`${styles.caption} ${index === 0 ? styles.bold : ""}`}>
                  {content}
                </p>
              );
            })}
          </article>
        );
      })}
    </section>
  );
};

export default Section20;
