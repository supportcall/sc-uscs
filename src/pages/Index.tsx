import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import TechnicalSpecs from "@/components/TechnicalSpecs";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Architecture />
      <TechnicalSpecs />
    </main>
  );
};

export default Index;