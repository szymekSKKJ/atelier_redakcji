import Section10 from "@/components/sections/Section10/Section10";
import Section11 from "@/components/sections/Section11/Section11";
import Section8 from "@/components/sections/Section8/Section8";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier redakcji - faq",
  description: "Pytania i odpowiedzi",
};

const Faq = () => {
  return (
    <>
      <Section8 isFaqPage={true}></Section8>
      <Section10></Section10>
      <Section11></Section11>
    </>
  );
};

export default Faq;
