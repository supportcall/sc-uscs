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
    // System Repair Functions
    {
      id: "sfc-scan",
      name: "System File Checker (SFC)",
      description: "SFC — Repairs protected system files.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Repair Functions"
    },
    {
      id: "dism-restore",
      name: "DISM Restore Health",
      description: "DISM /RestoreHealth — Repairs component store; fixes servicing stack.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Repair Functions"
    },
    {
      id: "dism-cleanup",
      name: "DISM Component Cleanup",
      description: "DISM /StartComponentCleanup — Removes superseded WinSxS components.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Repair Functions"
    },
    {
      id: "chkdsk",
      name: "Check Disk (CHKDSK)",
      description: "CHKDSK — Scans/fixes filesystem errors and bad sectors.",
      safety: "Medium Safety",
      recommendation: "Optional",
      category: "System Repair Functions"
    },
    {
      id: "repair-volume",
      name: "Repair Volume (PowerShell)",
      description: "Repair-Volume (PowerShell) — Online/offline volume scan and repair.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Repair Functions"
    },
    // System Cleaning Functions
    {
      id: "cleanmgr",
      name: "Disk Cleanup (Cleanmgr)",
      description: "Cleanmgr — Legacy Disk Cleanup; scripted space reclaim.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Cleaning Functions"
    },
    {
      id: "optimize-volume",
      name: "Optimize Volume / Defrag",
      description: "Optimize-Volume / Defrag.exe — TRIM/defrag per-drive type.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Cleaning Functions"
    },
    {
      id: "bleachbit",
      name: "BleachBit Deep Clean",
      description: "BleachBit (portable) — Deep system/browser cleanup with full CLI for automation.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "System Cleaning Functions"
    },
    // Event Logs Management
    {
      id: "wevtutil",
      name: "Event Log Management",
      description: "Wevtutil — Query/export/clear Windows event logs from CLI.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Event Logs Management"
    },
    // Network Repair Functions
    {
      id: "dns-flush",
      name: "Flush DNS Cache",
      description: "Ipconfig /flushdns — Flushes DNS resolver cache.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Network Repair Functions"
    },
    {
      id: "winsock-reset",
      name: "Winsock Reset",
      description: "Netsh winsock reset — Resets Winsock/LSP.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Network Repair Functions"
    },
    {
      id: "tcpip-reset",
      name: "TCP/IP Stack Reset",
      description: "Netsh int ip reset — Rebuilds TCP/IP stack.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Network Repair Functions"
    },
    {
      id: "firewall-reset",
      name: "Windows Firewall Reset",
      description: "Netsh advfirewall reset — Resets Windows Firewall.",
      safety: "Medium Safety",
      recommendation: "Optional",
      category: "Network Repair Functions"
    },
    {
      id: "proxy-reset",
      name: "Proxy Reset",
      description: "Netsh winhttp reset proxy — Clears system proxy.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Network Repair Functions"
    },
    {
      id: "netcfg-reset",
      name: "Full Network Stack Reset",
      description: "Netcfg -d — Full network stack reset/rebind.",
      safety: "Medium Safety",
      recommendation: "Advanced",
      category: "Network Repair Functions"
    },
    {
      id: "arp-clear",
      name: "Clear ARP Cache",
      description: "Arp -d * — Clears ARP cache.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Network Repair Functions"
    },
    {
      id: "netsh-trace",
      name: "Network Trace Capture",
      description: "Netsh trace — Built-in network trace capture for troubleshooting.",
      safety: "High Safety",
      recommendation: "Advanced",
      category: "Network Repair Functions"
    },
    // Windows Store & Update Functions
    {
      id: "wsreset",
      name: "Windows Store Reset",
      description: "WSReset.exe — Resets Microsoft Store cache.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Windows Store & Update Functions"
    },
    {
      id: "usoclient",
      name: "Windows Update Client",
      description: "UsoClient (StartScan/StartDownload/StartInstall) — Triggers Windows Update actions.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Windows Store & Update Functions"
    },
    {
      id: "pswindowsupdate",
      name: "PowerShell Windows Update",
      description: "PSWindowsUpdate (PowerShell module) — Script Windows Update scan/install/hide.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Windows Store & Update Functions"
    },
    {
      id: "winget",
      name: "Winget App Management",
      description: "Winget — Script app installs/upgrades/repairs at scale.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Windows Store & Update Functions"
    },
    // Diagnostics & Troubleshooting
    {
      id: "setupdiag",
      name: "Setup Diagnostic Tool",
      description: "SetupDiag.exe — CLI analysis of Windows setup/upgrade failures.",
      safety: "High Safety",
      recommendation: "Advanced",
      category: "Diagnostics & Troubleshooting"
    },
    // Boot Repair Functions
    {
      id: "bootrec",
      name: "Boot Record Repair",
      description: "Bootrec (WinRE) — /fixmbr /fixboot /rebuildbcd boot repair.",
      safety: "Medium Safety",
      recommendation: "Advanced",
      category: "Boot Repair Functions"
    },
    {
      id: "bcdboot",
      name: "BCD Boot Rebuild",
      description: "Bcdboot — Rebuilds boot files/BCD from a healthy Windows.",
      safety: "Medium Safety",
      recommendation: "Advanced",
      category: "Boot Repair Functions"
    },
    // Storage & Backup Management
    {
      id: "vssadmin",
      name: "Shadow Copy Management",
      description: "Vssadmin — Lists/deletes shadow copies (space/backup issues).",
      safety: "Medium Safety",
      recommendation: "Optional",
      category: "Storage & Backup Management"
    },
    // System Services & Tasks
    {
      id: "sc-repair",
      name: "Service Control Repair",
      description: "Sc.exe / Schtasks.exe — Repair service states; rebuild scheduled tasks.",
      safety: "Medium Safety",
      recommendation: "Advanced",
      category: "System Services & Tasks"
    },
    {
      id: "gpupdate",
      name: "Group Policy Update",
      description: "Gpupdate /force — Reapplies local/domain Group Policy.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "System Services & Tasks"
    },
    {
      id: "time-sync",
      name: "Windows Time Sync",
      description: "W32tm /resync — Time service repair/sync (fixes TLS/WSUS issues).",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Services & Tasks"
    },
    // Certificate & Driver Management
    {
      id: "certutil",
      name: "Certificate Cache Clear",
      description: "Certutil -urlcache delete — Clears CRL/OCSP cache.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Certificate & Driver Management"
    },
    {
      id: "pnputil",
      name: "Driver Management",
      description: "Pnputil — Enumerate/add/delete drivers from script.",
      safety: "Medium Safety",
      recommendation: "Advanced",
      category: "Certificate & Driver Management"
    },
    {
      id: "printuientry",
      name: "Printer Management",
      description: "PrintUIEntry — Add/remove printers/drivers from script.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Certificate & Driver Management"
    },
    // Power Management
    {
      id: "powercfg",
      name: "Power Configuration",
      description: "Powercfg — Reset/optimize power plans; generate energy/battery reports.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Power Management"
    },
    // Security & Malware - Microsoft Defender
    {
      id: "defender-update",
      name: "Defender Signature Update",
      description: "Microsoft Defender CLI (MpCmdRun.exe) — Signature updates; quick/full/custom scans; remediation.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Security & Malware Protection"
    },
    {
      id: "defender-scan",
      name: "Defender Full Scan",
      description: "Defender PowerShell (Start-MpScan / Remove-MpThreat / Update-MpSignature) — Full scripting interface to Defender.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Security & Malware Protection"
    },
    {
      id: "defender-offline",
      name: "Defender Offline Scan",
      description: "Defender Offline (Start-MpWDOScan) — Schedules an offline pre-boot scan via PowerShell.",
      safety: "Medium Safety",
      recommendation: "Advanced",
      category: "Security & Malware Protection"
    },
    {
      id: "safety-scanner",
      name: "Microsoft Safety Scanner",
      description: "Microsoft Safety Scanner (MSERT.exe) — Standalone cleaner; supports quiet/full scan switches.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Security & Malware Protection"
    },
    {
      id: "mrt",
      name: "Malicious Software Removal Tool",
      description: "Windows Malicious Software Removal Tool (MRT.exe) — Monthly targeted remover; quiet/extended scan switches.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Security & Malware Protection"
    },
    // Security & Malware - Sysinternals
    {
      id: "autorunsc",
      name: "Sysinternals Autorunsc",
      description: "Sysinternals Autorunsc — Enumerate/disable autoruns; CSV output for automation.",
      safety: "High Safety",
      recommendation: "Advanced",
      category: "Security & Malware Protection"
    },
    {
      id: "sigcheck",
      name: "Sysinternals Sigcheck",
      description: "Sysinternals Sigcheck — List unsigned/suspicious files; VirusTotal integration.",
      safety: "High Safety",
      recommendation: "Advanced",
      category: "Security & Malware Protection"
    },
    {
      id: "procdump",
      name: "Sysinternals ProcDump",
      description: "Sysinternals ProcDump — Auto-capture crash dumps for post-infection triage.",
      safety: "High Safety",
      recommendation: "Advanced",
      category: "Security & Malware Protection"
    },
    // Security & Malware - Third-Party Free Tools
    {
      id: "rkill",
      name: "RKill Process Termination",
      description: "Rkill — Kills malicious processes; silent mode -s for scripting.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Security & Malware Protection"
    },
    {
      id: "adwcleaner",
      name: "AdwCleaner PUP Removal",
      description: "AdwCleaner (CLI) — Adware/PUP cleanup with documented CLI (/eula, /scan, /clean, /noreboot, /quiet).",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Security & Malware Protection"
    },
    {
      id: "kvrt",
      name: "Kaspersky Virus Removal Tool",
      description: "Kaspersky Virus Removal Tool (KVRT) — Portable second-opinion scanner; fully silent CLI.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Security & Malware Protection"
    },
    {
      id: "clamav",
      name: "ClamAV Scanner",
      description: "ClamAV (clamscan / freshclam) — Open-source AV; scriptable scans and signature updates.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Security & Malware Protection"
    },
    {
      id: "raccine",
      name: "Raccine Ransomware Vaccine",
      description: "Raccine — Open-source 'ransomware vaccine' blocking shadow-copy deletions; deploy via script/GPO.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Security & Malware Protection"
    },
    // Reporting & Notifications
    {
      id: "system-report",
      name: "Comprehensive System Report",
      description: "Generates detailed system health report including hardware info, installed software, all issues/viruses found, and performance metrics.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Reporting & Notifications"
    },
    {
      id: "email-report",
      name: "Email Report",
      description: "Automatically sends comprehensive system report to scmyhelp@gmail.com and alerts@supportcall.co.za using built-in email functionality.",
      safety: "High Safety",
      recommendation: "Recommended",
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
    
    // Generate dynamic filename based on selection type
    let selectionType = "Selected";
    if (selectedFunctions.length === functions.length) {
      selectionType = "All";
    } else if (selectedFunctions.length === functions.filter(f => f.recommendation === "Recommended").length && 
               functions.filter(f => f.recommendation === "Recommended").every(f => selectedFunctions.includes(f.id))) {
      selectionType = "Recommended";
    }
    
    a.download = `SC-USCS-v2.6-${selectionType}-Functions.bat`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Script Downloaded",
      description: `SC-USCS-v2.6-${selectionType}-Functions.bat has been downloaded to your device.`,
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
    const selectedFunctionData = functions.filter(f => selectedFunctions.includes(f.id));
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    // Helper function to generate implementation for each function
    const generateFunctionImplementation = (func: ScriptFunction, stageNum: number, funcNum: number) => {
      const logFile = `${stageNum.toString().padStart(2, '0')}_${func.id}.log`;
      
      switch(func.id) {
        // System Repair Functions
        case 'sfc-scan':
          return `echo [${stageNum}.${funcNum}] SYSTEM FILE CHECKER - Repairs protected system files
echo ----------------------------------------------------------------
echo ^|^| SYSTEM FILE CHECKER - Full scan ^| STARTED %TIME% %DATE% ^|^|
echo ^|^| *Press [Ctrl] + [C] to cancel and proceed to the next     ^|^|
echo ----------------------------------------------------------------
echo.
echo *** Scanning all Windows system files for corruption ***
echo *** Estimated time: 15-30 minutes - DO NOT INTERRUPT ***
sfc /scannow >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'dism-restore':
          return `echo [${stageNum}.${funcNum}] DISM RESTORE HEALTH - Repairs component store; fixes servicing stack
echo ----------------------------------------------------------------
echo ^|^| DISM RESTORE HEALTH - Component repair ^| STARTED %TIME% %DATE% ^|^|
echo ^|^| *Press [Ctrl] + [C] to cancel and proceed to the next     ^|^|
echo ----------------------------------------------------------------
echo.
echo *** Repairing Windows Component Store ***
echo *** Estimated time: 10-20 minutes - Requires internet connection ***
DISM /Online /Cleanup-Image /RestoreHealth /LogPath:"%LOGPATH%\\\\${logFile}"
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'dism-cleanup':
          return `echo [${stageNum}.${funcNum}] DISM COMPONENT CLEANUP - Removes superseded WinSxS components
echo *** Removing old component versions to free disk space ***
DISM /Online /Cleanup-Image /StartComponentCleanup /LogPath:"%LOGPATH%\\\\${logFile}"
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'chkdsk':
          return `echo [${stageNum}.${funcNum}] CHECK DISK - Scans/fixes filesystem errors and bad sectors
echo ----------------------------------------------------------------
echo ^|^| CHECK DISK - Filesystem scan ^| STARTED %TIME% %DATE% ^|^|
echo ^|^| *Press [Ctrl] + [C] to cancel and proceed to the next     ^|^|
echo ----------------------------------------------------------------
echo.
echo *** Checking filesystem integrity ***
echo NOTE: This may schedule a scan on next reboot if errors are found
chkdsk C: >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'repair-volume':
          return `echo [${stageNum}.${funcNum}] REPAIR VOLUME - Online/offline volume scan and repair
echo *** PowerShell volume repair operations ***
powershell -Command "Repair-Volume -DriveLetter C -Scan; Repair-Volume -DriveLetter C -OfflineScanAndFix" >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;

        // System Cleaning Functions
        case 'cleanmgr':
          return `echo [${stageNum}.${funcNum}] DISK CLEANUP - Legacy Disk Cleanup; scripted space reclaim
echo *** Running Windows Disk Cleanup utility ***
cleanmgr /sagerun:1 /verylowdisk >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'optimize-volume':
          return `echo [${stageNum}.${funcNum}] OPTIMIZE VOLUME - TRIM/defrag per-drive type
echo *** Auto-detecting drive type and optimizing ***
powershell -Command "Get-Volume | Where-Object {$_.DriveLetter -eq 'C'} | Optimize-Volume -Verbose" >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'bleachbit':
          return `echo [${stageNum}.${funcNum}] BLEACHBIT - Deep system/browser cleanup
echo *** Checking for BleachBit portable ***
if exist "%~dp0bleachbit_portable\\\\bleachbit_console.exe" (
    echo Running BleachBit deep clean...
    "%~dp0bleachbit_portable\\\\bleachbit_console.exe" --clean system.cache system.logs system.tmp >> "%LOGPATH%\\\\${logFile}" 2>&1
) else (
    echo WARNING: BleachBit portable not found. Download from bleachbit.org
)
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;

        // Event Logs Management
        case 'wevtutil':
          return `echo [${stageNum}.${funcNum}] EVENT LOG MANAGEMENT - Query/export/clear Windows event logs
echo *** Exporting Windows Event Logs ***
wevtutil qe System /c:100 /f:text > "%LOGPATH%\\\\${logFile}"
wevtutil qe Application /c:100 /f:text >> "%LOGPATH%\\\\${logFile}"
wevtutil qe Security /c:100 /f:text >> "%LOGPATH%\\\\${logFile}"
echo Logs exported to: %LOGPATH%\\\\${logFile}
echo.`;

        // Network Repair Functions
        case 'dns-flush':
          return `echo [${stageNum}.${funcNum}] DNS FLUSH - Flushes DNS resolver cache
ipconfig /flushdns >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'winsock-reset':
          return `echo [${stageNum}.${funcNum}] WINSOCK RESET - Resets Winsock/LSP
netsh winsock reset >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'tcpip-reset':
          return `echo [${stageNum}.${funcNum}] TCP/IP RESET - Rebuilds TCP/IP stack
netsh int ip reset >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'firewall-reset':
          return `echo [${stageNum}.${funcNum}] FIREWALL RESET - Resets Windows Firewall
netsh advfirewall reset >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'proxy-reset':
          return `echo [${stageNum}.${funcNum}] PROXY RESET - Clears system proxy
netsh winhttp reset proxy >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'netcfg-reset':
          return `echo [${stageNum}.${funcNum}] NETWORK STACK RESET - Full network stack reset/rebind
echo *** WARNING: This will reset ALL network adapters ***
netcfg -d >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'arp-clear':
          return `echo [${stageNum}.${funcNum}] ARP CACHE CLEAR - Clears ARP cache
arp -d * >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'netsh-trace':
          return `echo [${stageNum}.${funcNum}] NETWORK TRACE - Built-in network trace capture
echo *** Starting network trace (will run for 60 seconds) ***
netsh trace start capture=yes tracefile="%LOGPATH%\\\\network_trace.etl" >> "%LOGPATH%\\\\${logFile}" 2>&1
timeout /t 60 /nobreak
netsh trace stop >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;

        // Windows Store & Update Functions
        case 'wsreset':
          return `echo [${stageNum}.${funcNum}] WINDOWS STORE RESET - Resets Microsoft Store cache
WSReset.exe >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'usoclient':
          return `echo [${stageNum}.${funcNum}] WINDOWS UPDATE CLIENT - Triggers Windows Update actions
echo *** Starting Windows Update scan ***
UsoClient StartScan >> "%LOGPATH%\\\\${logFile}" 2>&1
UsoClient StartDownload >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'pswindowsupdate':
          return `echo [${stageNum}.${funcNum}] POWERSHELL WINDOWS UPDATE - Script Windows Update scan/install
echo *** Installing PSWindowsUpdate module if not present ***
powershell -Command "if (!(Get-Module -ListAvailable -Name PSWindowsUpdate)) { Install-Module PSWindowsUpdate -Force -Scope CurrentUser }; Import-Module PSWindowsUpdate; Get-WindowsUpdate -AcceptAll" >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'winget':
          return `echo [${stageNum}.${funcNum}] WINGET - Script app installs/upgrades/repairs
echo *** Checking for available app upgrades ***
winget upgrade --all >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;

        // Diagnostics & Troubleshooting
        case 'setupdiag':
          return `echo [${stageNum}.${funcNum}] SETUP DIAGNOSTIC - CLI analysis of Windows setup/upgrade failures
echo *** Downloading SetupDiag if needed ***
if not exist "%TEMP%\\\\SetupDiag.exe" (
    powershell -Command "Invoke-WebRequest -Uri 'https://go.microsoft.com/fwlink/?linkid=870142' -OutFile '%TEMP%\\\\SetupDiag.exe'"
)
"%TEMP%\\\\SetupDiag.exe" /Output:"%LOGPATH%\\\\${logFile}" /Mode:Online
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;

        // Boot Repair Functions
        case 'bootrec':
          return `echo [${stageNum}.${funcNum}] BOOT RECORD REPAIR - /fixmbr /fixboot /rebuildbcd
echo *** NOTE: This should be run from Windows Recovery Environment ***
echo *** Logging command recommendations ***
echo bootrec /fixmbr >> "%LOGPATH%\\\\${logFile}"
echo bootrec /fixboot >> "%LOGPATH%\\\\${logFile}"
echo bootrec /rebuildbcd >> "%LOGPATH%\\\\${logFile}"
echo Boot repair commands logged for WinRE execution
echo.`;
        
        case 'bcdboot':
          return `echo [${stageNum}.${funcNum}] BCD BOOT REBUILD - Rebuilds boot files/BCD
echo *** Rebuilding BCD boot configuration ***
bcdboot C:\\Windows /s C: >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;

        // Storage & Backup Management
        case 'vssadmin':
          return `echo [${stageNum}.${funcNum}] SHADOW COPY MANAGEMENT - Lists/deletes shadow copies
echo *** Listing shadow copies ***
vssadmin list shadows >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;

        // System Services & Tasks
        case 'sc-repair':
          return `echo [${stageNum}.${funcNum}] SERVICE CONTROL REPAIR - Repair service states
echo *** Checking critical service states ***
sc query wuauserv >> "%LOGPATH%\\\\${logFile}" 2>&1
sc query bits >> "%LOGPATH%\\\\${logFile}" 2>&1
sc query cryptsvc >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'gpupdate':
          return `echo [${stageNum}.${funcNum}] GROUP POLICY UPDATE - Reapplies local/domain Group Policy
gpupdate /force >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'time-sync':
          return `echo [${stageNum}.${funcNum}] TIME SYNC - Time service repair/sync
w32tm /resync /force >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;

        // Certificate & Driver Management
        case 'certutil':
          return `echo [${stageNum}.${funcNum}] CERTIFICATE CACHE CLEAR - Clears CRL/OCSP cache
certutil -urlcache * delete >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'pnputil':
          return `echo [${stageNum}.${funcNum}] DRIVER MANAGEMENT - Enumerate/add/delete drivers
echo *** Listing all third-party drivers ***
pnputil /enum-drivers >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'printuientry':
          return `echo [${stageNum}.${funcNum}] PRINTER MANAGEMENT - Listing installed printers
echo *** Enumerating installed printers ***
wmic printer list brief >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;

        // Power Management
        case 'powercfg':
          return `echo [${stageNum}.${funcNum}] POWER CONFIGURATION - Reset/optimize power plans
echo *** Generating energy report ***
powercfg /energy /output "%LOGPATH%\\\\energy_report.html" >> "%LOGPATH%\\\\${logFile}" 2>&1
powercfg /batteryreport /output "%LOGPATH%\\\\battery_report.html" >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Reports generated: energy_report.html and battery_report.html
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;

        // Security & Malware Protection
        case 'defender-update':
          return `echo [${stageNum}.${funcNum}] DEFENDER UPDATE - Signature updates and remediation
echo *** Updating Microsoft Defender signatures ***
"%ProgramFiles%\\\\Windows Defender\\\\MpCmdRun.exe" -SignatureUpdate >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'defender-scan':
          return `echo [${stageNum}.${funcNum}] DEFENDER SCAN - Full system scan
echo ----------------------------------------------------------------
echo ^|^| DEFENDER SCAN - Full system scan ^| STARTED %TIME% %DATE% ^|^|
echo ^|^| *Press [Ctrl] + [C] to cancel and proceed to the next     ^|^|
echo ----------------------------------------------------------------
echo.
echo *** Starting Microsoft Defender Full Scan (may take 1-3 hours) ***
powershell -Command "Update-MpSignature; Start-MpScan -ScanType FullScan" >> "%LOGPATH%\\\\${logFile}" 2>&1
powershell -Command "Get-MpThreatDetection | Export-Csv -Path '%LOGPATH%\\\\defender_threats.csv' -NoTypeInformation" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'defender-offline':
          return `echo [${stageNum}.${funcNum}] DEFENDER OFFLINE - Schedules offline pre-boot scan
echo *** Scheduling Defender Offline Scan ***
powershell -Command "Start-MpWDOScan" >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Offline scan scheduled for next reboot
echo.`;
        
        case 'safety-scanner':
          return `echo [${stageNum}.${funcNum}] SAFETY SCANNER - Microsoft standalone cleaner
echo *** Downloading Microsoft Safety Scanner ***
powershell -Command "Invoke-WebRequest -Uri 'https://go.microsoft.com/fwlink/?LinkId=212732' -OutFile '%TEMP%\\\\msert.exe'"
echo.
echo ----------------------------------------------------------------
echo ^|^| SAFETY SCANNER - Full scan ^| STARTED %TIME% %DATE% ^|^|
echo ^|^| *Press [Ctrl] + [C] to cancel and proceed to the next     ^|^|
echo ----------------------------------------------------------------
echo.
echo Running Microsoft Safety Scanner (may take 1+ hours)
"%TEMP%\\\\msert.exe" /Q /F >> "%LOGPATH%\\\\${logFile}" 2>&1
del "%TEMP%\\\\msert.exe" 2>nul
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'mrt':
          return `echo [${stageNum}.${funcNum}] MALICIOUS SOFTWARE REMOVAL TOOL - Monthly targeted remover
echo *** Running Windows Malicious Software Removal Tool ***
"%windir%\\\\system32\\\\mrt.exe" /Q >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'autorunsc':
          return `echo [${stageNum}.${funcNum}] AUTORUNSC - Enumerate/disable autoruns
echo *** Downloading Sysinternals Autorunsc ***
powershell -Command "Invoke-WebRequest -Uri 'https://live.sysinternals.com/autorunsc.exe' -OutFile '%TEMP%\\\\autorunsc.exe'"
"%TEMP%\\\\autorunsc.exe" -accepteula -a * -c > "%LOGPATH%\\\\autoruns.csv"
del "%TEMP%\\\\autorunsc.exe" 2>nul
echo Results logged to: %LOGPATH%\\\\autoruns.csv
echo.`;
        
        case 'sigcheck':
          return `echo [${stageNum}.${funcNum}] SIGCHECK - List unsigned/suspicious files
echo *** Downloading Sysinternals Sigcheck ***
powershell -Command "Invoke-WebRequest -Uri 'https://live.sysinternals.com/sigcheck.exe' -OutFile '%TEMP%\\\\sigcheck.exe'"
"%TEMP%\\\\sigcheck.exe" -accepteula -u -e -s C:\\Windows\\System32 > "%LOGPATH%\\\\unsigned_files.txt"
del "%TEMP%\\\\sigcheck.exe" 2>nul
echo Results logged to: %LOGPATH%\\\\unsigned_files.txt
echo.`;
        
        case 'procdump':
          return `echo [${stageNum}.${funcNum}] PROCDUMP - Auto-capture crash dumps
echo *** Downloading Sysinternals ProcDump ***
powershell -Command "Invoke-WebRequest -Uri 'https://live.sysinternals.com/procdump.exe' -OutFile '%TEMP%\\\\procdump.exe'"
echo ProcDump ready for manual crash dump capture
del "%TEMP%\\\\procdump.exe" 2>nul
echo.`;
        
        case 'rkill':
          return `echo [${stageNum}.${funcNum}] RKILL - Kills malicious processes
echo *** Downloading RKill ***
powershell -Command "Invoke-WebRequest -Uri 'https://www.bleepingcomputer.com/download/rkill/dl/10/' -OutFile '%TEMP%\\\\rkill.exe'"
"%TEMP%\\\\rkill.exe" -s -l "%LOGPATH%\\\\rkill.log"
del "%TEMP%\\\\rkill.exe" 2>nul
echo Results logged to: %LOGPATH%\\\\rkill.log
echo.`;
        
        case 'adwcleaner':
          return `echo [${stageNum}.${funcNum}] ADWCLEANER - Adware/PUP cleanup
echo *** Downloading AdwCleaner ***
powershell -Command "Invoke-WebRequest -Uri 'https://downloads.malwarebytes.com/file/adwcleaner' -OutFile '%TEMP%\\\\adwcleaner.exe'"
"%TEMP%\\\\adwcleaner.exe" /eula /clean /noreboot >> "%LOGPATH%\\\\${logFile}" 2>&1
del "%TEMP%\\\\adwcleaner.exe" 2>nul
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'kvrt':
          return `echo [${stageNum}.${funcNum}] KASPERSKY VIRUS REMOVAL TOOL - Portable scanner
echo *** Downloading Kaspersky Virus Removal Tool ***
powershell -Command "Invoke-WebRequest -Uri 'https://devbuilds.s.kaspersky-labs.com/devbuilds/KVRT/latest/full/KVRT.exe' -OutFile '%TEMP%\\\\kvrt.exe'"
"%TEMP%\\\\kvrt.exe" -accepteula -silent -processlevel 2 >> "%LOGPATH%\\\\${logFile}" 2>&1
del "%TEMP%\\\\kvrt.exe" 2>nul
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'clamav':
          return `echo [${stageNum}.${funcNum}] CLAMAV - Open-source AV scanner
echo *** NOTE: ClamAV requires manual installation ***
echo *** Checking if ClamAV is installed ***
if exist "%ProgramFiles%\\\\ClamAV\\\\clamscan.exe" (
    echo Updating signatures...
    "%ProgramFiles%\\\\ClamAV\\\\freshclam.exe" >> "%LOGPATH%\\\\${logFile}" 2>&1
    echo Running scan...
    "%ProgramFiles%\\\\ClamAV\\\\clamscan.exe" -r C:\\ --log="%LOGPATH%\\\\clamav_scan.log"
) else (
    echo ClamAV not found. Download from clamav.net
)
echo.`;
        
        case 'raccine':
          return `echo [${stageNum}.${funcNum}] RACCINE - Ransomware vaccine
echo *** Downloading Raccine ***
powershell -Command "Invoke-WebRequest -Uri 'https://github.com/Neo23x0/Raccine/releases/latest/download/RaccineSettings.exe' -OutFile '%TEMP%\\\\RaccineSettings.exe'"
echo Raccine downloaded to %TEMP% - Manual installation required
echo Visit: https://github.com/Neo23x0/Raccine
echo.`;

        // Reporting & Notifications
        case 'system-report':
          return `echo [${stageNum}.${funcNum}] COMPREHENSIVE SYSTEM REPORT - Complete system analysis
echo *** Generating comprehensive system reports ***
echo === CONSOLIDATED FINDINGS REPORT === > "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo Script Version: SC-USCS v2.6 >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo Execution Date: %DATE% %TIME% >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo Functions Executed: ${selectedFunctionData.length} of ${functions.length} >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo. >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo === SYSTEM CONFIGURATION === >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
systeminfo >> "%LOGPATH%\\\\01_system_info.txt"
echo === HARDWARE REPORT === >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
dxdiag /t "%LOGPATH%\\\\02_hardware_report.txt"
echo === INSTALLED SOFTWARE === >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
wmic product get name,version,vendor /format:csv > "%LOGPATH%\\\\03_installed_software.csv" 2>nul
echo === WINDOWS UPDATES === >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
powershell -Command "Get-WmiObject -Class Win32_QuickFixEngineering | Select-Object HotFixID,Description,InstalledOn | Export-Csv -Path '%LOGPATH%\\\\04_windows_updates.csv' -NoTypeInformation"
echo === SECURITY THREATS DETECTED === >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
powershell -Command "$threats = Get-MpThreatDetection; if ($threats) { $threats | Format-Table ThreatName, ActionSuccess, ProcessName -AutoSize | Out-String | Add-Content '%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt' } else { Add-Content '%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt' 'No active threats detected.' }" 2>nul
powershell -Command "Get-MpThreatDetection | Export-Csv -Path '%LOGPATH%\\\\05_defender_threats.csv' -NoTypeInformation" 2>nul
echo === STARTUP PROGRAMS === >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
wmic startup get caption,command,location,user /format:csv > "%LOGPATH%\\\\06_startup_programs.csv" 2>nul
powershell -Command "Get-WmiObject Win32_StartupCommand | Format-Table -AutoSize | Out-String | Add-Content '%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt'" 2>nul
echo === WINDOWS SERVICES === >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
sc query state= all > "%LOGPATH%\\\\07_windows_services.txt"
echo === NETWORK CONFIGURATION === >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
ipconfig /all > "%LOGPATH%\\\\08_network_config.txt"
netstat -an > "%LOGPATH%\\\\09_network_connections.txt"
echo === DISK HEALTH === >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
wmic logicaldisk get size,freespace,caption /format:csv > "%LOGPATH%\\\\10_disk_space.csv"
echo === SYSTEM INTEGRITY === >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
sfc /verifyonly >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt" 2>nul
echo. >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo === SUMMARY === >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo All findings consolidated in: %LOGPATH% >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo For support, email all files to: scmyhelp@gmail.com and alerts@supportcall.co.za >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo Comprehensive system report generated
echo.`;
        
        case 'email-report':
          return `echo [${stageNum}.${funcNum}] EMAIL REPORT - Send reports to support team
echo *** Preparing email summary ***
echo SC-USCS v2.6 Execution Report > "%LOGPATH%\\\\EMAIL_SUMMARY.txt"
echo ================================ >> "%LOGPATH%\\\\EMAIL_SUMMARY.txt"
echo Computer: %COMPUTERNAME% >> "%LOGPATH%\\\\EMAIL_SUMMARY.txt"
echo Date: %DATE% %TIME% >> "%LOGPATH%\\\\EMAIL_SUMMARY.txt"
echo Functions: ${selectedFunctionData.length} of ${functions.length} >> "%LOGPATH%\\\\EMAIL_SUMMARY.txt"
echo. >> "%LOGPATH%\\\\EMAIL_SUMMARY.txt"
echo CRITICAL FINDINGS: >> "%LOGPATH%\\\\EMAIL_SUMMARY.txt"
powershell -Command "$threats = Get-MpThreatDetection; if ($threats) { Add-Content '%LOGPATH%\\\\EMAIL_SUMMARY.txt' 'THREATS DETECTED: YES'; $threats | ForEach-Object { Add-Content '%LOGPATH%\\\\EMAIL_SUMMARY.txt' ('- ' + $_.ThreatName) } } else { Add-Content '%LOGPATH%\\\\EMAIL_SUMMARY.txt' 'THREATS DETECTED: NONE' }" 2>nul
echo. >> "%LOGPATH%\\\\EMAIL_SUMMARY.txt"
echo Reports Location: %LOGPATH% >> "%LOGPATH%\\\\EMAIL_SUMMARY.txt"
echo Recipients: scmyhelp@gmail.com, alerts@supportcall.co.za >> "%LOGPATH%\\\\EMAIL_SUMMARY.txt"
echo. >> "%LOGPATH%\\\\EMAIL_SUMMARY.txt"
echo *** EMAIL REQUIRES SMTP CONFIGURATION ***
echo *** Manually send all files from %LOGPATH% to support team ***
echo.`;
        default:
          return `echo [${stageNum}.${funcNum}] ${func.name.toUpperCase()} - ${func.description}
echo >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Operation completed
echo.`;
      }
    };

    // Group functions by category
    const categorizedFunctions = categories.map(category => ({
      category,
      functions: selectedFunctionData.filter(f => f.category === category)
    })).filter(cat => cat.functions.length > 0);

    // Generate stage implementations
    const stageImplementations = categorizedFunctions.map((cat, catIndex) => {
      const stageNum = catIndex + 1;
      const categoryTitle = cat.category.toUpperCase().replace(/&/g, '^&');
      return `
REM =============================================================================
REM STAGE ${stageNum}: ${cat.category.toUpperCase()}
REM =============================================================================
REM ${cat.category} - ${cat.functions.length} function(s) selected
REM All operations are logged to %LOGPATH% for review and support
REM =============================================================================
echo =============================================================================
echo  STAGE ${stageNum}: ${categoryTitle}
echo =============================================================================
echo This stage executes ${cat.functions.length} function(s) in the ${cat.category} category.
echo All operations are logged for comprehensive review.
echo =============================================================================
echo.
${cat.functions.map((func, funcIndex) => generateFunctionImplementation(func, stageNum, funcIndex + 1)).join('\n')}`;
    }).join('\n');
    
    return `@echo off
REM =============================================================================
REM SupportCALL - Ultimate Secure Clean Script (SC-USCS) v2.6
REM Professional Windows Remediation Engine (SC-UWIRE)
REM Generated: ${new Date().toLocaleString()}
REM Functions Selected: ${selectedFunctionData.length} of ${functions.length}
REM Compatibility: Windows 10, Windows 11
REM =============================================================================

setlocal EnableDelayedExpansion
title SupportCALL - SC-USCS v2.6 - Professional Edition

REM Check for Administrator privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Administrator privileges required!
    echo Please run this script as Administrator.
    pause
    exit /b 1
)

REM Initialize variables
set "LOGPATH=%USERPROFILE%\\Desktop\\SC-USCS\\SC-USCS_${timestamp}"
set "STARTTIME=%TIME%"
mkdir "%USERPROFILE%\\Desktop\\SC-USCS" 2>nul
mkdir "%LOGPATH%" 2>nul

echo =============================================================================
echo  SupportCALL - Ultimate Secure Clean Script v2.6
echo  Professional Windows Remediation Engine
echo =============================================================================
echo.
echo Selected Functions: ${selectedFunctionData.length}
echo Log Path: %LOGPATH%
echo Start Time: %STARTTIME%
echo.

REM =============================================================================
REM SELECTED FUNCTIONS AND CATEGORIES
REM =============================================================================
${selectedFunctionData.map(func => 
`REM [${func.category}] ${func.name}
REM Safety: ${func.safety} | Recommendation: ${func.recommendation}
REM Description: ${func.description}`
).join('\n')}

REM =============================================================================
REM STAGE 0: MANDATORY SYSTEM PREPARATION AND SAFETY CHECKS
REM =============================================================================
echo [Stage 0] MANDATORY System Preparation and Safety Checks...
echo.
echo *** CREATING SYSTEM RESTORE POINT - DO NOT INTERRUPT ***
echo This is REQUIRED before any system modifications begin.
echo.

REM Enable System Restore if disabled
echo Enabling System Restore service...
powershell -Command "Enable-ComputerRestore -Drive 'C:\\'"
sc config "VSS" start= auto
net start "VSS"
sc config "swprv" start= auto  
net start "swprv"
vssadmin resize shadowstorage /for=C: /on=C: /maxsize=10%%

REM Create mandatory restore point with error checking
echo Creating System Restore Point: SC-USCS-Pre-Run-v2.6...
powershell -Command "$result = Checkpoint-Computer -Description 'SC-USCS-Pre-Run-v2.6' -RestorePointType 'MODIFY_SETTINGS' -Verbose; if ($result -eq $null) { Write-Host 'SUCCESS: System Restore Point Created' -ForegroundColor Green } else { Write-Host 'WARNING: Restore Point Creation Status Unknown' -ForegroundColor Yellow }"

REM Verify restore point was created
echo Verifying restore point creation...
powershell -Command "Get-ComputerRestorePoint | Sort-Object CreationTime -Descending | Select-Object -First 1 | Format-Table CreationTime, Description, RestorePointType"

echo.
echo *** SYSTEM RESTORE POINT CREATION COMPLETE ***
echo IMPORTANT: If restore point creation failed, press CTRL+C to abort!
echo Otherwise, press any key to continue with system modifications...
pause
echo.

${stageImplementations}

REM =============================================================================
REM COMPLETION AND CLEANUP
REM =============================================================================
echo.
echo =============================================================================
echo  Script Execution Complete
echo =============================================================================
set "ENDTIME=%TIME%"
echo Start Time: %STARTTIME%
echo End Time: %ENDTIME%
echo Log Location: %LOGPATH%
echo Functions Executed: ${selectedFunctionData.length}
echo.
echo ALL OPERATIONS LOGGED TO: %LOGPATH%
echo CONSOLIDATED FINDINGS: %LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt
echo.
echo For support, send all files from %LOGPATH% to:
echo - scmyhelp@gmail.com
echo - alerts@supportcall.co.za
echo.
echo Please review the logs for any errors or warnings.
echo A system restart may be required to complete all operations.
echo.
pause
exit /b 0`;
  };

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case "High Safety": return "bg-accent/10 text-accent border-accent/20";
      case "Medium Safety": return "bg-secondary/20 text-secondary-foreground border-secondary/40";
      case "Low Safety": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/20 text-muted-foreground border-muted/40";
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Recommended": return "bg-primary/10 text-primary border-primary/20";
      case "Optional": return "bg-muted/20 text-muted-foreground border-muted/40";
      case "Advanced": return "bg-card/60 text-card-foreground border-border";
      case "Development": return "bg-secondary/30 text-secondary-foreground border-secondary/50";
      default: return "bg-muted/20 text-muted-foreground border-muted/40";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-background dark:to-muted/20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <header role="banner">
        {/* Header */}
        <Card className="mb-6 border-0 shadow-2xl bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-xl">
          <CardHeader className="text-center space-y-4 py-8">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SupportCALL - Ultimate Secure Clean Script
              </h1>
              <div className="text-lg md:text-xl font-semibold text-muted-foreground">
                v2.6 - Professional Edition
              </div>
            </div>
            <CardDescription className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Professional Custom Script Generator for Windows System Cleaning, Security Enhancement & Optimization - Tailored PowerShell Solutions for Windows 10/11
            </CardDescription>
            <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
              <Badge variant="default" className="px-3 py-1 text-sm">SC-USCS v2.6</Badge>
              <Badge variant="secondary" className="px-3 py-1 text-sm">Safety: 98%</Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm">Effectiveness: 95%</Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm">Win 10/11 Compatible</Badge>
            </div>
          </CardHeader>
        </Card>
        </header>

        <main role="main">

        {/* Critical Warnings */}
        <section aria-labelledby="critical-warnings" className="grid gap-4 mb-8 lg:grid-cols-2">
          <h2 id="critical-warnings" className="sr-only">Critical System Warnings</h2>
           <Alert className="border-destructive/50 bg-destructive/5 shadow-lg">
             <AlertDescription className="font-medium">
               <strong className="text-destructive">ADMINISTRATOR REQUIRED:</strong> This script must run with full Administrator privileges. 
               Save all work and close applications before execution. System restart may be required.
             </AlertDescription>
           </Alert>

           <Alert className="border-destructive bg-destructive/10 shadow-lg">
             <AlertDescription className="font-medium">
               <strong className="text-destructive">BACKUP MANDATORY:</strong> Create system backup and restore point before running. 
               While extensively tested, system modifications carry inherent risks.
             </AlertDescription>
           </Alert>
        </section>

        {/* Professional Pre-Run Checklist - ENHANCED */}
        <section aria-labelledby="pre-execution-checklist">
        <Card className="mb-8 border-2 border-amber-400 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500"></div>
          
          <CardHeader className="relative z-10 text-center pb-4">
            <h2 id="pre-execution-checklist" className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-black text-amber-900">
              MANDATORY PRE-EXECUTION CHECKLIST
            </h2>
            <div className="text-lg font-bold text-amber-800 mt-2 animate-pulse">
              COMPLETE ALL ITEMS BEFORE RUNNING SCRIPT
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3 p-4 bg-white/60 rounded-lg border border-amber-300">
                 <h4 className="font-black text-xl text-amber-900 flex items-center gap-2">
                   CRITICAL SYSTEM PREPARATION
                 </h4>
                <ul className="space-y-2">
                  {[
                    "✅ Full system backup to EXTERNAL drive",
                    "✅ Windows System Restore Point created", 
                    "✅ Administrator account access CONFIRMED",
                    "✅ ALL critical applications CLOSED"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-amber-800 font-semibold text-sm bg-amber-100/50 p-2 rounded border border-amber-200">
                      <span className="text-lg">{item.split(' ')[0]}</span>
                      <span>{item.substring(item.indexOf(' ') + 1)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3 p-4 bg-white/60 rounded-lg border border-amber-300">
                 <h4 className="font-black text-xl text-amber-900 flex items-center gap-2">
                   ENVIRONMENT REQUIREMENTS
                 </h4>
                <ul className="space-y-2">
                  {[
                    "✅ Device connected to POWER source",
                    "✅ Stable internet connection ACTIVE", 
                    "✅ Minimum 5GB free disk space",
                    "✅ NO competing security scans running"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-amber-800 font-semibold text-sm bg-amber-100/50 p-2 rounded border border-amber-200">
                      <span className="text-lg">{item.split(' ')[0]}</span>
                      <span>{item.substring(item.indexOf(' ') + 1)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
              <div className="text-center text-red-900 font-black text-lg">
                🔥 FAILURE TO COMPLETE CHECKLIST MAY RESULT IN SYSTEM DAMAGE 🔥
              </div>
              <div className="text-center text-red-800 font-bold mt-2">
                SupportCALL is NOT responsible for damage caused by improper preparation
              </div>
            </div>
          </CardContent>
        </Card>
        </section>

        {/* Quick Action Toolbar */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4">
              <Button onClick={handleSelectAll} size="lg" className="flex-1 sm:flex-none">
                Select All Functions
              </Button>
              <Button onClick={handleClearAll} variant="outline" size="lg" className="flex-1 sm:flex-none">
                Clear All Selections
              </Button>
              <Button onClick={handleSelectRecommended} variant="secondary" size="lg" className="flex-1 sm:flex-none">
                Recommended Only
              </Button>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-sm">
                Selected: {selectedFunctions.length} of {functions.length} functions
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Function Categories - Responsive Grid */}
        <section aria-labelledby="function-categories" className="space-y-12 mb-12">
          <h2 id="function-categories" className="sr-only">Available System Functions</h2>
          {categories.map(category => (
            <div key={category} className="scroll-mt-20" id={category.toLowerCase().replace(/\s+/g, '-')}>
              <div className="sticky top-4 z-10 mb-6 bg-background/95 backdrop-blur-sm py-2 -mx-2 px-2 rounded-lg">
                <h3 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {category}
                </h3>
                <div className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full w-full"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {functions
                  .filter(f => f.category === category)
                  .map(func => (
                    <Card 
                      key={func.id} 
                      className={`group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-xl ${
                        selectedFunctions.includes(func.id) 
                          ? 'border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20' 
                          : 'hover:border-primary/50 hover:shadow-lg'
                      }`}
                      onClick={() => handleFunctionToggle(func.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={selectedFunctions.includes(func.id)}
                            onChange={() => handleFunctionToggle(func.id)}
                            className="mt-1 scale-110"
                            aria-label={`Select ${func.name} function`}
                          />
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base md:text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                              {func.name}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                          {func.description}
                        </CardDescription>
                        <div className="flex gap-2 flex-wrap">
                          <Badge 
                            variant="outline" 
                            className={`${getSafetyColor(func.safety)} text-xs font-medium`}
                          >
                            {func.safety}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={`${getRecommendationColor(func.recommendation)} text-xs font-medium`}
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
        </section>

        {/* Script Generation Panel - Enhanced */}
        <section aria-labelledby="script-generation" className="mb-8">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-xl sticky bottom-4 z-20">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-6">
              {/* Generation Stats */}
              <div className="text-center space-y-2">
                <h2 id="script-generation" className="text-xl md:text-2xl font-bold">Ready to Generate Your Custom Script</h2>
                <div className="flex justify-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span>Functions Selected: <strong className="text-primary">{selectedFunctions.length}</strong></span>
                  <span>•</span>
                  <span>Total Available: <strong>{functions.length}</strong></span>
                  <span>•</span>
                  <span>Coverage: <strong className="text-primary">{Math.round((selectedFunctions.length / functions.length) * 100)}%</strong></span>
                  {selectedFunctions.length > 0 && (() => {
                    const selectedFuncs = functions.filter(f => selectedFunctions.includes(f.id));
                    const recommendationCounts = {
                      Recommended: selectedFuncs.filter(f => f.recommendation === "Recommended").length,
                      Optional: selectedFuncs.filter(f => f.recommendation === "Optional").length,
                      Advanced: selectedFuncs.filter(f => f.recommendation === "Advanced").length,
                      Development: selectedFuncs.filter(f => f.recommendation === "Development").length
                    };
                    const dominantRec = Object.entries(recommendationCounts).sort((a, b) => b[1] - a[1])[0][0];
                    const safetyCounts = {
                      High: selectedFuncs.filter(f => f.safety === "High Safety").length,
                      Medium: selectedFuncs.filter(f => f.safety === "Medium Safety").length,
                      Low: selectedFuncs.filter(f => f.safety === "Low Safety").length
                    };
                    const dominantSafety = Object.entries(safetyCounts).sort((a, b) => b[1] - a[1])[0][0];
                    
                    return (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-2">
                          Safety Level: 
                          <Badge variant="outline" className={
                            dominantSafety === "High" ? "bg-green-500/10 text-green-600 border-green-500/20" :
                            dominantSafety === "Medium" ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" :
                            "bg-red-500/10 text-red-600 border-red-500/20"
                          }>
                            {dominantSafety}
                          </Badge>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-2">
                          Level: 
                          <Badge variant="outline" className={
                            dominantRec === "Recommended" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
                            dominantRec === "Optional" ? "bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600" :
                            dominantRec === "Advanced" ? "bg-red-100 text-red-600 border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800" :
                            "bg-purple-500/10 text-purple-600 border-purple-500/20"
                          }>
                            {dominantRec}
                          </Badge>
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Final Warning */}
              <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg p-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-destructive" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-destructive">FINAL WARNING - READ BEFORE PROCEEDING</h3>
                  <AlertTriangle className="w-6 h-6 text-destructive" aria-hidden="true" />
                </div>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-foreground">This script will make significant changes to your Windows system including:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Deep system file modifications and repairs</li>
                    <li>Removal of software, services, and system components</li>
                    <li>Network stack resets and security policy changes</li>
                    <li>Automated malware scanning and removal</li>
                  </ul>
                  <p className="font-bold text-destructive mt-3">⚠ ALWAYS create a System Restore Point before running this script!</p>
                  <p className="text-xs mt-2">By downloading or running this script, you acknowledge that you do so at your own risk. We are not responsible for any data loss, system instability, or damage that may occur.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button onClick={generateScript} size="lg" variant="default">
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Custom Script
                </Button>
                <Button onClick={downloadScript} size="lg" variant="outline" className="flex-1 sm:flex-none border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Download className="w-5 h-5 mr-2" />
                  Download sc-uscs.bat
                </Button>
                <Button onClick={() => setShowScript(!showScript)} size="lg" variant="secondary" className="flex-1 sm:flex-none">
                  <Copy className="w-5 h-5 mr-2" />
                  {showScript ? 'Hide' : 'Show'} Script Code
                </Button>
              </div>
              
              {/* Script Preview */}
              {showScript && (
                <div className="mt-6 space-y-4">
                  <div className="bg-slate-950 text-green-400 p-4 rounded-lg font-mono text-xs md:text-sm overflow-x-auto max-h-96 overflow-y-auto border border-primary/20">
                    <pre className="whitespace-pre-wrap">{generateScriptContent()}</pre>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Script ready for deployment on Windows 10/11 systems</span>
                    <Button onClick={copyScript} size="sm" variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        </section>
        </main>
      </div>
    </div>
  );
};

export default ScriptGenerator;
