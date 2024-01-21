import styles from "./styles.module.scss";
import check from "../../../../public/check.svg";
import incorrect from "../../../../public/incorrect.svg";
import Image from "next/image";
import arrow from "../../../../public/arrow.svg";
import info from "../../../../public/info.svg";
import Link from "next/link";

const ArrowIcon = () => {
  return (
    <div className={`${styles.arrow_icon}`} role="group">
      <Image src={arrow} alt="Ikonka strzałki"></Image>
      <Image src={arrow} alt="Ikonka strzałki"></Image>
    </div>
  );
};

const Section23 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.wrapper}`}>
          <table>
            <thead>
              <tr>
                <th>Zakres zlecenia</th>
                <th>Korekta tekstu</th>
                <th>Redakcja tekstu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Błędy ortograficzne</td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
              </tr>
              <tr>
                <td>Błędy gramatyczne</td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
              </tr>
              <tr>
                <td>Błędy interpunkcyjne</td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
              </tr>
              <tr>
                <td>Błędy fleksyjne</td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
              </tr>
              <tr className={`${styles.separator}`}></tr>
              <tr>
                <td>Błędy frazeologiczne</td>
                <td>
                  <Image src={incorrect} alt="Ikona zaprzeczenia"></Image>
                </td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
              </tr>
              <tr>
                <td>Błędy składniowe</td>
                <td>
                  <Image src={incorrect} alt="Ikona potwierdzenia"></Image>
                </td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
              </tr>
              <tr>
                <td>Błędy leksykalne</td>
                <td>
                  <Image src={incorrect} alt="Ikona potwierdzenia"></Image>
                </td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
              </tr>
              <tr>
                <td>Błędy stylistyczne</td>
                <td>
                  <Image src={incorrect} alt="Ikona potwierdzenia"></Image>
                </td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
              </tr>
              <tr>
                <td>Błędy logiczne</td>
                <td>
                  <Image src={incorrect} alt="Ikona potwierdzenia"></Image>
                </td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
              </tr>
              <tr>
                <td>Błędy kompozycyjne</td>
                <td>
                  <Image src={incorrect} alt="Ikona potwierdzenia"></Image>
                </td>
                <td>
                  <Image src={check} alt="Ikona potwierdzenia"></Image>
                </td>
              </tr>
              <tr className={`${styles.separator}`}></tr>
              <tr className={`${styles.summary}`}>
                <td>Cena:</td>
                <td>
                  Korekta tekstu już od:
                  <p>
                    9 zł <br></br> <span>brutto/str.</span>
                  </p>
                  <p>(1800 znaków ze spacją)</p>
                </td>
                <td>
                  Korekta tekstu już od:
                  <p>
                    12 zł <br></br> <span>brutto/str.</span>
                  </p>
                  <p>(1800 znaków ze spacją)</p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={`${styles.wrapper}`}>
            <table className={`${styles.mobile1}`}>
              <thead>
                <tr>
                  <th colSpan={2}>Korekta tekstu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Błędy ortograficzne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy gramatyczne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy interpunkcyjne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy fleksyjne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr className={`${styles.separator}`}></tr>
                <tr>
                  <td>Błędy frazeologiczne</td>
                  <td>
                    <Image src={incorrect} alt="Ikona zaprzeczenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy składniowe</td>
                  <td>
                    <Image src={incorrect} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy leksykalne</td>
                  <td>
                    <Image src={incorrect} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy stylistyczne</td>
                  <td>
                    <Image src={incorrect} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy logiczne</td>
                  <td>
                    <Image src={incorrect} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy kompozycyjne</td>
                  <td>
                    <Image src={incorrect} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr className={`${styles.separator}`}></tr>
                <tr className={`${styles.summary}`}>
                  <td colSpan={2}>
                    Korekta tekstu już od:
                    <p>
                      9 zł <br></br> <span>brutto/str.</span>
                    </p>
                    <p>(1800 znaków ze spacją)</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={`${styles.wrapper}`}>
            <table className={`${styles.mobile2}`}>
              <thead>
                <tr>
                  <th colSpan={2}>Redakcja tekstu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Błędy ortograficzne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy gramatyczne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy interpunkcyjne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy fleksyjne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr className={`${styles.separator}`}></tr>
                <tr>
                  <td>Błędy frazeologiczne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy składniowe</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy leksykalne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy stylistyczne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy logiczne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr>
                  <td>Błędy kompozycyjne</td>
                  <td>
                    <Image src={check} alt="Ikona potwierdzenia"></Image>
                  </td>
                </tr>
                <tr className={`${styles.separator}`}></tr>
                <tr className={`${styles.summary}`}>
                  <td colSpan={2}>
                    Korekta tekstu już od:
                    <p>
                      12 zł <br></br>
                      <span>brutto/str.</span>
                    </p>
                    <p>(1800 znaków ze spacją)</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <article className={`${styles.other_services}`}>
          <h2>Dodatkowe usługi</h2>
          <article>
            <p className={`${styles.title}`}>
              Formatowanie pracy <br></br>
              <span>(font, marginesy, interlinie itd.)</span>
            </p>
            <p className={`${styles.price}`}>
              od{" "}
              <mark>
                <em>250 zł</em> brutto
              </mark>
            </p>
          </article>
          <article>
            <p className={`${styles.title}`}>Opracowanie spisu treści, tabel, rysunków, rycin itd.</p>
            <p className={`${styles.price}`}>
              od{" "}
              <mark>
                <em>250 zł</em> brutto
              </mark>
            </p>
          </article>
          <article>
            <p className={`${styles.title}`}>Opracowanie bibliografii</p>
            <p className={`${styles.price}`}>
              od{" "}
              <mark>
                <em>250 zł</em> brutto
              </mark>
            </p>
          </article>
          <article>
            <p className={`${styles.title}`}>Opracowanie aparatu przypisów</p>
            <p className={`${styles.price}`}>
              od{" "}
              <mark>
                <em>250 zł</em> brutto
              </mark>
            </p>
          </article>
        </article>
        <article className={`${styles.monthly_subscription}`}>
          <p>
            <mark>Miesięczny abonament</mark> na poprawę treści
          </p>
          <div className={`${styles.wrapper}`}>
            <p>Wycena indywidualna</p>
            <Link href="/contact">
              Zapytaj mailowo <ArrowIcon></ArrowIcon>
            </Link>
          </div>
        </article>
        <article className={`${styles.additional_information}`}>
          <Image src={info} alt="Ikona informacji"></Image>
          <div className={`${styles.wrapper}`} role="group">
            <p className={`${styles.caption1}`}>Ze względu na różnorodność zleceń, dokładną cenę zawsze ustalamy indywidualnie z Klientem</p>
            <p className={`${styles.caption2}`}>
              Do każdego zlecenia wystawiamy fakturę bez VAT (wartość netto = brutto), ponieważ nie jesteśmy płatnikami podatku VAT.
            </p>
            <p className={`${styles.caption3}`}>
              Informacje zawarte w niniejszej witrynie nie są prawnie wiążące i nie stanowią oferty handlowej w rozumieniu art. 66 §1 Kodeksu cywilnego, są one
              jedynie zaproszeniem do zawarcia umowy.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Section23;
