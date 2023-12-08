import Section13 from "@/components/sections/Section13/Section13";
import styles from "./styles.module.scss";
import Section14 from "@/components/sections/Section14/Section14";
import Section15 from "@/components/sections/Section15/Section15";
import Section16 from "@/components/sections/Section16/Section16";
import Section17 from "@/components/sections/Section17/Section17";
import Section6 from "@/components/sections/Section6/Section6";
import Section18 from "@/components/sections/Section18/Section18";

const WhyUs = () => {
  return (
    <div className={`${styles.why_us}`}>
      <main>
        <Section13></Section13>
      </main>
      <Section14></Section14>
      <Section15></Section15>
      <Section16></Section16>
      <Section17></Section17>
      <Section6></Section6>
      <Section18></Section18>
    </div>
  );
};

export default WhyUs;
