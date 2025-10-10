import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Shield, Zap, Terminal, AlertTriangle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden" role="banner">
      {/* Animated background elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10" aria-label="Product category">
          <Terminal className="w-4 h-4 mr-2" aria-hidden="true" />
          Ultimate Windows Remediation Engine
        </Badge>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary-glow to-accent bg-clip-text text-transparent">
          SupportCALL
        </h1>
        
        <p className="text-xl md:text-2xl font-semibold mb-4 text-primary-glow">
          UWIRE - Ultimate Secure Clean Script
        </p>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Professional-grade Windows remediation engine featuring autonomous multi-stage cleanup, 
          malware removal, system repair, and performance optimization. Built with modern PowerShell 
          for enterprise reliability.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <div className="w-full max-w-2xl mb-4">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-destructive" aria-hidden="true" />
                <p className="text-sm font-bold text-destructive">CRITICAL WARNING</p>
                <AlertTriangle className="w-5 h-5 text-destructive" aria-hidden="true" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This tool performs deep system modifications. Always create a system restore point before use. 
                Run at your own risk. Not responsible for data loss or system damage.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            <Download className="w-5 h-5 mr-2" />
            Download UWIRE v2.6
          </Button>
          
          <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary hover:shadow-elegant transition-all duration-300">
            <Shield className="w-5 h-5 mr-2" />
            View Documentation
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 text-muted-foreground">
            <Shield className="w-6 h-6 text-accent" />
            <span className="font-medium">Enterprise Security</span>
          </div>
          
          <div className="flex items-center justify-center space-x-3 text-muted-foreground">
            <Zap className="w-6 h-6 text-primary" />
            <span className="font-medium">Autonomous Operation</span>
          </div>
          
          <div className="flex items-center justify-center space-x-3 text-muted-foreground">
            <Terminal className="w-6 h-6 text-primary-glow" />
            <span className="font-medium">Modern PowerShell</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;