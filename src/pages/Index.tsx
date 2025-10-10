import { Helmet } from "react-helmet";
import ScriptGenerator from "@/components/ScriptGenerator";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SupportCALL - SC-USCS | Ultimate Secure Clean Script</title>
        <meta name="description" content="Professional Windows script generator for system cleaning, security enhancement, and optimization. Generate custom PowerShell scripts for Windows 10/11." />
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