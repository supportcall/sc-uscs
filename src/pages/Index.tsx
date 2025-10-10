import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import ScriptGenerator from "@/components/ScriptGenerator";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SupportCALL - SC-USCS | Ultimate Secure Clean Script</title>
        <meta name="description" content="Professional Windows script generator for system cleaning, security enhancement, and optimization. Generate custom PowerShell scripts for Windows 10/11." />
      </Helmet>
      <Navigation />
      <main className="min-h-screen pt-16">
        <div id="sc-uscs">
          <ScriptGenerator />
        </div>
      </main>
    </>
  );
};

export default Index;