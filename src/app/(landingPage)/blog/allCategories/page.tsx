import { blogGetSome } from "@/app/api/blog/get/some/route";
import styles from "./styles.module.scss";
import Article from "@/components/allCategoriesPage/Article/Article";
import Section13 from "@/components/sections/Section13/Section13";
import Section11 from "@/components/sections/Section11/Section11";
import Button from "@/components/UI/Button/Button";

const allCategoriesPage = async () => {
  const { data } = await blogGetSome();

  return (
    <div className={`${styles.allCategoriesPage}`}>
      <h1>Wszystkie artykuły</h1>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.articles}`}>
          {data &&
            data.map((data, index, array) => {
              const { id } = data;

              if (index === (array.length - 1) / 2) {
                return (
                  <>
                    <Section13 allCategoriesPage={true}></Section13>
                    <Article key={id} data={data}></Article>
                  </>
                );
              } else {
                return <Article key={id} data={data}></Article>;
              }
            })}
        </div>
        <div className={`${styles.wrapper}`}>
          <aside>
            <h3>Kategorie</h3>
            <p>Prace licencjackie</p>
            <p className={`${styles.choosen}`}>Prace inżynierskie</p>
            <p>Prace inżynierskie</p>
            <p>Prace doktorskie i habilitacyjne</p>
            <p>Prace zaliczeniowe</p>
            <p>Prace dyplomowe</p>
            <p>Prace naukowe</p>
            <p>Prace specjalistyczne</p>
            <p>Inne teksty</p>
          </aside>
          <Section13 allCategoriesPage={true}></Section13>
        </div>
      </div>
      <Button style={{ padding: "20px 30px 20px 30px", margin: "40px auto 40px auto", alignSelf: "flex-start" }}>Pokaż więcej artykułów</Button>
      <Section11 type="blog"></Section11>
    </div>
  );
};

export default allCategoriesPage;
