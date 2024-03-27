import Section1 from "@/components/sections/Section1/Section1";
import Section2 from "@/components/sections/Section2/Section2";
import Section12 from "@/components/sections/Section12/Section12";
import Section3 from "@/components/sections/Section3/Section3";
import Section4 from "@/components/sections/Section4/Section4";
import Section5 from "@/components/sections/Section5/Section5";
import Section6 from "@/components/sections/Section6/Section6";
import Section7 from "@/components/sections/Section7/Section7";
import Section8 from "@/components/sections/Section8/Section8";
import Section9 from "@/components/sections/Section9/Section9";
import Section10 from "@/components/sections/Section10/Section10";
import Section11 from "@/components/sections/Section11/Section11";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier redakcji - strona główna",
  description: "Strona główna",
};

const Home = () => {
  return (
    <>
      <main>
        <Section12></Section12>
      </main>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4>
      <Section5></Section5>
      <Section6></Section6>
      <Section7></Section7>
      <Section8></Section8>
      <Section9></Section9>
      <Section10></Section10>
      <Section11></Section11>
    </>
  );
};

export default Home;
