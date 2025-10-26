import { Helmet } from "react-helmet";
import ScriptGenerator from "@/components/ScriptGenerator";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SupportCALL SC-USCS v5.01 - Ultimate Secure Clean Script | Professional Windows Tool</title>
        <meta name="description" content="Professional Windows script generator v5.01 - 100% free, open source, safe built-in tools. Generate custom PowerShell scripts for Windows 10/11 with 40+ functions for system cleaning, security enhancement, and optimization." />
      </Helmet>
      <main className="min-h-screen">
        <div id="sc-uscs">
          <ScriptGenerator />
        </div>
      </main>
    </>
  );
};

export default Index;