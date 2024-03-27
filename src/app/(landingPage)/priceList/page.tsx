import Section10 from "@/components/sections/Section10/Section10";
import Section11 from "@/components/sections/Section11/Section11";
import Section22 from "@/components/sections/Section22/Section22";
import Section23 from "@/components/sections/Section23/Section23";
import Section24 from "@/components/sections/Section24/Section24";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier redakcji - cennik",
  description: "Cennik",
};

const priceList = () => {
  return (
    <>
      <Section22></Section22>
      <main>
        <Section23></Section23>
      </main>
      <Section24></Section24>
      <Section10></Section10>
      <Section11></Section11>
    </>
  );
};

export default priceList;
