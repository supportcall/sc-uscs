import { Helmet } from "react-helmet";
import ScriptGenerator from "@/components/ScriptGenerator";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import TechnicalSpecs from "@/components/TechnicalSpecs";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SupportCALL - SC-UWIRE | Ultimate Windows Remediation Engine</title>
        <meta name="description" content="Professional Windows remediation tool featuring autonomous malware removal, system repair, and optimization. Enterprise-grade PowerShell architecture for IT professionals." />
      </Helmet>
      <main className="min-h-screen">
        <Hero />
        <Features />
        <Architecture />
        <TechnicalSpecs />
        <ScriptGenerator />
      </main>
    </>
  );
};

export default Index;