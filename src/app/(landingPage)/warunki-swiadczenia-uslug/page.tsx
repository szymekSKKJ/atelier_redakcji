import styles from "./styles.module.scss";
import logoImage from "../../../../public/logo.svg";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ogólne warunki świadczenia usług - Atelier redakcji tekstu",
  description: "Ogólne warunki świadczenia usług",
};

const data = [
  {
    id: 1,
    title: <>ZAWARCIE UMOWY (WYCENA I PROCEDURA)</>,
    content: (
      <>
        <ol>
          <li>
            W celu skorzystania z naszych usług, należy wypełnić formularz na naszej stronie internetowej (https://www.atelier-redakcji.eu) i złożyć zapytanie o
            ofertę. W ramach zapytania będzie trzeba zamieścić swoje imię i adres e-mail (względnie numer telefonu).
          </li>
          <li>
            Po zapoznaniu się z pytaniem, w odpowiedzi na zapytanie potwierdzimy możliwość wykonania usługi i poprosimy Państwa o przesłanie tekstu mającego
            podlegać korekcie, w celu wykonania dokładnej wyceny (o ile tekst już uprzednio nie został dostarczony).
          </li>
          <li>Sporządzenie wyceny jest bezpłatne. Informacje zawarte w ramach wyceny są niezobowiązujące i w żaden sposób nie obligują do zawarcia umowy.</li>
          <li>
            Wycenę prześlemy Państwu w formie wiadomości e-mail (na adres podany w formularzu kontaktowym). Zawiera ona informację o wynagrodzeniu brutto oraz
            wskazanie terminu oddania poprawionego tekstu.
          </li>
          <li>Wyceny w godz. od 8 do 15 w dni robocze sporządzane są niezwłocznie, nie później niż na drugi dzień roboczy.</li>
          <li>
            Rozliczenie nastąpi również w sposób uzgodniony z Państwem przed zawarciem umowy, w ramach wyceny. Zazwyczaj wymagamy dokonania przedpłaty, ale
            możliwa jest również płatność częściowa lub w późniejszym terminie w drodze wyjątku.
          </li>
          <li>Po zaakceptowaniu wyceny otrzymają od nas Państwo fakturę proformę z danymi do dokonania płatności. </li>
          <li>
            Zastrzegamy, że ewentualny brak terminowej zapłaty uprawnia nas do zawieszenia wykonywania zlecenia albo wydłużenia jego realizacji o czas
            oczekiwania na płatność. Po otrzymaniu opóźnionej płatności zastrzegamy sobie prawo ustalenia nowych terminów realizacji danego zlecenia, mając na
            uwadze obciążenie innymi zleceniami.
          </li>
          <li>
            Wysokość naszego wynagrodzenia jest obliczana na podstawie liczby stron rozliczeniowych tekstu źródłowego, jego stopnia skomplikowania oraz zakresu
            prac, jakie mają być wykonane. Jedna standardowa strona rozliczeniowa to 1800 znaków ze spacjami (liczba znaków jest obliczana przy pomocy
            odpowiednich funkcji edytora tekstu).
          </li>
          <li>
            Wycena jest aktualna przez 30 dni od dnia jej dokonania i przekazania Państwu. Po upływie tego czasu macie Państwo obowiązek wystąpić o wykonanie
            nowej wyceny, w celu skorzystania z usługi.
          </li>
          <li>
            Informacje o dostępnych usługach na stronie internetowej https://www.atelier-redakcji.eu stanowią zaproszenie do zawarcia umowy w rozumieniu art. 71
            Kodeksu cywilnego.
          </li>
          <li>
            Wyrażając zgodę na wycenę i prosząc o wykonanie usługi, składacie Państwo zaproszenie do zawarcia umowy wykonania usługi o parametrach zgodnych z
            tymi przedstawionymi w wycenie.
          </li>
          <li>
            Wysłane przez nas potwierdzenia rozpoczęcia wykonywania usługi na podany przez Państwa adres e-mail stanowi oświadczenie o przyjęciu zaproszenia, o
            którym mowa powyżej
          </li>
          <li>
            W celu dokonania zakupu jako przedsiębiorca, zobowiązujemy Państwa do podania numeru NIP przed sporządzeniem wyceny, w przeciwnym razie przyjmuje
            się, że kupujecie Państwo jako konsumenci.
          </li>
          <li>
            Ocena, czy Klient będący przedsiębiorcą wpisanym do rejestru CEIDG ma status Przedsiębiorcy o uprawnieniach konsumenta, jest dokonywana przez nas w
            stosunku do indywidualnego przypadku oraz w oparciu o ewentualne Państwa oświadczenia złożone w toku sporządzania i akceptacji wyceny.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 2,
    title: <>REDAKCJA I KOREKTA TEKSTU (OBOWIĄZKI STRON)</>,
    content: (
      <>
        <ol>
          <li>
            Przedmiotem zlecenia może być w szczególności:
            <ol type="a" style={{ marginLeft: "25px", marginTop: "25px" }}>
              <li>przeprowadzenie ogólnej redakcji i/lub korekty dokumentu</li>
              <li>korekta błędów językowych</li>
              <li>redakcja błędów ortograficznych</li>
              <li>korekta interpunkcji</li>
              <li>usunięcie błędów fleksyjnych, składniowych i leksykalnych</li>
              <li>poprawa układu tekstu i jego formatowanie</li>
              <li>przygotowanie tekstu do korekty wydawniczej,</li>
              Dokładny spis wszystkich świadczonych przez nas usług znajduje się na naszej stronie internetowej. Przy czym istnieje możliwość świadczenia przez
              nas usług niestandardowych w odniesieniu do danego tekstu. W tym celu prosimy o uprzedni kontakt w celu ustalenia, czy dana usługa jest możliwa do
              wykonania.
            </ol>
          </li>
          <li>
            Usługi realizowane są z wykorzystaniem oprogramowania Microsoft Word w najnowszej wersji. W związku z tym zastrzegamy, że nie jesteśmy w stanie
            zagwarantować kompatybilności wyników świadczonych przez nas usług ze starszymi wersjami oprogramowania Word ze względu na kwestie techniczne od nas
            niezależne.
          </li>
          <li>
            Komunikacja z Państwem odbywa się drogą e-mailową. Względnie, w szczególnych wypadkach, komunikacja może odbywać się także za pomocą innych środków,
            zwłaszcza telefonicznie
          </li>
          <li>
            Nasze usługi mogą zostać wykonane także za pomocą redaktorów/korektorów z nami współpracujących. Bierzemy pełną odpowiedzialność za sposób i efekty
            realizacji usługi przez zewnętrznych redaktorów/korektorów.
          </li>
          <li>
            Zobowiązujemy się nie ujawniać osobom trzecim (poza podwykonawcami określonych prac związanych z wykonaniem zlecenia głównego) informacji i
            dokumentów związanych z realizacją zlecenia.
          </li>
          <li>
            W przypadku gdy tekst zawiera fragmenty napisane w innym języku niż język polski i nie będące przy tym cytatami, fragmenty te nie wchodzą w zakres
            usługi, chyba że zostało to z nami uzgodnione i przewidziane w ramach wyceny.
          </li>
          <li>
            Korzystając z naszych usług oświadczacie Państwo, że jesteście świadomi faktu, że ten sam tekst może zostać poprawiony na różne sposoby przez różne
            osoby, co oznacza, że decyzje podejmowane w związku z korektą przez redaktora/korektora co do poprawności i spójności są konieczne, i z uwagi na
            dużą ich liczbę muszą być podejmowane samodzielnie przez redaktora/korektora, bez konieczności każdorazowego pytania Państwa o zgodę. Powyższe nie
            stanowi w żadnym momencie podstawy do reklamacji, tak długo jak zastosowane rozwiązanie jest poprawne językowo.
          </li>
          <li>
            Zastrzegamy, że nie ponosimy jakiejkolwiek odpowiedzialności za treść tekstu lub za jego wykorzystanie. Nasza odpowiedzialność ogranicza się
            wyłącznie do odpowiedniego przygotowania tekstu pod kątem redakcyjnym, językowym i technicznym, zgodnie z poczynionymi ustaleniami.
          </li>
          <li>
            W przypadku gdyby konieczna była istotna ingerencja w poprawiany tekst, nasz redaktor/korektor może w komentarzu na marginesie – zamiast nanoszenia
            poprawki bezpośrednio w tekście - przedstawić swoją propozycję poprawki. Poprawki z komentarzy możecie Państwo następnie samodzielnie nanieść w
            tekście lub ustosunkować się do nich i zlecić ich wprowadzenie naszemu redaktorowi/korektorowi w ramach wynagrodzenia podanego w wycenie.
          </li>
          <li>
            Redaktor/korektor dokonujący korekty dołoży wszelkich starań, by poprawiony tekst był logiczny i spójny oraz posiadał jednolitą stylistykę. Błędy
            logiczne, rzeczowe i merytoryczne usuwane są tylko w zakresie tzw. wiedzy uniwersalnej, tj. takiej, jaką dysponuje przeciętny człowiek,
            niespecjalizujący się w dziedzinie wiedzy, której dotyczy tekst.
          </li>
          <li>
            W przypadku tekstu w formacie PDF usługa realizowana jest wyłącznie poprzez nanoszenie na marginesie znaków korektorskich oraz stosownych
            komentarzy. W razie potrzeby wyjaśnimy Państwu znaczenie poszczególnych znaków korektorskich. Względnie możliwe jest stworzenie edytowalnej wersji
            pliku w formacie .doc lub .docx, co jednak wiąże się z dodatkową opłatą.
          </li>
          <li>
            Pod kątem praw autorskich, korzystanie z naszych usług wiąże się z wyrażeniem przez Państwa zgody na wykonywanie technicznych zmian w tekście, bez
            zmian jego treści oraz z deklaracją, że takie nasze działanie nie narusza żadnych uprawnień osób trzecich co do tekstu. W przypadku jakichkolwiek
            roszczeń wysuwanych wobec nas przez osoby trzecie w związku z świadczeniem naszych usług w odniesieniu do danego tekstu, zobowiązujecie się Państwo
            do zwolnienia nas od jakiejkolwiek odpowiedzialności z tego tytułu, wsparcia nas w ramach ewentualnego procesu jak również do kompensacji
            poniesionych przez nas z tego tytułu wydatków.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 3,
    title: <>WYKONANIE USŁUG, W TYM TERMIN REALIZACJI</>,
    content: (
      <>
        <ol>
          <li>
            Termin realizacji usługi wskazany jest Państwu w ramach wyceny do akceptacji. Termin określony jest w dniach roboczych, niezbędnych do wykonania
            usługi i rozpoczyna się od momentu przesłania tekstu do redakcji w umówionej formie oraz zaksięgowania płatności
          </li>
          <li>Jesteśmy otwarci na Państwa propozycje, jeśli chodzi o termin wykonania usługi w ramach negocjacji przed zawarciem umowy.</li>
          <li>
            Do terminu realizacji zlecenia nie wliczamy jednak czasu oczekiwania na otrzymanie od Państwa informacji lub dokumentów niezbędnych do realizacji
            usługi (np. odniesienia się do komentarzy w przesłanej przez nas wersji dokumentu).
          </li>
          <li>
            Termin wykonania usługi może ulec przedłużeniu w trakcie wykonywania usługi. W takiej sytuacji, przed upływem wyznaczonego uprzednio terminu,
            poinformujemy Państwa o nowym terminie zakończenia wykonywania korekty oraz podamy przyczynę niezachowania terminu. W takim przypadku będziecie
            Państwo mieć możliwość zdecydowania, czy godzicie się na nowy termin, czy też odstępujecie od umowy (w całości lub w części za przekazanie części
            wykonanej pracy). W przypadku odstąpienia od umowy otrzymacie Państwo zwrot wszelkich opłat (lub części w przypadku ustalonego częściowego
            odstąpienia), w postaci przelewu zwrotnego na numer konta, z którego nadeszła płatność.
          </li>
          <li>
            Termin wykonania usługi może ulec wydłużeniu w szczególności ze względu na niską jakość tekstu, wymagającą większej liczby poprawek, niż to
            pierwotnie oszacowaliśmy.
          </li>
          <li>
            Poprawiony tekst, wraz z komentarzami, zostanie przesłany Państwu w formie korespondencji elektronicznej (e-mail lub poprzez oprogramowanie dla
            dużych plików).
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 4,
    title: <>REKLAMACJE</>,
    content: (
      <>
        <ol>
          <li>
            Jesteśmy zobowiązani do wydania towaru bez wad i do należytego świadczenia usług. W przypadku umów zawieranych z konsumentami oraz przedsiębiorcami
            o uprawnieniach konsumenta, ponosimy odpowiedzialność z tytułu rękojmi. Jest ona wyłączona w stosunku do Klienta o pozostałym statusie.
          </li>
          <li>
            W celu złożenia reklamacji należy poinformować nas o zaobserwowanych wadach, udokumentować je celem dokonania weryfikacji zastrzeżeń oraz
            ewentualnego usunięcia wad.
          </li>
          <li>
            Niezwłocznie, jednak nie później niż w terminie 14 dni od daty otrzymania zgłoszenia reklamacyjnego, zajmiemy stanowisko co do złożonej reklamacji i
            poinformujemy o dalszym postępowaniu (za pośrednictwem poczty elektronicznej na adres poczty elektronicznej podany w zgłoszeniu reklamacyjnym).
          </li>
          <li>
            W przypadku zaistnienia sporu pomiędzy nami a Państwem co do zasadności odmowy uwzględnienia reklamacji, Klientowi będącemu Konsumentem przysługuje
            prawo skorzystania z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń. Możecie Państwo skorzystać z mediacji lub też
            polubownego sądownictwa poprzez dostarczenie do instytucji, przed którą będzie toczyło się postępowanie, odpowiedniego formularza – wniosku o
            mediację lub wniosku o rozpatrzenie sprawy przed sądem polubownym. Lista przykładowych instytucji wraz z danymi teleadresowymi dostępna jest na
            stronie www.uokik.gov.pl. Ponadto pod adresem http://ec.europa.eu/consumers/odr Konsument ma dostęp do rozstrzygania sporów konsumenckich drogą
            elektroniczną za pomocą unijnej platformy internetowej (platforma ODR). Prawo takie nie przysługuje Przedsiębiorcy o uprawnieniach konsumenta. W
            przypadku Klientów zagranicznych powinni oni zorientować się, jakie mają sposoby pozasądowego rozstrzygania sporów konsumenckich w swoim kraju, a my
            w razie konieczności przystąpimy do takiej procedury.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 5,
    title: <>PRAWO ODSTĄPIENIA OD UMOWY</>,
    content: (
      <>
        <ol>
          <li>
            Informujemy, iż prawo odstąpienia od umowy zawartej na odległość nie przysługuje Konsumentowi lub Przedsiębiorcy o uprawnieniach konsumenta w
            odniesieniu do umów o świadczenie usług, jeżeli przedsiębiorca wykonał w pełni usługę za wyraźną zgodą konsumenta, który został poinformowany przed
            rozpoczęciem świadczenia, że po spełnieniu świadczenia przez przedsiębiorcę utraci prawo odstąpienia od umowy.
          </li>
          <li>
            Wobec ust. 1, podajemy, że akceptacja warunków współpracy zawierających termin wykonania usługi przed upływem terminu do odstąpienia od umowy jest
            równoznaczna z żądaniem do rozpoczęcia wykonania usługi, co może oznaczać, że prawo do odstąpienia od umowy zostanie utracone lub wymagane będzie
            rozliczenie jak w ust. 3.
          </li>
          <li>
            W przypadku terminu rozpoczęcia wykonania usługi krótszego niż 14 dni od zawarcia umowy i skutecznego odstąpienia od umowy, macie Państwo obowiązek
            zapłaty za świadczenia spełnione do chwili odstąpienia od umowy. Kwotę zapłaty oblicza się proporcjonalnie do zakresu spełnionego świadczenia, z
            uwzględnieniem uzgodnionego w wycenie wynagrodzenia.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 6,
    title: <>PRAWA AUTORSKIE</>,
    content: (
      <>
        <ol>
          <li>
            Wszystkie materiały umieszczone na stronie https://www.atelier-redakcji.eu są chronione prawami autorskimi na mocy przepisów ustawy z dnia 4 lutego
            1994 r. o prawie autorskim i prawach pokrewnych.
          </li>
          <li>
            Właściciel autorskich praw majątkowych zastrzega, w rozumieniu art. 25 ust. 1 pkt. 1 ustawy z dnia 4 lutego 1994 r. o prawie autorskim i prawach
            pokrewnych, że dalsze rozpowszechnianie materiałów opublikowanych na stronie https://www.atelier-redakcji.eu jest zabronione niezależnie od celu, w
            jakim rozpowszechnienie miałoby nastąpić oraz niezależnie od użytego środka przekazu.
          </li>
          <li>
            Zabrania się kopiowania i rozpowszechniania zamieszczonych na stronie https://www.atelier-redakcji.eu grafik, tekstów, banerów, znaków itp. pod
            groźbą sankcji prawnych.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 7,
    title: <>OCHRONA DANYCH OSOBOWYCH</>,
    content: (
      <>
        Postanowienia dotyczące ochrony Państwa danych osobowych znajdują się w Polityce ochrony prywatności i cookies zamieszczonej na naszej stronie
        internetowej.
      </>
    ),
  },
  {
    id: 8,
    title: <>POUFNOŚĆ I TAJEMNICA INFORMACJI</>,
    content: (
      <>
        <ol>
          <li>
            W ramach świadczenia usług zobowiązują się Państwo do zachowania w tajemnicy wszelkich informacji oraz danych przekazanych przez nas ustnie, na
            piśmie lub zapisanych w inny sposób, a przekazanych w ramach wykonywanej Umowy lub na jej potrzeby oraz stanowiących tajemnicę przedsiębiorstwa.
          </li>
          <li>
            Zobowiązują się Państwo do zachowania poufności, a w szczególności nie udostępniania osobom trzecim, firmom informacji handlowych, kosztach naszych
            usług oraz wszelkich innych danych mogących zostać wykorzystane przez konkurencję.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 9,
    title: <>POSTANOWIENIA KOŃCOWE</>,
    content: (
      <>
        <ol>
          <li>
            Prawem właściwym jest prawo polskie. Spory wynikłe pomiędzy Państwem a nami będą rozstrzygane przez sąd właściwy dla naszej siedziby, z tym
            zastrzeżeniem, że w odniesieniu do konsumentów spory te będą rozpoznawane przed sądem właściwym według przepisów postępowania cywilnego. Niniejsze
            warunki podlegają przepisom prawa polskiego i zgodnie z nimi będą interpretowane. Niniejsze warunki nie ograniczają żadnych praw konsumentów do
            ochrony, które mogą im przysługiwać zgodnie z bezwzględnie obowiązującymi przepisami w kraju jego zamieszkania.
          </li>
          <li>
            Zastrzegamy sobie prawo do zmiany powyższych warunków w każdym czasie. Usługi zlecone przed datą wejścia w życie zmian do niniejszych warunków są
            realizowane na podstawie postanowień obowiązujących w dniu zawarcia umowy z Państwem.
          </li>
        </ol>
      </>
    ),
  },
];

const termsOfService = () => {
  return (
    <div className={`${styles.terms_of_service}`}>
      <div className={`${styles.imageWrapper}`}>
        <Image src={logoImage} alt="Zdjęcie logo"></Image>
      </div>
      <h1 style={{ textAlign: "center" }}>OGÓLNE WARUNKI ŚWIADCZENIA USŁUG (OWU)</h1>
      <h2>przez Atelier redakcji tekstu</h2>
      <div className={`${styles.content}`}>
        <p>
          Niniejsze warunki - w razie podjęcia decyzji o współpracy - będą regulować zasady, na jakich nastąpi przyjęcie, wykonanie i rozliczenie zlecenia, a
          także kwestie naszej odpowiedzialności. O ile nie dokonamy indywidualnych ustaleń, warunki te znajdą zastosowanie. W przypadku dokonania
          indywidualnych ustaleń mają one pierwszeństwo przed OWU.
        </p>
        <p>
          Dane podmiotu świadczącego usługi: <br></br> Korektapress Małgorzata Frąckowiak <br></br> ul. gen. Władysława Bortnowskiego 5/12 <br></br> 85-793
          Bydgoszcz <br></br> NIP: 9532496443 <br></br> REGON: 340703994
        </p>

        <ul>
          Kontakt z nami można także uzyskać:
          <li>
            pod numerem telefonu: +48 799 163 609 (godziny pracy 8-16 w dni robocze, opłata jak za zwykłe połączenie telefoniczne, zgodnie z pakietem taryfowym
            dostawcy usług, z którego Państwo korzystają),
          </li>
          <li>korzystając z adresu poczty elektronicznej - kontakt@atelier-redakcji.eu,</li>
          <li>za pomocą formularza kontaktowego na stronie.</li>
        </ul>
        <p>
          Naszą ofertą jest wykonywanie usług edytorskich i pisarskich, takich jak: redakcja, korekta i formatowanie tekstu. Poniżej znajdują się warunki
          świadczenia tych usług.
        </p>
        {data.map((chapter) => {
          const { id, title, content } = chapter;
          return (
            <div key={id}>
              <h3>{title}</h3>
              <div className={`${styles.content}`}>{content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default termsOfService;
