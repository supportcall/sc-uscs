import { Terminal, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import scUscsBox from "@/assets/sc-uscs-box.png";

const Navigation = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Scroll to top"
          >
            <img src={scUscsBox} alt="SC-USCS Logo" className="w-10 h-10 object-contain" />
            <span className="font-bold text-lg">SupportCALL</span>
          </button>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('sc-uwire')}
              className="hover:bg-primary/10 hover:text-primary"
              aria-label="Navigate to SC-UWIRE section"
            >
              <Terminal className="w-4 h-4 mr-2" aria-hidden="true" />
              SC-UWIRE
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('sc-uscs')}
              className="hover:bg-primary/10 hover:text-primary"
              aria-label="Navigate to SC-USCS section"
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
