import { Terminal, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary" aria-hidden="true" />
            <span className="font-bold text-lg">SupportCALL</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('sc-uwire')}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <Terminal className="w-4 h-4 mr-2" aria-hidden="true" />
              SC-UWIRE
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('sc-uscs')}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <FileCode className="w-4 h-4 mr-2" aria-hidden="true" />
              SC-USCS
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
