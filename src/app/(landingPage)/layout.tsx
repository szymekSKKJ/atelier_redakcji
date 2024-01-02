import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation/Navigation";

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation></Navigation>
      {children}
      <Footer></Footer>
    </>
  );
}
