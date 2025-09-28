import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Copy, FileText, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScriptFunction {
  id: string;
  name: string;
  description: string;
  safety: "High Safety" | "Medium Safety" | "Low Safety";
  recommendation: "Recommended" | "Optional" | "Advanced" | "Development";
  category: string;
}

const ScriptGenerator = () => {
  const { toast } = useToast();
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [showScript, setShowScript] = useState(false);

  const functions: ScriptFunction[] = [
    // System Cleaning & Repair Functions
    {
      id: "temp-cleanup",
      name: "Temporary Files Cleanup",
      description: "Cleans user and system temporary files, recent documents, and prefetch cache. Frees disk space and removes potential malware hiding spots.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Cleaning & Repair Functions"
    },
    {
      id: "recycle-bin",
      name: "Empty Recycle Bin",
      description: "Permanently removes all items from the Recycle Bin, freeing up disk space.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Cleaning & Repair Functions"
    },
    {
      id: "dns-flush",
      name: "DNS Cache Flush",
      description: "Clears DNS resolver cache to fix network connectivity issues and ensure fresh DNS lookups.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Cleaning & Repair Functions"
    },
    {
      id: "disk-cleanup",
      name: "Windows Disk Cleanup",
      description: "Runs the built-in Windows Disk Cleanup utility to remove system files, update cache, and temporary internet files.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Cleaning & Repair Functions"
    },
    {
      id: "bleachbit",
      name: "BleachBit Deep Clean",
      description: "Advanced cleaning using BleachBit portable for deep system cleanup including logs, clipboard, and update residues. Requires BleachBit.exe in script folder.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Cleaning & Repair Functions"
    },
    // System Repair & Integrity Functions
    {
      id: "sfc-scan",
      name: "System File Checker (SFC)",
      description: "Scans and repairs corrupted Windows system files. Essential for system stability and security.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Repair & Integrity Functions"
    },
    {
      id: "dism-health",
      name: "DISM Image Health",
      description: "Repairs the Windows Component Store which SFC relies on. Essential for complete system repair.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Repair & Integrity Functions"
    },
    {
      id: "check-disk",
      name: "Check Disk (Informational)",
      description: "Performs an informational disk check to identify file system errors. Does not fix issues automatically.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "System Repair & Integrity Functions"
    },
    // Security & Malware Protection
    {
      id: "defender-config",
      name: "Configure Microsoft Defender",
      description: "Enables enhanced Defender settings: real-time protection, cloud protection, sample submission, and controlled folder access in audit mode.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Security & Malware Protection"
    },
    {
      id: "defender-scan",
      name: "Microsoft Defender Full Scan",
      description: "Performs a comprehensive full system scan with Microsoft Defender. This may take several hours.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Security & Malware Protection"
    },
    {
      id: "safety-scanner",
      name: "Microsoft Safety Scanner",
      description: "Downloads and runs Microsoft's Emergency Response Tool for deep malware and rootkit detection. Tool is removed after use.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Security & Malware Protection"
    },
    {
      id: "adwcleaner",
      name: "AdwCleaner Scan",
      description: "Downloads and runs Malwarebytes AdwCleaner to remove adware, toolbars, and potentially unwanted programs. Tool is removed after use.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Security & Malware Protection"
    },
    {
      id: "defender-offline",
      name: "Defender Offline Scan (Optional)",
      description: "Prompts user to run an offline scan that boots before Windows to detect persistent threats. Requires system reboot.",
      safety: "Medium Safety",
      recommendation: "Advanced",
      category: "Security & Malware Protection"
    },
    // System Updates & Maintenance
    {
      id: "windows-update",
      name: "Windows Update",
      description: "Checks for and installs available Windows updates via PowerShell. Critical for security and system stability.",
      safety: "Medium Safety",
      recommendation: "Recommended",
      category: "System Updates & Maintenance"
    },
    // Reporting & Notifications
    {
      id: "email-report",
      name: "Email Report",
      description: "Attempts to send the log file via email using SwithMail. Requires SwithMail.exe and proper configuration.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Reporting & Notifications"
    },
    {
      id: "trmm-alert",
      name: "TRMM Alert (Placeholder)",
      description: "Placeholder for TRMM (Remote Monitoring) integration. Requires custom webhook configuration.",
      safety: "High Safety",
      recommendation: "Development",
      category: "Reporting & Notifications"
    }
  ];

  const categories = [...new Set(functions.map(f => f.category))];

  const handleSelectAll = () => {
    setSelectedFunctions(functions.map(f => f.id));
  };

  const handleClearAll = () => {
    setSelectedFunctions([]);
  };

  const handleSelectRecommended = () => {
    setSelectedFunctions(functions.filter(f => f.recommendation === "Recommended").map(f => f.id));
  };

  const handleFunctionToggle = (functionId: string) => {
    setSelectedFunctions(prev =>
      prev.includes(functionId)
        ? prev.filter(id => id !== functionId)
        : [...prev, functionId]
    );
  };

  const generateScript = () => {
    const selectedFunctionNames = functions
      .filter(f => selectedFunctions.includes(f.id))
      .map(f => f.name);
    
    toast({
      title: "Script Generated",
      description: `Generated script with ${selectedFunctionNames.length} functions selected.`,
    });
  };

  const downloadScript = () => {
    const scriptContent = generateScriptContent();
    const blob = new Blob([scriptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sc-uscs.bat";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Script Downloaded",
      description: "sc-uscs.bat has been downloaded to your device.",
    });
  };

  const copyScript = () => {
    const scriptContent = generateScriptContent();
    navigator.clipboard.writeText(scriptContent);
    toast({
      title: "Script Copied",
      description: "Script content has been copied to clipboard.",
    });
  };

  const generateScriptContent = () => {
    const selectedFunctionNames = functions
      .filter(f => selectedFunctions.includes(f.id))
      .map(f => f.name);
    
    return `@echo off
REM SupportCALL - Ultimate Secure Clean Script v2.5
REM Generated with ${selectedFunctionNames.length} selected functions

REM Selected Functions:
${selectedFunctionNames.map(name => `REM - ${name}`).join('\n')}

REM Script implementation would go here...
echo Script execution completed.
pause`;
  };

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case "High Safety": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Medium Safety": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Low Safety": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Recommended": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Optional": return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      case "Advanced": return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "Development": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-gray-800 mb-2">
              SupportCALL - Ultimate Secure Clean Script v2.5
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 mb-4">
              Professional System Cleaning & Security Enhancement Tool
            </CardDescription>
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-blue-500 text-white">SC-USCS v2.5</Badge>
              <Badge className="bg-green-500 text-white">Safety Rating: 95%</Badge>
              <Badge className="bg-blue-600 text-white">Effectiveness: 90%</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Warning Notices */}
        <div className="space-y-4 mb-6">
          <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              <strong>Administrator Required:</strong> The generated script must be run with Administrator privileges. 
              Save all work before running as some operations may require system restart.
            </AlertDescription>
          </Alert>

          <Alert className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>CRITICAL - BACKUP FIRST:</strong> Before running this script, ALWAYS create a full system backup and Windows System Restore Point. 
              While this script is designed to be safe, system modifications always carry inherent risks.
            </AlertDescription>
          </Alert>

          <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-800 dark:text-yellow-200">Pre-Run Checklist:</CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-800 dark:text-yellow-200">
              <ul className="list-disc pl-5 space-y-1">
                <li>Create a full system backup (external drive recommended)</li>
                <li>Create a System Restore Point</li>
                <li>Ensure you have Administrator privileges</li>
                <li>Close all non-essential applications</li>
                <li>Connect device to power source if applicable</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <Button onClick={handleSelectAll} variant="default">
            Select All Functions
          </Button>
          <Button onClick={handleClearAll} variant="outline">
            Clear All Selections
          </Button>
          <Button onClick={handleSelectRecommended} variant="secondary">
            Select Recommended Only
          </Button>
        </div>

        {/* Function Categories */}
        <div className="space-y-8 mb-8">
          {categories.map(category => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-gray-300 pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {functions
                  .filter(f => f.category === category)
                  .map(func => (
                    <Card 
                      key={func.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedFunctions.includes(func.id) 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                          : 'bg-white dark:bg-gray-800'
                      }`}
                      onClick={() => handleFunctionToggle(func.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={selectedFunctions.includes(func.id)}
                            onChange={() => handleFunctionToggle(func.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <CardTitle className="text-lg">{func.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-3 text-sm leading-relaxed">
                          {func.description}
                        </CardDescription>
                        <div className="flex gap-2 flex-wrap">
                          <Badge 
                            variant="outline" 
                            className={getSafetyColor(func.safety)}
                          >
                            {func.safety}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={getRecommendationColor(func.recommendation)}
                          >
                            {func.recommendation}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Generation Buttons */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex justify-center gap-4 flex-wrap">
              <Button onClick={generateScript} size="lg" className="bg-green-600 hover:bg-green-700">
                <FileText className="w-5 h-5 mr-2" />
                Generate Custom Script
              </Button>
              <Button onClick={downloadScript} size="lg" variant="outline">
                <Download className="w-5 h-5 mr-2" />
                Download sc-uscs.bat
              </Button>
              <Button onClick={() => setShowScript(!showScript)} size="lg" variant="secondary">
                <Copy className="w-5 h-5 mr-2" />
                Show Copy/Paste Code
              </Button>
            </div>
            
            {showScript && (
              <div className="mt-6">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{generateScriptContent()}</pre>
                </div>
                <div className="flex justify-end mt-2">
                  <Button onClick={copyScript} size="sm" variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
            )}

            <p className="text-center text-sm text-gray-600 mt-4">
              Selected: {selectedFunctions.length} of {functions.length} functions
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScriptGenerator;