import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - SC-USCS | SupportCALL</title>
        <meta name="description" content="Privacy Policy for SC-USCS - SupportCALL Ultimate Secure Clean Script. Learn how we collect, use, and protect your data." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://sc-uscs.lovable.app/privacy" />
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 31, 2025</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                SupportCALL ("we", "our", or "us") operates the SC-USCS (SupportCALL Ultimate Secure Clean Script) 
                website. This Privacy Policy explains how we collect, use, and protect information when you use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              
              <h3 className="text-lg font-medium text-foreground mb-3">2.1 Analytics Data</h3>
              <p className="text-muted-foreground mb-4">
                We use <strong>Google Analytics 4 (GA4)</strong> to collect anonymous usage data including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>Pages visited and time spent on pages</li>
                <li>Device type, browser, and operating system</li>
                <li>Geographic location (country/city level)</li>
                <li>Referral sources</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mb-3">2.2 Session Recording</h3>
              <p className="text-muted-foreground mb-4">
                We use <strong>Microsoft Clarity</strong> for session recording and heatmaps to understand 
                how users interact with our website. Clarity automatically masks sensitive information 
                and does not collect personal data.
              </p>

              <h3 className="text-lg font-medium text-foreground mb-3">2.3 Marketing & Remarketing</h3>
              <p className="text-muted-foreground mb-4">
                We may use <strong>Google Ads</strong> for remarketing purposes. This allows us to show 
                relevant advertisements to users who have previously visited our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Our website uses cookies and similar technologies for analytics and functionality. 
                Types of cookies we use:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use collected information to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>Improve our website and user experience</li>
                <li>Analyze usage patterns and trends</li>
                <li>Provide relevant marketing communications</li>
                <li>Ensure website security and prevent abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Data Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information. We may share anonymized data with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>Google (Analytics & Ads)</li>
                <li>Microsoft (Clarity)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>Opt out of analytics tracking (via browser settings or cookie controls)</li>
                <li>Request information about data we hold</li>
                <li>Request deletion of your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For privacy inquiries, please contact us at:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>Website: <a href="https://www.supportcall.com.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supportcall.com.au</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time. Changes will be posted on this page 
                with an updated revision date.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
