import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  RefreshCw, 
  Zap, 
  Database, 
  Settings, 
  FileText,
  Trash2,
  Download,
  Monitor,
  Lock
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Multi-Stage Malware Removal",
      description: "Comprehensive disinfection using AdwCleaner, Kaspersky VRT, and Malwarebytes with automated execution.",
      badge: "Stage 3"
    },
    {
      icon: RefreshCw,
      title: "System File Integrity Repair", 
      description: "DISM Component Store validation followed by SFC system file checker for complete Windows restoration.",
      badge: "Stage 4"
    },
    {
      icon: Trash2,
      title: "Deep Bloatware Removal",
      description: "Targeted removal of OEM bloatware, unwanted AppX packages, and promotional software via GUID lists.",
      badge: "Stage 2"
    },
    {
      icon: Database,
      title: "Automated System Patching",
      description: "Windows Update integration with WSUS Offline support for comprehensive security patching.",
      badge: "Stage 5"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Intelligent SSD detection, defragmentation for HDDs, DISM cleanup, and .NET NGEN compilation.",
      badge: "Stage 6"
    },
    {
      icon: FileText,
      title: "Comprehensive Logging",
      description: "Detailed audit trails with before/after comparisons and optional email reporting for technicians.",
      badge: "Stage 7"
    },
    {
      icon: Settings,
      title: "Telemetry Hardening",
      description: "Privacy-focused configuration changes to disable data collection while maintaining system stability.",
      badge: "Stage 2"
    },
    {
      icon: Download,
      title: "Self-Contained Architecture",
      description: "Single executable with embedded PowerShell payload. No external dependencies or installation required.",
      badge: "Core"
    },
    {
      icon: Monitor,
      title: "Reboot Resilience",
      description: "Scheduled Task persistence ensures seamless resume operation across required system restarts.",
      badge: "Core"
    },
    {
      icon: Lock,
      title: "Enterprise Security Model",
      description: "UAC elevation, Administrator privilege validation, and NT AUTHORITY\\SYSTEM execution context.",
      badge: "Core"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Enterprise-Grade Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            UWIRE delivers comprehensive Windows remediation through a modernized, 
            autonomous architecture designed for IT professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card group"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <feature.icon className="w-8 h-8 text-primary group-hover:text-primary-glow transition-colors duration-300" />
                  <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;