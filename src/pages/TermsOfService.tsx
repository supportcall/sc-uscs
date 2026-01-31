import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - SC-USCS | SupportCALL</title>
        <meta name="description" content="Terms of Service for SC-USCS - SupportCALL Ultimate Secure Clean Script. Read our terms and conditions for using our service." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://sc-uscs.lovable.app/terms" />
      </Helmet>
      
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 31, 2025</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using SC-USCS (SupportCALL Ultimate Secure Clean Script), you agree to be 
                bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Service Description</h2>
              <p className="text-muted-foreground mb-4">
                SC-USCS is a professional Windows script generator that creates customized PowerShell scripts 
                for system cleaning, security enhancement, and optimization. The service is provided free of charge.
              </p>
            </section>

            <section className="mb-8 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <h2 className="text-xl font-semibold text-destructive mb-4">3. Important Disclaimer</h2>
              <p className="text-foreground font-medium mb-4">
                ⚠️ SupportCALL is NOT responsible for damage caused by improper preparation and/or use of SC-USCS.
              </p>
              <p className="text-muted-foreground mb-4">
                SC-USCS is provided "AS IS" for informational purposes only. Users are solely responsible for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>Creating system backups before running any scripts</li>
                <li>Understanding what each script function does</li>
                <li>Testing scripts in a safe environment first</li>
                <li>Consulting with ICT professionals for critical systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Use at Your Own Risk</h2>
              <p className="text-muted-foreground mb-4">
                While SC-USCS uses only safe, built-in Windows tools, modifying system settings always carries 
                inherent risks. By using this service, you acknowledge that:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>You are responsible for any changes made to your system</li>
                <li>You should always create restore points before running scripts</li>
                <li>Some changes may require system restarts</li>
                <li>Results may vary depending on your system configuration</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                The SC-USCS website, branding, and generated scripts are the property of SupportCALL. 
                Generated scripts may be used freely for personal and commercial purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, SupportCALL shall not be liable for any direct, 
                indirect, incidental, special, consequential, or punitive damages resulting from:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>Use or inability to use the service</li>
                <li>Any changes made to your system using generated scripts</li>
                <li>Unauthorized access to your data</li>
                <li>Any other matter relating to the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Modifications</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. Continued use of the service 
                after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These terms shall be governed by and construed in accordance with the laws of Australia.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Contact</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these terms, please contact us at:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>Website: <a href="https://www.supportcall.com.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supportcall.com.au</a></li>
              </ul>
            </section>
          </article>
        </div>
      </main>
    </>
  );
};

export default TermsOfService;
