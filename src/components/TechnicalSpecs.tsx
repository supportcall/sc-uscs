import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings,
  Code,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

const TechnicalSpecs = () => {
  const switches = [
    { flag: "-a", description: "Automatic mode (suppress all user prompts)", default: "No" },
    { flag: "-asm", description: "Auto Safe Mode with Network, then resume", default: "No" },
    { flag: "-r", description: "Auto-reboot 15 seconds after completion", default: "No" },
    { flag: "-o", description: "Power off system after running (Overrides -r)", default: "No" },
    { flag: "-v", description: "Verbose mode with detailed console output", default: "No" },
    { flag: "-sdb", description: "Skip Stage 2: Deep Debloat", default: "No" },
    { flag: "-sdc", description: "Skip DISM Component Store cleanup", default: "No" },
    { flag: "-sd", description: "Skip Stage 6: Optimization", default: "No" },
    { flag: "-sor", description: "Skip OneDrive removal", default: "No" },
    { flag: "-str", description: "Skip aggressive Telemetry Removal", default: "No" },
    { flag: "-sa", description: "Skip ALL Stage 3 antivirus scans", default: "No" },
    { flag: "-pmb", description: "Preserve Malwarebytes installation", default: "No" },
    { flag: "-scc", description: "Skip Cookie Cleanup", default: "No" },
    { flag: "-er", description: "Send email report via SMTP", default: "No" },
    { flag: "-scs", description: "Skip Stage 8: Custom Scripts", default: "No" },
    { flag: "-swu", description: "Skip Windows Update processes", default: "No" },
    { flag: "-p", description: "Preserve Power Scheme settings", default: "No" }
  ];

  const requirements = [
    { name: "Operating System", value: "Windows 8.1, 10, 11 (x64)", type: "success" },
    { name: "PowerShell Version", value: "5.1 or higher", type: "success" },
    { name: "Execution Context", value: "Administrator privileges required", type: "warning" },
    { name: "Network Connection", value: "Optional (enables update features)", type: "info" },
    { name: "Disk Space", value: "Minimum 2GB free space", type: "info" },
    { name: "System Restore", value: "Enabled recommended", type: "warning" }
  ];

  const modernization = [
    { legacy: "WMIC queries", modern: "Get-CimInstance / Get-ItemProperty", reason: "Deprecated in Windows 11 25H2" },
    { legacy: "wuauclt commands", modern: "USOClient.exe / Invoke-CimMethod", reason: "Legacy Windows Update agent unreliable" },
    { legacy: "Defraggler.exe", modern: "Optimize-Volume cmdlet", reason: "Native integration with automatic SSD detection" },
    { legacy: "Subinacl.exe", modern: "Get-Acl / Set-Acl cmdlets", reason: "Native PowerShell permission management" },
    { legacy: "PowerShell 2.0", modern: "PowerShell 5.1+ cmdlets", reason: "Removed from modern Windows versions" }
  ];

  return (
    <section className="py-24 bg-background" aria-labelledby="technical-specs-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="technical-specs-heading" className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Technical Specifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive configuration options and system requirements for enterprise deployment
          </p>
        </div>

        <Tabs defaultValue="switches" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="switches" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Command Switches</span>
            </TabsTrigger>
            <TabsTrigger value="requirements" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Requirements</span>
            </TabsTrigger>
            <TabsTrigger value="modernization" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Modernization</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="switches">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Command-Line Switches</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Complete configuration control via command-line arguments for automated deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {switches.map((switchItem, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/30"
                    >
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className="font-mono text-primary border-primary/30">
                          {switchItem.flag}
                        </Badge>
                        <span className="text-sm text-foreground">{switchItem.description}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-secondary/50">
                        {switchItem.default}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">System Requirements</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Minimum system specifications and recommended configuration for optimal operation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {requirements.map((req, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/30"
                    >
                      <div className="flex items-center space-x-3">
                        {req.type === 'success' && <CheckCircle className="w-5 h-5 text-accent" />}
                        {req.type === 'warning' && <AlertCircle className="w-5 h-5 text-primary" />}
                        {req.type === 'info' && <Info className="w-5 h-5 text-muted-foreground" />}
                        <span className="font-medium text-foreground">{req.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{req.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modernization">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Legacy Tool Modernization</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Migration from deprecated Windows tools to modern PowerShell cmdlets for future compatibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modernization.map((item, index) => (
                    <div 
                      key={index}
                      className="p-6 rounded-lg bg-secondary/20 border border-border/30"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Badge variant="destructive" className="mb-2 bg-destructive/20 text-destructive border-destructive/30">
                            Legacy
                          </Badge>
                          <p className="text-sm font-mono text-muted-foreground">{item.legacy}</p>
                        </div>
                        
                        <div>
                          <Badge variant="outline" className="mb-2 bg-accent/20 text-accent border-accent/30">
                            Modern
                          </Badge>
                          <p className="text-sm font-mono text-foreground">{item.modern}</p>
                        </div>
                        
                        <div>
                          <Badge variant="secondary" className="mb-2 bg-secondary/50">
                            Reason
                          </Badge>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.reason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TechnicalSpecs;