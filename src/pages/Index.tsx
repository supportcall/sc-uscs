import { Helmet } from "react-helmet";
import ScriptGenerator from "@/components/ScriptGenerator";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SupportCALL SC-USCS v5.38 - Ultimate Secure Clean Script | Professional Windows Tool</title>
        <meta name="description" content="Professional Windows script generator v5.38 - 100% free, open source, safe built-in tools. Generate custom PowerShell scripts for Windows 10/11 with 40+ functions for system cleaning, security enhancement, and optimization." />
        <meta property="og:title" content="SupportCALL SC-USCS v5.38 - Ultimate Secure Clean Script" />
        <meta property="og:description" content="Professional Windows script generator v5.38 for system cleaning, security, and optimization. Generate custom PowerShell scripts for Windows 10/11 with 40+ remediation functions." />
        <meta name="twitter:title" content="SupportCALL SC-USCS v5.38 - Ultimate Secure Clean Script" />
        <meta name="twitter:description" content="Professional Windows script generator v5.38 for system cleaning, security, and optimization. Generate custom PowerShell scripts for Windows 10/11 with 40+ remediation functions." />
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