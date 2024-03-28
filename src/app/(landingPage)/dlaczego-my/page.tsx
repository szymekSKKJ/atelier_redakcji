import Section13 from "@/components/sections/Section13/Section13";
import Section14 from "@/components/sections/Section14/Section14";
import Section15 from "@/components/sections/Section15/Section15";
import Section16 from "@/components/sections/Section16/Section16";
import Section17 from "@/components/sections/Section17/Section17";
import Section6 from "@/components/sections/Section6/Section6";
import Section18 from "@/components/sections/Section18/Section18";
import Section5 from "@/components/sections/Section5/Section5";
import Section10 from "@/components/sections/Section10/Section10";
import Section11 from "@/components/sections/Section11/Section11";
import Section9 from "@/components/sections/Section9/Section9";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier redakcji - dlaczego my",
  description: "Dlaczego my",
};

const WhyUs = () => {
  return (
    <>
      <main>
        <Section13></Section13>
      </main>
      <Section14></Section14>
      <Section15></Section15>
      <Section16></Section16>
      <Section17></Section17>
      <Section6></Section6>
      <Section18></Section18>
      <Section5></Section5>
      <Section9 style={{ marginTop: "0px" }}></Section9>
      <Section10></Section10>
      <Section11></Section11>
    </>
  );
};

export default WhyUs;
