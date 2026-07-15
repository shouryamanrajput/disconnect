import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import TrendingExperiences from "@/components/TrendingExperiences";
import WhyDisconnect from "@/components/WhyDisconnect";
import JoinCommunity from "@/components/JoinCommunity";
import SiteFooter from "@/components/SiteFooter";
import MobileJoinBar from "@/components/MobileJoinBar";

// Built to the client's mockup: hero poster → trending experiences →
// why disconnect → join band → lavender footer.
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrendingExperiences />
        <WhyDisconnect />
        <JoinCommunity />
      </main>
      <SiteFooter />
      <MobileJoinBar />
    </>
  );
}
