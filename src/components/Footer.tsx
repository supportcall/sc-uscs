import { ExternalLink } from "lucide-react";
import scUscsBox from "@/assets/sc-uscs-box.png";

const Footer = () => {
  const supportCallLinks = [
    { name: "Australia", url: "https://www.supportcall.com.au/" },
    { name: "South Africa", url: "https://www.supportcall.co.za/" },
    { name: "Workflow4AI", url: "https://workflow4ai.com/" },
    { name: "SysAdmin AI", url: "https://sysadmin-ai.com/" },
    { name: "SC-USCS", url: "https://sc-uscs.com/" },
    { name: "SC-Cloaked", url: "https://sc-cloaked.com/" },
    { name: "WAN IP", url: "https://wanip.io/" },
    { name: "SC-USEO", url: "https://sc-useo.com/" },
    { name: "SeniorMail", url: "https://seniormail.co.za/" },
    { name: "Rehab-Source", url: "https://rehab-source.com/" },
    { name: "ImmiAssist2AU", url: "https://immiassist2au.com/" },
  ];

  const resourceLinks = [
    { name: "Microsoft Docs", url: "https://docs.microsoft.com/" },
  ];

  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a 
              href="/" 
              className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity"
            >
              <img 
                src={scUscsBox} 
                alt="SC-USCS Logo" 
                className="h-10 w-10 object-contain" 
              />
              <span className="font-semibold text-foreground">SC-USCS</span>
            </a>
            <p className="text-sm text-muted-foreground max-w-sm">
              Professional Windows script generator for system cleaning, security enhancement, 
              and optimization. 100% free, open source, using only safe built-in Windows tools.
            </p>
          </div>

          {/* SupportCALL */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">SupportCALL</h4>
            <ul className="flex flex-col gap-2">
              {supportCallLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="flex flex-col gap-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 SC-USCS. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/70 max-w-2xl">
            SC-USCS is provided "as is" for informational purposes only. Consult with your ICT professional 
            regarding system security. Use at your own risk.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs text-green-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Script Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
