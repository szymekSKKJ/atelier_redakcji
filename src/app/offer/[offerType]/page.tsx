import Section10 from "@/components/sections/Section10/Section10";
import Section11 from "@/components/sections/Section11/Section11";
import Section17 from "@/components/sections/Section17/Section17";
import Section27 from "@/components/sections/Section27/Section27";
import Section28 from "@/components/sections/Section28/Section28";
import Section29 from "@/components/sections/Section29/Section29";
import Section30 from "@/components/sections/Section30/Section30";
import Section31 from "@/components/sections/Section31/Section31";
import Section5 from "@/components/sections/Section5/Section5";
import Section6 from "@/components/sections/Section6/Section6";
import Section8 from "@/components/sections/Section8/Section8";
import Section9 from "@/components/sections/Section9/Section9";

const availableOfferTypes = [
  "prace-licenjcackie",
  "prace-inzynierskie",
  "prace-magisterskie",
  "prace-doktorskie-i-habilitacyjne",
  "prace-zaliczeniowe",
  "prace-dyplomowe",
  "publikacje-naukowe",
  "teksty-specjalistyczne",
  "inny-tekst",
];

const OfferType = ({ params }: { params: { offerType: string } }) => {
  const matchingParamToAvailableOfferTypes = availableOfferTypes.find((type) => type === params.offerType);

  if (matchingParamToAvailableOfferTypes) {
    return (
      <>
        <main>
          <Section27 type={matchingParamToAvailableOfferTypes}></Section27>
          <Section28></Section28>
          <Section29></Section29>
          <Section30></Section30>
          <Section31></Section31>
          <Section8></Section8>
          <Section17></Section17>
          <Section6></Section6>
          <Section5></Section5>
          <Section9></Section9>
          <Section10></Section10>
          <Section11></Section11>
        </main>
      </>
    );
  }
};

export default OfferType;
