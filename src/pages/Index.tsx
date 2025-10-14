import { Helmet } from "react-helmet";
import ScriptGenerator from "@/components/ScriptGenerator";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SupportCALL SC-USCS v2.9 - Ultimate Secure Clean Script | Professional Windows Tool</title>
        <meta name="description" content="Professional Windows script generator v2.9 for system cleaning, security enhancement, and optimization. Generate custom PowerShell scripts for Windows 10/11 with 40+ functions." />
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