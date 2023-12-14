import CustomOfferForm from "@/components/Forms/CustomOfferForm/CustomOfferForm";
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
import { sectionsContentData, defaultOfferType } from "./page";

export const OfferType = ({ params }: { params: { offerType: string } }) => {
  const matchingParamsToAvailableOfferType = sectionsContentData.find((data) => data.key === params.offerType);

  if (matchingParamsToAvailableOfferType) {
    return (
      <>
        <main>
          <Section27 sectionData={matchingParamsToAvailableOfferType.section27}></Section27>
        </main>
        <Section28 sectionData={matchingParamsToAvailableOfferType.section28}></Section28>
        <Section29 sectionData={matchingParamsToAvailableOfferType.section29}></Section29>
        <Section30></Section30>
        {matchingParamsToAvailableOfferType.section31 && <Section31 sectionData={matchingParamsToAvailableOfferType.section31}></Section31>}
        <Section8></Section8>
        <Section17></Section17>
        <Section6></Section6>
        <Section5></Section5>
        <Section9></Section9>
        <Section10></Section10>
        <Section11></Section11>
      </>
    );
  } else {
    return (
      <>
        <main>
          <Section27 sectionData={defaultOfferType}></Section27>
        </main>
        <CustomOfferForm></CustomOfferForm>
      </>
    );
  }
};
