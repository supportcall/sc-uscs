import { Helmet } from "react-helmet";
import ScriptGenerator from "@/components/ScriptGenerator";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SupportCALL Ultimate Secure Clean Script v5.84 - Professional Edition - SC-USCS</title>
        <meta name="description" content="Professional Windows script generator v5.84 - 100% free, open source, safe built-in tools. Generate custom PowerShell scripts for Windows 10/11 with 40+ functions for system cleaning, security enhancement, and optimization." />
        <meta property="og:title" content="SupportCALL Ultimate Secure Clean Script v5.84 - Professional Edition - SC-USCS" />
        <meta property="og:description" content="Professional Windows script generator v5.84 for system cleaning, security, and optimization. Generate custom PowerShell scripts for Windows 10/11 with 40+ remediation functions." />
        <meta name="twitter:title" content="SupportCALL Ultimate Secure Clean Script v5.84 - Professional Edition - SC-USCS" />
        <meta name="twitter:description" content="Professional Windows script generator v5.84 for system cleaning, security, and optimization. Generate custom PowerShell scripts for Windows 10/11 with 40+ remediation functions." />
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