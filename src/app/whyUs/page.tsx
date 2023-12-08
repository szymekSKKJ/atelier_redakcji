import Section13 from "@/components/sections/Section13/Section13";
import styles from "./styles.module.scss";
import Section14 from "@/components/sections/Section14/Section14";
import Section15 from "@/components/sections/Section15/Section15";

const WhyUs = () => {
  return (
    <div className={`${styles.why_us}`}>
      <main>
        <Section13></Section13>
      </main>
      <Section14></Section14>
      <Section15></Section15>
    </div>
  );
};

export default WhyUs;
