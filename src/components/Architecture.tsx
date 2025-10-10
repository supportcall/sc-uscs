import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileCode, 
  Terminal, 
  Database, 
  RefreshCw,
  Shield,
  Layers
} from "lucide-react";

const Architecture = () => {
  const components = [
    {
      icon: FileCode,
      title: "UWIRE.bat",
      subtitle: "Batch Wrapper",
      description: "Handles UAC elevation, PowerShell execution policy bypass, and Base64 payload deployment for seamless execution across Windows environments.",
      features: [
        "Administrator privilege validation",
        "PowerShell ExecutionPolicy bypass",
        "Base64 encoded payload extraction",
        "Cross-version Windows compatibility"
      ]
    },
    {
      icon: Terminal,
      title: "UWIRE_Core.ps1", 
      subtitle: "PowerShell Engine",
      description: "Modern PowerShell 5.1+ core containing all remediation logic, replacing deprecated WMIC and legacy tools with native cmdlets.",
      features: [
        "Native PowerShell cmdlets only",
        "Comprehensive error handling",
        "Modular stage architecture",
        "Advanced logging system"
      ]
    },
    {
      icon: Database,
      title: "State Persistence",
      subtitle: "Scheduled Task Manager",
      description: "NT AUTHORITY\\SYSTEM scheduled task ensures reliable resume operation across multiple required reboots during remediation.",
      features: [
        "Registry state markers",
        "Automatic task cleanup",
        "Multi-reboot resilience", 
        "System-level execution"
      ]
    }
  ];

  const workflow = [
    "Pre-execution validation & safety checks",
    "System restore point creation",
    "Temporary file cleanup & sanitization", 
    "Deep bloatware removal & telemetry hardening",
    "Multi-scanner malware disinfection",
    "Windows system file integrity repair",
    "Automated patching & security updates",
    "Performance optimization & defragmentation",
    "Final logging & system state restoration"
  ];

  return (
    <section className="py-24 bg-gradient-hero" aria-labelledby="architecture-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="architecture-heading" className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Hybrid Architecture
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Self-contained execution model designed for maximum reliability and 
            compatibility across Windows 8.1 through current versions.
          </p>
        </div>

        {/* Architecture Components */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {components.map((component, index) => (
            <Card 
              key={index}
              className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-elegant"
            >
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <component.icon className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl text-foreground">{component.title}</CardTitle>
                    <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                      {component.subtitle}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {component.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {component.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Execution Workflow */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Layers className="w-8 h-8 text-accent" />
              <CardTitle className="text-2xl text-foreground">8-Stage Execution Pipeline</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              Sequential remediation workflow with automated state management and reboot resilience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workflow.map((stage, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/20 border border-border/30 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm text-foreground font-medium">{stage}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Architecture;