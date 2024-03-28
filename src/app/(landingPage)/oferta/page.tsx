import Section10 from "@/components/sections/Section10/Section10";
import Section11 from "@/components/sections/Section11/Section11";
import Section17 from "@/components/sections/Section17/Section17";
import Section19 from "@/components/sections/Section19/Section19";
import Section20 from "@/components/sections/Section20/Section20";
import Section21 from "@/components/sections/Section21/Section21";
import Section4 from "@/components/sections/Section4/Section4";
import Section5 from "@/components/sections/Section5/Section5";
import Section6 from "@/components/sections/Section6/Section6";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier redakcji - oferta",
  description: "Oferta",
};

const Offer = () => {
  return (
    <>
      <Section19></Section19>
      <Section20></Section20>
      <Section4></Section4>
      <Section21></Section21>
      <Section17></Section17>
      <Section6></Section6>
      <Section5></Section5>
      <Section10></Section10>
      <Section11></Section11>
    </>
  );
};

export default Offer;
