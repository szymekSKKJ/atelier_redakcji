import Section10 from "@/components/sections/Section10/Section10";
import Section25 from "@/components/sections/Section25/Section25";
import Section26 from "@/components/sections/Section26/Section26";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier redakcji - kontakt",
  description: "Kontakt",
};

const Contact = () => {
  return (
    <>
      <Section10></Section10>
      <Section25></Section25>
      <Section26></Section26>
    </>
  );
};

export default Contact;
