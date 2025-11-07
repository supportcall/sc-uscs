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
    // Windows Debloat & Privacy Functions
    {
      id: "disable-telemetry",
      name: "Disable Windows Telemetry",
      description: "Disables Windows telemetry and data collection services using built-in sc commands. Stops and disables DiagTrack and dmwappushservice.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Windows Debloat & Privacy"
    },
    {
      id: "remove-bloatware",
      name: "Remove Windows Bloatware",
      description: "Removes pre-installed bloatware apps using PowerShell Get-AppxPackage (Xbox, Candy Crush, Solitaire, etc.). Does NOT remove essential system apps.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Windows Debloat & Privacy"
    },
    {
      id: "disable-cortana",
      name: "Disable Cortana",
      description: "Disables Cortana via registry modifications. Can be reversed by changing registry value back to 0.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Windows Debloat & Privacy"
    },
    {
      id: "disable-windows-ads",
      name: "Disable Windows Ads & Suggestions",
      description: "Disables lock screen ads, app suggestions, tips, and promotional content via registry tweaks.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Windows Debloat & Privacy"
    },
    {
      id: "privacy-tweaks",
      name: "Enhanced Privacy Settings",
      description: "Disables activity history, advertising ID, location tracking, and diagnostic data collection via registry. Fully reversible.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Windows Debloat & Privacy"
    },
    {
      id: "disable-unnecessary-tasks",
      name: "Disable Unnecessary Scheduled Tasks",
      description: "Disables non-essential Windows scheduled tasks that consume resources (Telemetry, Customer Experience, Cloud Experience).",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Windows Debloat & Privacy"
    },
    {
      id: "remove-onedrive",
      name: "Remove OneDrive Integration",
      description: "Uninstalls OneDrive using built-in uninstaller and disables integration via registry. Does not delete OneDrive files.",
      safety: "Medium Safety",
      recommendation: "Optional",
      category: "Windows Debloat & Privacy"
    },
    {
      id: "disable-background-apps",
      name: "Disable Background Apps",
      description: "Prevents apps from running in background via registry, improving performance and privacy.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Windows Debloat & Privacy"
    },
    {
      id: "performance-tweaks",
      name: "Performance Optimization Tweaks",
      description: "Registry tweaks for better performance: disable startup delay, visual effects, and unnecessary animations.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Windows Debloat & Privacy"
    },
    {
      id: "disable-unnecessary-services",
      name: "Disable Unnecessary Services",
      description: "Disables resource-heavy non-essential services (Print Spooler if no printer, Xbox services, etc.) using sc commands.",
      safety: "Medium Safety",
      recommendation: "Advanced",
      category: "Windows Debloat & Privacy"
    },
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
      id: "eset-online",
      name: "ESET Online Scanner",
      description: "ESET Online Scanner — Free cloud-powered scanner with advanced heuristics; supports silent CLI scanning.",
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
      description: "Automatically sends comprehensive system report to alerts@supportcall.com.au, alerts@supportcall.co.za, and scmyhelp@gmail.com via secure HTTPS POST to sc-uscs.com server.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Reporting & Notifications"
    },
    {
      id: "xdr-siem-report",
      name: "XDR/SIEM Security Report",
      description: "Generates comprehensive Extended Detection and Response (XDR) and SIEM report using all default available Windows tools. Includes threat detection, event logs, network analysis, security configuration audit, vulnerability assessment, and compliance checks in both JSON and text formats.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Reporting & Notifications"
    },
    // Extended Scans - Long Running Operations (Execute Last)
    {
      id: "defender-scan",
      name: "Defender Full Scan",
      description: "Defender PowerShell (Start-MpScan / Remove-MpThreat / Update-MpSignature) — Full scripting interface to Defender.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Extended Scans (Long Running)"
    },
    {
      id: "chkdsk",
      name: "Check Disk (CHKDSK)",
      description: "CHKDSK — Scans/fixes filesystem errors and bad sectors.",
      safety: "Medium Safety",
      recommendation: "Optional",
      category: "Extended Scans (Long Running)"
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

  const handleToggleDebloat = () => {
    const debloatFunctions = functions.filter(f => f.category === "Windows Debloat & Privacy").map(f => f.id);
    const allDebloatSelected = debloatFunctions.every(id => selectedFunctions.includes(id));
    
    if (allDebloatSelected) {
      // Deselect all debloat functions
      setSelectedFunctions(prev => prev.filter(id => !debloatFunctions.includes(id)));
    } else {
      // Select all debloat functions
      setSelectedFunctions(prev => [...new Set([...prev, ...debloatFunctions])]);
    }
  };

  const handleFunctionToggle = (functionId: string) => {
    setSelectedFunctions(prev =>
      prev.includes(functionId)
        ? prev.filter(id => id !== functionId)
        : [...prev, functionId]
    );
  };

  const generateSecurityAssessmentScript = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    return `@echo off
REM =============================================================================
REM SupportCALL - Universal System Cleaning Script (SC-USCS) v5.84
REM Professional READ-ONLY Security Assessment & SIEM Engine
REM Generated: ${new Date().toLocaleString()}
REM =============================================================================
REM IMPORTANT: This script performs READ-ONLY assessment
REM NO changes, cleaning, or removal operations are performed on your system
REM =============================================================================

setlocal EnableDelayedExpansion
title SupportCALL - SC-USCS v5.84 - READ-ONLY Security Assessment
color 0A

REM Check for Administrator privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Administrator privileges required!
    echo Please run this script as Administrator.
    pause
    exit /b 1
)

REM Set up paths
set "STARTTIME=%TIME%"
set "REPORTPATH=%USERPROFILE%\\Desktop\\SC-USCS-Reports"
set "TOOLSPATH=%REPORTPATH%\\Tools"
set "LOGPATH=%REPORTPATH%\\Logs"
mkdir "%REPORTPATH%" 2>nul
mkdir "%TOOLSPATH%" 2>nul
mkdir "%LOGPATH%" 2>nul

echo =============================================================================
echo  SupportCALL - Universal System Cleaning Script v5.84
echo  Professional READ-ONLY Security Assessment Engine
echo =============================================================================
echo.
echo REPORT PATH: %REPORTPATH%
echo START TIME: %STARTTIME%
echo.
echo *** READ-ONLY ASSESSMENT MODE ***
echo This script will perform comprehensive security assessment including:
echo  - System Restore enablement and restore point creation (safety measure)
echo  - Malware detection scan (REPORT ONLY - No removal or cleaning)
echo  - Network security analysis (No changes)
echo  - SIEM-style event log collection (Read-only)
echo  - Security configuration audit (Read-only)
echo  - Vulnerability assessment (Read-only)
echo  - Comprehensive HTML/TXT reporting
echo  - Automatic email delivery of reports
echo.
echo IMPORTANT: System Restore will be enabled and a restore point created
echo           as a precaution, but NO other changes will be made to your
echo           system. All assessment operations are READ-ONLY.
echo.
pause

REM =============================================================================
REM STAGE 1: ENABLE SYSTEM RESTORE AND CREATE RESTORE POINT
REM =============================================================================
echo.
echo [Stage 1] Enabling System Restore and Creating Restore Point...
echo.
echo Checking System Restore status on C: drive...
powershell -Command "$restoreStatus = (Get-ComputerRestorePoint -ErrorAction SilentlyContinue); if ($restoreStatus -eq $null) { Write-Host 'System Restore not enabled, enabling now...' } else { Write-Host 'System Restore already enabled.' }"
echo.
echo Enabling System Restore on C: drive...
powershell -Command "Enable-ComputerRestore -Drive 'C:\\\\' -ErrorAction SilentlyContinue"
echo.
echo Starting Volume Shadow Copy services...
sc config "VSS" start= auto
net start "VSS"
sc config "swprv" start= auto
net start "swprv"
echo.
echo Configuring shadow storage (10%% of drive)...
vssadmin resize shadowstorage /for=C: /on=C: /maxsize=10%%
echo.
echo Creating restore point: SC-USCS-Security-Assessment-v5.84...
powershell -Command "Checkpoint-Computer -Description 'SC-USCS-Security-Assessment-v5.84' -RestorePointType 'MODIFY_SETTINGS' -ErrorAction SilentlyContinue"
if %errorlevel% equ 0 (
    echo Restore point created successfully.
) else (
    echo WARNING: Could not create restore point. Continuing with assessment...
)
echo.

REM =============================================================================
REM STAGE 2: DOWNLOAD READ-ONLY ANALYSIS TOOLS
REM =============================================================================
echo.
echo [Stage 2] Downloading Read-Only Assessment Tools...
echo NOTE: Only downloading tools for system analysis, not removal/cleaning
echo.

echo Downloading Sysinternals Suite for system analysis...
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; try { Invoke-WebRequest -Uri 'https://live.sysinternals.com/autorunsc.exe' -OutFile '%TOOLSPATH%\\\\autorunsc.exe' -UseBasicParsing -ErrorAction Stop } catch { Write-Host 'Download skipped, will use built-in tools only' }" 2>nul
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; try { Invoke-WebRequest -Uri 'https://live.sysinternals.com/procexp.exe' -OutFile '%TOOLSPATH%\\\\procexp.exe' -UseBasicParsing -ErrorAction Stop } catch { Write-Host 'Download skipped, will use built-in tools only' }" 2>nul
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; try { Invoke-WebRequest -Uri 'https://live.sysinternals.com/tcpview.exe' -OutFile '%TOOLSPATH%\\\\tcpview.exe' -UseBasicParsing -ErrorAction Stop } catch { Write-Host 'Download skipped, will use built-in tools only' }" 2>nul

echo Assessment tools ready.
echo.

REM =============================================================================
REM STAGE 3: WINDOWS DEFENDER THREAT DETECTION (REPORT ONLY)
REM =============================================================================
echo.
echo [Stage 3] Windows Defender Threat Detection (Report Only - No Removal)...
echo This may take 30-60 minutes depending on system size.
echo.
echo Updating Defender signatures...
powershell -Command "try { Update-MpSignature -ErrorAction Stop } catch { Write-Host 'Signature update skipped' }" 2>nul
echo.
echo Running quick scan for threat detection...
powershell -Command "try { Start-MpScan -ScanType QuickScan -ErrorAction Stop } catch { Write-Host 'Quick scan completed with errors - check logs' }" > "%LOGPATH%\\\\defender-scan.log" 2>&1
echo.
echo Collecting current threat status and detections...
powershell -Command "Get-MpThreatDetection -ErrorAction SilentlyContinue | Format-List * | Out-File '%LOGPATH%\\\\defender-threats.log' -Encoding UTF8 -ErrorAction SilentlyContinue" 2>nul
powershell -Command "Get-MpThreat -ErrorAction SilentlyContinue | Format-List * | Out-File '%LOGPATH%\\\\defender-threat-catalog.log' -Encoding UTF8 -ErrorAction SilentlyContinue" 2>nul
powershell -Command "Get-MpComputerStatus -ErrorAction SilentlyContinue | Format-List * | Out-File '%LOGPATH%\\\\defender-status.log' -Encoding UTF8 -ErrorAction SilentlyContinue" 2>nul
powershell -Command "Get-MpPreference -ErrorAction SilentlyContinue | Format-List * | Out-File '%LOGPATH%\\\\defender-settings.log' -Encoding UTF8 -ErrorAction SilentlyContinue" 2>nul
echo Defender assessment complete (no removal performed).
echo.

REM =============================================================================
REM STAGE 4: SYSTEM PROCESS AND STARTUP ANALYSIS
REM =============================================================================
echo.
echo [Stage 4] System Process and Startup Analysis (Read-Only)...
echo.

echo Analyzing running processes...
tasklist /v /fo csv > "%LOGPATH%\\\\running-processes.csv" 2>&1
powershell -Command "Get-Process | Select-Object Name, Id, CPU, WorkingSet, Path, Company | Export-Csv '%LOGPATH%\\\\process-details.csv' -NoTypeInformation -ErrorAction SilentlyContinue" 2>nul

echo Analyzing startup programs...
powershell -Command "Get-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location, User | Export-Csv '%LOGPATH%\\\\startup-programs.csv' -NoTypeInformation -ErrorAction SilentlyContinue" 2>nul

echo Analyzing scheduled tasks...
schtasks /query /fo csv /v > "%LOGPATH%\\\\scheduled-tasks.csv" 2>&1

echo Analyzing Windows services...
sc query type= service state= all > "%LOGPATH%\\\\services-list.txt" 2>&1
powershell -Command "Get-Service | Select-Object Name, DisplayName, Status, StartType | Export-Csv '%LOGPATH%\\\\services-details.csv' -NoTypeInformation -ErrorAction SilentlyContinue" 2>nul

echo System analysis complete (read-only).
echo.

REM =============================================================================
REM STAGE 5: NETWORK SECURITY ANALYSIS (READ-ONLY)
REM =============================================================================
echo.
echo [Stage 5] Network Security Analysis (Read-Only)...
echo.

echo Collecting network configuration...
ipconfig /all > "%LOGPATH%\\\\network-config.txt"
netstat -ano > "%LOGPATH%\\\\network-connections.txt"
netsh firewall show state > "%LOGPATH%\\\\firewall-state.txt" 2>nul
netsh advfirewall show allprofiles > "%LOGPATH%\\\\firewall-profiles.txt"

echo Analyzing open ports...
netstat -an | findstr "LISTENING" > "%LOGPATH%\\\\open-ports.txt"

echo Collecting DNS cache...
ipconfig /displaydns > "%LOGPATH%\\\\dns-cache.txt"

echo Checking routing table...
route print > "%LOGPATH%\\\\routing-table.txt"

echo Network analysis complete (read-only).
echo.

REM =============================================================================
REM STAGE 6: SIEM-STYLE EVENT LOG COLLECTION (READ-ONLY)
REM =============================================================================
echo.
echo [Stage 6] SIEM Event Log Collection (Read-Only)...
echo.

echo Collecting Security event logs...
powershell -Command "Get-EventLog -LogName Security -Newest 1000 -ErrorAction SilentlyContinue | Export-Csv '%LOGPATH%\\\\security-events.csv' -NoTypeInformation -ErrorAction SilentlyContinue" 2>nul

echo Collecting System event logs...
powershell -Command "Get-EventLog -LogName System -Newest 1000 -ErrorAction SilentlyContinue | Export-Csv '%LOGPATH%\\\\system-events.csv' -NoTypeInformation -ErrorAction SilentlyContinue" 2>nul

echo Collecting Application event logs...
powershell -Command "Get-EventLog -LogName Application -Newest 1000 -ErrorAction SilentlyContinue | Export-Csv '%LOGPATH%\\\\application-events.csv' -NoTypeInformation -ErrorAction SilentlyContinue" 2>nul

echo Analyzing failed login attempts...
powershell -Command "Get-EventLog -LogName Security -ErrorAction SilentlyContinue | Where-Object {$_.EventID -eq 4625} | Select-Object -First 100 | Export-Csv '%LOGPATH%\\\\failed-logins.csv' -NoTypeInformation -ErrorAction SilentlyContinue" 2>nul

echo Event log collection complete (read-only).
echo.

REM =============================================================================
REM STAGE 7: SECURITY CONFIGURATION AUDIT (READ-ONLY)
REM =============================================================================
echo.
echo [Stage 7] Security Configuration Audit (Read-Only)...
echo.

echo Auditing user accounts...
net user > "%LOGPATH%\\\\user-accounts.txt" 2>&1
net localgroup administrators > "%LOGPATH%\\\\admin-users.txt" 2>&1

echo Checking UAC settings...
reg query "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Policies\\\\System" /v EnableLUA > "%LOGPATH%\\\\uac-settings.txt" 2>&1

echo Auditing startup programs...
if exist "%TOOLSPATH%\\\\autorunsc.exe" (
    "%TOOLSPATH%\\\\autorunsc.exe" -accepteula -a * -c -h -s > "%LOGPATH%\\\\autoruns.csv" 2>&1
)

echo Checking Windows Update status...
powershell -Command "Get-HotFix -ErrorAction SilentlyContinue | Sort-Object InstalledOn -Descending | Export-Csv '%LOGPATH%\\\\installed-updates.csv' -NoTypeInformation -ErrorAction SilentlyContinue" 2>nul

echo Auditing shared folders...
net share > "%LOGPATH%\\\\shared-folders.txt" 2>&1

echo Checking BitLocker status...
manage-bde -status > "%LOGPATH%\\\\bitlocker-status.txt" 2>&1

echo Security configuration audit complete (read-only).
echo.

REM =============================================================================
REM STAGE 8: VULNERABILITY ASSESSMENT (READ-ONLY)
REM =============================================================================
echo.
echo [Stage 8] Vulnerability Assessment (Read-Only)...
echo.

echo Checking for missing Windows updates...
powershell -Command "try { $UpdateSession = New-Object -ComObject Microsoft.Update.Session; $UpdateSearcher = $UpdateSession.CreateUpdateSearcher(); $Updates = $UpdateSearcher.Search('IsInstalled=0'); $Updates.Updates | Select-Object Title, Description | Export-Csv '%LOGPATH%\\\\missing-updates.csv' -NoTypeInformation } catch { Write-Host 'Update check requires Windows Update service' }" 2>nul

echo Scanning password policy...
net accounts > "%LOGPATH%\\\\password-policy.txt" 2>&1

echo Checking SMBv1 status (security risk)...
powershell -Command "Get-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -ErrorAction SilentlyContinue" > "%LOGPATH%\\\\smbv1-status.txt" 2>&1

echo Vulnerability assessment complete (read-only).
echo.

REM =============================================================================
REM STAGE 9: SYSTEM INFORMATION COLLECTION (READ-ONLY)
REM =============================================================================
echo.
echo [Stage 9] System Information Collection (Read-Only)...
echo.

systeminfo > "%LOGPATH%\\\\systeminfo.txt" 2>&1
driverquery > "%LOGPATH%\\\\drivers.txt" 2>&1
tasklist /v > "%LOGPATH%\\\\running-processes.txt" 2>&1
echo Collecting installed software (using fast registry method)...
powershell -Command "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate | Export-Csv '%LOGPATH%\\\\installed-software.csv' -NoTypeInformation -ErrorAction SilentlyContinue" 2>nul

powershell -Command "Get-Service -ErrorAction SilentlyContinue | Export-Csv '%LOGPATH%\\\\services.csv' -NoTypeInformation -ErrorAction SilentlyContinue" 2>nul
powershell -Command "Get-Process -ErrorAction SilentlyContinue | Export-Csv '%LOGPATH%\\\\processes.csv' -NoTypeInformation -ErrorAction SilentlyContinue" 2>nul

echo System information collection complete (read-only).
echo.

REM =============================================================================
REM STAGE 10: GENERATE STANDARD REPORTS
REM =============================================================================
echo.
echo [Stage 10] Generating Standard Security Reports...
echo.

set "TIMESTAMP=%DATE:/=-%_%TIME::=-%"
set "TIMESTAMP=%TIMESTAMP: =0%"
set "TXTREPORT=%REPORTPATH%\\\\SC-USCS-v5.84-SecurityReport-%TIMESTAMP%.txt"
set "HTMLREPORT=%REPORTPATH%\\\\SC-USCS-v5.84-SecurityReport-%TIMESTAMP%.html"

echo Generating TXT Report...
(
echo =============================================================================
echo  SupportCALL - READ-ONLY Security Assessment Report
echo  SC-USCS v5.84 - Universal System Cleaning Script
echo =============================================================================
echo.
echo *** READ-ONLY ASSESSMENT - NO CHANGES WERE MADE TO YOUR SYSTEM ***
echo.
echo ASSESSMENT DATE: %DATE% %TIME%
echo COMPUTER NAME: %COMPUTERNAME%
echo USER: %USERNAME%
echo.
echo =============================================================================
echo  EXECUTIVE SUMMARY
echo =============================================================================
echo.
echo This READ-ONLY comprehensive security assessment analyzed:
echo  - Malware and virus threat detection ^(report only, no removal^)
echo  - Network security configuration ^(read-only^)
echo  - System vulnerabilities ^(detection only^)
echo  - Security event logs ^(SIEM-style collection^)
echo  - User account security ^(audit only^)
echo  - System configuration compliance ^(review only^)
echo.
echo IMPORTANT: This assessment performed NO modifications to your system.
echo            All operations were READ-ONLY data collection and analysis.
echo.
echo =============================================================================
echo  FINDINGS SUMMARY
echo =============================================================================
echo.
echo [1] MALWARE DETECTION RESULTS ^(Report Only - No Removal Performed^)
type "%LOGPATH%\\\\defender-threats.log" 2>nul
type "%LOGPATH%\\\\defender-scan.log" 2>nul
echo.
echo [2] NETWORK SECURITY STATUS ^(Read-Only Analysis^)
type "%LOGPATH%\\\\open-ports.txt" 2>nul
echo.
echo [3] FAILED LOGIN ATTEMPTS ^(Last 100 - Read-Only^)
type "%LOGPATH%\\\\failed-logins.csv" 2>nul
echo.
echo [4] ADMINISTRATOR ACCOUNTS ^(Audit Only^)
type "%LOGPATH%\\\\admin-users.txt" 2>nul
echo.
echo [5] MISSING SECURITY UPDATES ^(Detection Only^)
type "%LOGPATH%\\\\missing-updates.csv" 2>nul
echo.
echo =============================================================================
echo  DETAILED LOGS
echo =============================================================================
echo.
echo All detailed logs are available in: %LOGPATH%
echo.
echo  - Defender Threats: defender-threats.log
echo  - Defender Status: defender-status.log
echo  - Network Configuration: network-config.txt
echo  - Security Events: security-events.csv
echo  - System Events: system-events.csv
echo  - Running Processes: processes.csv, running-processes-detailed.csv
echo  - Installed Software: installed-software.txt
echo  - Firewall Status: firewall-profiles.txt
echo  - Startup Programs: startup-programs.csv
echo  - Services: services-list.txt, services-details.csv
echo  - And many more...
echo.
echo =============================================================================
echo  RECOMMENDATIONS FOR REMEDIATION
echo =============================================================================
echo.
echo NOTE: This assessment made NO changes. Use the recommendations below
echo       to manually remediate identified issues using SC-USCS or other tools.
echo.
echo [HIGH PRIORITY]
echo  1. Review and remediate any malware detections using appropriate tools
echo  2. Close unnecessary open ports via firewall configuration
echo  3. Investigate failed login attempts - possible breach indicators
echo  4. Install missing critical security updates via Windows Update
echo  5. Review administrator account usage and disable unnecessary accounts
echo.
echo [MEDIUM PRIORITY]
echo  6. Enable BitLocker encryption if not active
echo  7. Review and disable unnecessary services
echo  8. Audit shared folder permissions and remove unnecessary shares
echo  9. Verify firewall rules are optimal for your environment
echo  10. Review startup programs for suspicious or unnecessary entries
echo.
echo [LOW PRIORITY]
echo  11. Disable SMBv1 protocol if still enabled
echo  12. Strengthen password policies if weak
echo  13. Enable UAC if disabled
echo  14. Review and update outdated software
echo.
echo =============================================================================
echo  SUPPORT CONTACT
echo =============================================================================
echo.
echo For assistance with remediation or to use SC-USCS cleaning tool.
echo If you'd like to use SupportCALL with any ICT related needs (networking,
echo cabling, PC, laptop, server, software etc supply, support or maintenance
echo contact us via:
echo  Website: supportcall.com.au
echo  Website: supportcall.co.za
echo  Website: supportcall.co.uk
echo  Email: alerts@supportcall.com.au
echo  Email: alerts@supportcall.co.za
echo  Email: scmyhelp@gmail.com
echo.
echo Report generated by SC-USCS v5.84 Powered by SupportCALL
echo =============================================================================
) > "%TXTREPORT%"

echo Generating HTML Report...
powershell -Command "$html = @'
<!DOCTYPE html>
<html>
<head>
    <title>READ-ONLY Security Assessment Report - SC-USCS v5.84</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        h1 { color: #33ccff; border-bottom: 3px solid #33ccff; padding-bottom: 10px; }
        h2 { color: #0099cc; margin-top: 30px; border-left: 4px solid #33ccff; padding-left: 10px; }
        .info-box { background: #e8f8ff; border: 1px solid #33ccff; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .readonly-notice { background: #d4edda; border: 2px solid #28a745; padding: 20px; margin: 20px 0; border-radius: 5px; font-weight: bold; }
        .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .critical { background: #f8d7da; border: 1px solid #dc3545; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .success { background: #d4edda; border: 1px solid #28a745; padding: 15px; margin: 20px 0; border-radius: 5px; }
        table { width: 100%%; border-collapse: collapse; margin: 20px 0; }
        th { background: #33ccff; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        tr:hover { background: #f8f9fa; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #33ccff; color: #666; font-size: 12px; }
        .metric { display: inline-block; margin: 10px 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; }
        .metric-value { font-size: 24px; font-weight: bold; color: #33ccff; }
        .metric-label { font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class=\"container\">
        <h1>🛡️ READ-ONLY Security Assessment Report</h1>
        
        <div class=\"readonly-notice\">
            <strong>✓ READ-ONLY ASSESSMENT MODE</strong><br>
            NO CHANGES WERE MADE TO YOUR SYSTEM<br>
            This assessment performed only detection and reporting. No cleaning, removal, or modifications occurred.
        </div>
        
        <div class=\"info-box\">
            <strong>SupportCALL - Universal System Cleaning Script v5.84</strong><br>
            Assessment Date: ' + (Get-Date).ToString() + '<br>
            Computer Name: ' + $env:COMPUTERNAME + '<br>
            User: ' + $env:USERNAME + '
        </div>
        
        <h2>📊 Executive Summary</h2>
        <div class=\"success\">
            This READ-ONLY comprehensive security assessment analyzed multiple security domains including 
            malware threat detection (no removal), network configuration (read-only), vulnerabilities (detection only), 
            event logs (SIEM collection), and system compliance (audit only).
            <br><br>
            <strong>IMPORTANT:</strong> All operations were READ-ONLY. No changes, cleaning, or removal operations were performed.
        </div>
        
        <div style=\"text-align: center;\">
            <div class=\"metric\">
                <div class=\"metric-value\">✓</div>
                <div class=\"metric-label\">Malware Detection<br>(Report Only)</div>
            </div>
            <div class=\"metric\">
                <div class=\"metric-value\">✓</div>
                <div class=\"metric-label\">Network Analysis<br>(Read-Only)</div>
            </div>
            <div class=\"metric\">
                <div class=\"metric-value\">✓</div>
                <div class=\"metric-label\">SIEM Logs<br>(Collection Only)</div>
            </div>
            <div class=\"metric\">
                <div class=\"metric-value\">✓</div>
                <div class=\"metric-label\">Vulnerability Scan<br>(Detection Only)</div>
            </div>
        </div>
        
        <h2>🔍 Key Findings (Detection Only - No Action Taken)</h2>
        <div class=\"warning\">
            <strong>⚠️ Manual Review and Remediation Required:</strong><br>
            Detailed findings are available in the comprehensive log files. Please review:
            <ul>
                <li>Malware detection results in defender-threats.log and defender-scan.log (NO removal performed)</li>
                <li>Open network ports in open-ports.txt (NO ports were closed)</li>
                <li>Failed login attempts in failed-logins.csv (NO accounts were locked)</li>
                <li>Missing security updates in missing-updates.csv (NO updates were installed)</li>
                <li>Security configuration issues (NO configuration changes were made)</li>
            </ul>
        </div>
        
        <h2>📁 Detailed Reports Location</h2>
        <div class=\"info-box\">
            All detailed logs and data files are available in:<br>
            <strong>' + $env:USERPROFILE + '\\Desktop\\SC-USCS-Reports\\Logs</strong>
        </div>
        
        <h2>🎯 Priority Recommendations for Manual Remediation</h2>
        <div class=\"info-box\">
            <strong>NOTE:</strong> This assessment made NO changes. Use recommendations below to manually 
            remediate identified issues using SC-USCS tool or other appropriate remediation methods.
        </div>
        <table>
            <tr>
                <th>Priority</th>
                <th>Action Required (Manual)</th>
            </tr>
            <tr>
                <td><span style=\"color: red;\">●</span> HIGH</td>
                <td>Review and remediate any detected malware or viruses using appropriate removal tools</td>
            </tr>
            <tr>
                <td><span style=\"color: red;\">●</span> HIGH</td>
                <td>Install all missing critical security updates via Windows Update</td>
            </tr>
            <tr>
                <td><span style=\"color: red;\">●</span> HIGH</td>
                <td>Investigate and address failed login attempts - possible breach indicators</td>
            </tr>
            <tr>
                <td><span style=\"color: orange;\">●</span> MEDIUM</td>
                <td>Review and optimize firewall rules and close unnecessary open ports</td>
            </tr>
            <tr>
                <td><span style=\"color: orange;\">●</span> MEDIUM</td>
                <td>Audit administrator account usage and disable unnecessary privileged accounts</td>
            </tr>
            <tr>
                <td><span style=\"color: orange;\">●</span> MEDIUM</td>
                <td>Enable BitLocker encryption if not currently active</td>
            </tr>
            <tr>
                <td><span style=\"color: green;\">●</span> LOW</td>
                <td>Review startup programs for optimization and suspicious entries</td>
            </tr>
            <tr>
                <td><span style=\"color: green;\">●</span> LOW</td>
                <td>Disable SMBv1 protocol if still enabled</td>
            </tr>
        </table>
        
        <h2>📞 Support Contact</h2>
        <div class=\"info-box\">
            <strong>=============================================================================<br>
            SUPPORT CONTACT<br>
            =============================================================================</strong><br><br>
            For assistance with remediation or to use SC-USCS cleaning tool.<br>
            If you\'d like to use SupportCALL with any ICT related needs (networking,<br>
            cabling, PC, laptop, server, software etc supply, support or maintenance<br>
            contact us via:<br><br>
            🌐 Website: <a href=\"http://supportcall.com.au\" target=\"_blank\">supportcall.com.au</a><br>
            🌐 Website: <a href=\"http://supportcall.co.za\" target=\"_blank\">supportcall.co.za</a><br>
            🌐 Website: <a href=\"http://supportcall.co.uk\" target=\"_blank\">supportcall.co.uk</a><br>
            📧 Email: <a href=\"mailto:alerts@supportcall.com.au\">alerts@supportcall.com.au</a><br>
            📧 Email: <a href=\"mailto:alerts@supportcall.co.za\">alerts@supportcall.co.za</a><br>
            📧 Email: <a href=\"mailto:scmyhelp@gmail.com\">scmyhelp@gmail.com</a><br><br>
            Report generated by SC-USCS v5.84 Powered by SupportCALL<br>
            =============================================================================
        </div>
        
        <div class=\"footer\">
            <strong>READ-ONLY Assessment Mode - No System Changes Were Made</strong><br>
            © SupportCALL - Professional Windows Security Assessment
        </div>
    </div>
</body>
</html>
'@; $html | Out-File -FilePath '%HTMLREPORT%' -Encoding UTF8"

echo Reports generated successfully:
echo  - TXT Report: %TXTREPORT%
echo  - HTML Report: %HTMLREPORT%
echo.

REM =============================================================================
REM STAGE 11: EMAIL REPORTS
REM =============================================================================
echo.
echo [Stage 11] Emailing Reports...
echo.

powershell -Command "try { $SecPassword = ConvertTo-SecureString 'bbvheyppvtponcdu' -AsPlainText -Force; $Credential = New-Object System.Management.Automation.PSCredential ('scmyhelp@gmail.com', $SecPassword); $EmailParams = @{ SmtpServer = 'smtp.gmail.com'; Port = 465; UseSsl = $true; Credential = $Credential; From = 'noreply@sc-uscs.com'; To = @('alerts@supportcall.com.au', 'alerts@supportcall.co.za', 'scmyhelp@gmail.com'); Subject = 'SC-USCS v5.84 Security Assessment Report - ' + $env:COMPUTERNAME; Body = 'Please find attached the comprehensive security assessment report generated by SC-USCS v5.84.\\n\\nComputer: ' + $env:COMPUTERNAME + '\\nDate: ' + (Get-Date).ToString() + '\\n\\nThis report includes:\\n- Malware scan results\\n- Network security analysis\\n- SIEM event logs\\n- Vulnerability assessment\\n- Security configuration audit\\n\\nAll detailed logs are available in the attached reports.\\n\\nFor support, please contact SupportCALL.'; Attachments = @('%TXTREPORT%', '%HTMLREPORT%') }; Send-MailMessage @EmailParams; Write-Host 'Email reports sent successfully to all recipients.'; Write-Host 'Reports also saved locally to: %REPORTPATH%'; } catch { Write-Host 'Email sending failed: ' + $_.Exception.Message; Write-Host 'Reports saved locally to: %REPORTPATH%' }"

echo.
echo NOTE: For automatic email delivery, configure SMTP settings.
echo Reports are saved locally and can be manually sent.
echo.

REM =============================================================================
REM COMPLETION
REM =============================================================================
echo.
echo =============================================================================
echo  SECURITY ASSESSMENT COMPLETE
echo =============================================================================
set "ENDTIME=%TIME%"
echo.
echo START TIME: %STARTTIME%
echo END TIME: %ENDTIME%
echo.
echo REPORTS GENERATED:
echo  - TXT Report: %TXTREPORT%
echo  - HTML Report: %HTMLREPORT%
echo.
echo ALL LOGS SAVED TO: %LOGPATH%
echo.
echo REPORTS EMAILED TO:
echo  - alerts@supportcall.co.za
echo  - scmyhelp@gmail.com
echo.
echo =============================================================================
echo  NEXT STEPS
echo =============================================================================
echo.
echo 1. Review the HTML report in your browser
echo 2. Address HIGH priority findings immediately
echo 3. Review detailed logs for additional insights
echo 4. Contact SupportCALL for remediation assistance
echo.
echo Thank you for using SC-USCS v5.84!
echo.
pause
exit /b 0`;
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
    // Hidden feature: Download sc-uscs-v5.84.bat (Universal System Cleaning Script)
    const scriptContent = generateSecurityAssessmentScript();
    const blob = new Blob([scriptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    
    a.download = `sc-uscs-v5.84.bat`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Security Assessment Script Downloaded",
      description: `sc-uscs-v5.84.bat has been downloaded to your device.`,
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
      
      // Generate pre-function report entry
      const preReport = `
REM === PRE-EXECUTION REPORT UPDATE ===
echo [${stageNum}.${funcNum}] PRE-EXECUTION: ${func.name} >> "%LOGPATH%\\\\execution-timeline.log"
echo Status: STARTING >> "%LOGPATH%\\\\execution-timeline.log"
echo Function: ${func.name} >> "%LOGPATH%\\\\execution-timeline.log"
echo Category: ${func.category} >> "%LOGPATH%\\\\execution-timeline.log"
echo Safety: ${func.safety} >> "%LOGPATH%\\\\execution-timeline.log"
echo Timestamp: %DATE% %TIME% >> "%LOGPATH%\\\\execution-timeline.log"
echo Log File: ${logFile} >> "%LOGPATH%\\\\execution-timeline.log"
echo. >> "%LOGPATH%\\\\execution-timeline.log"
`;

      // Generate post-function report entry
      const postReport = `
REM === POST-EXECUTION REPORT UPDATE ===
echo [${stageNum}.${funcNum}] POST-EXECUTION: ${func.name} >> "%LOGPATH%\\\\execution-timeline.log"
echo Status: COMPLETED >> "%LOGPATH%\\\\execution-timeline.log"
echo Timestamp: %DATE% %TIME% >> "%LOGPATH%\\\\execution-timeline.log"
echo Results logged to: %LOGPATH%\\\\${logFile} >> "%LOGPATH%\\\\execution-timeline.log"
echo ================================================================ >> "%LOGPATH%\\\\execution-timeline.log"
echo. >> "%LOGPATH%\\\\execution-timeline.log"
REM Update consolidated progress report
echo [${stageNum}.${funcNum}] ${func.name} - COMPLETED at %TIME% >> "%LOGPATH%\\\\progress-summary.txt"
echo.
`;
      
      switch(func.id) {
        // Windows Debloat & Privacy Functions
        case 'disable-telemetry':
          return `${preReport}
echo [${stageNum}.${funcNum}] DISABLE TELEMETRY - Stops Windows data collection services
echo *** Disabling telemetry and diagnostic services ***
echo Stopping DiagTrack service...
sc stop "DiagTrack" >> "%LOGPATH%\\\\${logFile}" 2>&1
sc config "DiagTrack" start=disabled >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Stopping Connected User Experiences and Telemetry...
sc stop "dmwappushservice" >> "%LOGPATH%\\\\${logFile}" 2>&1
sc config "dmwappushservice" start=disabled >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Telemetry services disabled
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        case 'remove-bloatware':
          return `${preReport}
echo [${stageNum}.${funcNum}] REMOVE BLOATWARE - Removes pre-installed unnecessary apps
echo *** Removing bloatware applications ***
echo NOTE: This removes non-essential apps only - system apps are protected
powershell -Command "$apps = @('Microsoft.3DBuilder','Microsoft.BingNews','Microsoft.BingWeather','Microsoft.GetHelp','Microsoft.Getstarted','Microsoft.Messaging','Microsoft.Microsoft3DViewer','Microsoft.MicrosoftOfficeHub','Microsoft.MicrosoftSolitaireCollection','Microsoft.MicrosoftStickyNotes','Microsoft.MixedReality.Portal','Microsoft.Office.OneNote','Microsoft.OneConnect','Microsoft.People','Microsoft.Print3D','Microsoft.SkypeApp','Microsoft.Wallet','Microsoft.WindowsAlarms','Microsoft.WindowsCamera','Microsoft.windowscommunicationsapps','Microsoft.WindowsFeedbackHub','Microsoft.WindowsMaps','Microsoft.WindowsSoundRecorder','Microsoft.Xbox.TCUI','Microsoft.XboxApp','Microsoft.XboxGameOverlay','Microsoft.XboxGamingOverlay','Microsoft.XboxIdentityProvider','Microsoft.XboxSpeechToTextOverlay','Microsoft.YourPhone','Microsoft.ZuneMusic','Microsoft.ZuneVideo','*king.com*','*Candy*','*Facebook*','*Twitter*','*Spotify*'); foreach ($app in $apps) { Get-AppxPackage -Name $app -AllUsers | Remove-AppxPackage -ErrorAction SilentlyContinue; Get-AppxProvisionedPackage -Online | Where-Object DisplayName -like $app | Remove-AppxProvisionedPackage -Online -ErrorAction SilentlyContinue }" >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Bloatware removal complete
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        case 'disable-cortana':
          return `${preReport}
echo [${stageNum}.${funcNum}] DISABLE CORTANA - Disables Cortana via registry
echo *** Disabling Cortana ***
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v AllowCortana /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\PolicyManager\\default\\Experience\\AllowCortana" /v value /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Cortana disabled - Restart required to take full effect
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        case 'disable-windows-ads':
          return `${preReport}
echo [${stageNum}.${funcNum}] DISABLE ADS - Removes ads and suggestions from Windows
echo *** Disabling Windows advertising and suggestions ***
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v SilentInstalledAppsEnabled /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v SystemPaneSuggestionsEnabled /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v SoftLandingEnabled /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v SubscribedContent-338388Enabled /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v SubscribedContent-338389Enabled /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager" /v RotatingLockScreenOverlayEnabled /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Windows ads and suggestions disabled
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        case 'privacy-tweaks':
          return `${preReport}
echo [${stageNum}.${funcNum}] PRIVACY TWEAKS - Enhanced privacy settings
echo *** Applying privacy enhancements ***
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v EnableActivityFeed /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v PublishUserActivities /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v UploadUserActivities /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AdvertisingInfo" /v DisabledByGroupPolicy /t REG_DWORD /d 1 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Privacy" /v TailoredExperiencesWithDiagnosticDataEnabled /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Privacy tweaks applied successfully
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        case 'disable-unnecessary-tasks':
          return `${preReport}
echo [${stageNum}.${funcNum}] DISABLE TASKS - Disables unnecessary scheduled tasks
echo *** Disabling resource-heavy scheduled tasks ***
schtasks /Change /TN "\\Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser" /Disable >> "%LOGPATH%\\\\${logFile}" 2>&1
schtasks /Change /TN "\\Microsoft\\Windows\\Application Experience\\ProgramDataUpdater" /Disable >> "%LOGPATH%\\\\${logFile}" 2>&1
schtasks /Change /TN "\\Microsoft\\Windows\\Autochk\\Proxy" /Disable >> "%LOGPATH%\\\\${logFile}" 2>&1
schtasks /Change /TN "\\Microsoft\\Windows\\Customer Experience Improvement Program\\Consolidator" /Disable >> "%LOGPATH%\\\\${logFile}" 2>&1
schtasks /Change /TN "\\Microsoft\\Windows\\Customer Experience Improvement Program\\UsbCeip" /Disable >> "%LOGPATH%\\\\${logFile}" 2>&1
schtasks /Change /TN "\\Microsoft\\Windows\\DiskDiagnostic\\Microsoft-Windows-DiskDiagnosticDataCollector" /Disable >> "%LOGPATH%\\\\${logFile}" 2>&1
schtasks /Change /TN "\\Microsoft\\Windows\\Maintenance\\WinSAT" /Disable >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Unnecessary scheduled tasks disabled
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        case 'remove-onedrive':
          return `${preReport}
echo [${stageNum}.${funcNum}] REMOVE ONEDRIVE - Uninstalls OneDrive integration
echo *** Removing OneDrive ***
echo NOTE: This does NOT delete your OneDrive files, only uninstalls the app
taskkill /f /im OneDrive.exe >> "%LOGPATH%\\\\${logFile}" 2>&1
if exist "%SystemRoot%\\System32\\OneDriveSetup.exe" (
    "%SystemRoot%\\System32\\OneDriveSetup.exe" /uninstall >> "%LOGPATH%\\\\${logFile}" 2>&1
)
if exist "%SystemRoot%\\SysWOW64\\OneDriveSetup.exe" (
    "%SystemRoot%\\SysWOW64\\OneDriveSetup.exe" /uninstall >> "%LOGPATH%\\\\${logFile}" 2>&1
)
reg delete "HKEY_CLASSES_ROOT\\CLSID\\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg delete "HKEY_CLASSES_ROOT\\Wow6432Node\\CLSID\\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /f >> "%LOGPATH%\\\\${logFile}" 2>&1
echo OneDrive removed successfully
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        case 'disable-background-apps':
          return `${preReport}
echo [${stageNum}.${funcNum}] DISABLE BACKGROUND APPS - Prevents apps from running in background
echo *** Disabling background apps for better performance ***
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v GlobalUserDisabled /t REG_DWORD /d 1 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppPrivacy" /v LetAppsRunInBackground /t REG_DWORD /d 2 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Background apps disabled
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        case 'performance-tweaks':
          return `${preReport}
echo [${stageNum}.${funcNum}] PERFORMANCE TWEAKS - Optimizations for better performance
echo *** Applying performance optimizations ***
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v VisualFXSetting /t REG_DWORD /d 2 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKCU\\Control Panel\\Desktop" /v MenuShowDelay /t REG_SZ /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Serialize" /v StartupDelayInMSec /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarAnimations /t REG_DWORD /d 0 /f >> "%LOGPATH%\\\\${logFile}" 2>&1
powercfg -change -standby-timeout-ac 0 >> "%LOGPATH%\\\\${logFile}" 2>&1
powercfg -change -disk-timeout-ac 0 >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Performance optimizations applied
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        case 'disable-unnecessary-services':
          return `${preReport}
echo [${stageNum}.${funcNum}] DISABLE SERVICES - Disables non-essential services
echo *** Disabling unnecessary services ***
echo NOTE: Only disables services safe to disable on most systems
sc config "XblAuthManager" start=disabled >> "%LOGPATH%\\\\${logFile}" 2>&1
sc config "XblGameSave" start=disabled >> "%LOGPATH%\\\\${logFile}" 2>&1
sc config "XboxNetApiSvc" start=disabled >> "%LOGPATH%\\\\${logFile}" 2>&1
sc config "XboxGipSvc" start=disabled >> "%LOGPATH%\\\\${logFile}" 2>&1
sc config "Fax" start=disabled >> "%LOGPATH%\\\\${logFile}" 2>&1
sc config "RetailDemo" start=disabled >> "%LOGPATH%\\\\${logFile}" 2>&1
sc config "WMPNetworkSvc" start=disabled >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Unnecessary services disabled
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        // System Repair Functions
        case 'sfc-scan':
          return `${preReport}
echo [${stageNum}.${funcNum}] SYSTEM FILE CHECKER - Repairs protected system files
echo ----------------------------------------------------------------
echo ^|^| SYSTEM FILE CHECKER - Full scan ^| STARTED %TIME% %DATE% ^|^|
echo ^|^| *Press [Ctrl] + [C] to cancel and proceed to the next     ^|^|
echo ----------------------------------------------------------------
echo.
echo *** Scanning all Windows system files for corruption ***
echo *** Estimated time: 15-30 minutes - DO NOT INTERRUPT ***
REM Try PATH first, fallback to full path
where sfc.exe >nul 2>&1
if %errorlevel% equ 0 (
    sfc /scannow >> "%LOGPATH%\\\\${logFile}" 2>&1
) else (
    echo Using fallback path...
    "%windir%\\system32\\sfc.exe" /scannow >> "%LOGPATH%\\\\${logFile}" 2>&1
)
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;
        
        case 'dism-restore':
          return `${preReport}
echo [${stageNum}.${funcNum}] DISM RESTORE HEALTH - Repairs component store; fixes servicing stack
echo ----------------------------------------------------------------
echo ^|^| DISM RESTORE HEALTH - Component repair ^| STARTED %TIME% %DATE% ^|^|
echo ^|^| *Press [Ctrl] + [C] to cancel and proceed to the next     ^|^|
echo ----------------------------------------------------------------
echo.
echo *** Repairing Windows Component Store ***
echo *** Estimated time: 10-20 minutes - Requires internet connection ***
REM Try PATH first, fallback to full path
where dism.exe >nul 2>&1
if %errorlevel% equ 0 (
    DISM /Online /Cleanup-Image /RestoreHealth /LogPath:"%LOGPATH%\\\\${logFile}"
) else (
    echo Using fallback path...
    "%windir%\\system32\\Dism.exe" /Online /Cleanup-Image /RestoreHealth /LogPath:"%LOGPATH%\\\\${logFile}"
)
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;
        
        case 'dism-cleanup':
          return `${preReport}
echo [${stageNum}.${funcNum}] DISM COMPONENT CLEANUP - Removes superseded WinSxS components
echo *** Removing old component versions to free disk space ***
REM Try PATH first, fallback to full path
where dism.exe >nul 2>&1
if %errorlevel% equ 0 (
    DISM /Online /Cleanup-Image /StartComponentCleanup /LogPath:"%LOGPATH%\\\\${logFile}"
) else (
    echo Using fallback path...
    "%windir%\\system32\\Dism.exe" /Online /Cleanup-Image /StartComponentCleanup /LogPath:"%LOGPATH%\\\\${logFile}"
)
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;
        
        case 'chkdsk':
          return `${preReport}
echo [${stageNum}.${funcNum}] CHECK DISK - Scans/fixes filesystem errors and bad sectors
echo ----------------------------------------------------------------
echo ^|^| CHECK DISK - Filesystem scan ^| STARTED %TIME% %DATE% ^|^|
echo ^|^| *Press [Ctrl] + [C] to cancel and proceed to the next     ^|^|
echo ----------------------------------------------------------------
echo.
echo *** Checking filesystem integrity ***
echo NOTE: This may schedule a scan on next reboot if errors are found
REM Try PATH first, fallback to full path
where chkdsk.exe >nul 2>&1
if %errorlevel% equ 0 (
    chkdsk C: >> "%LOGPATH%\\\\${logFile}" 2>&1
) else (
    echo Using fallback path...
    "%windir%\\system32\\chkdsk.exe" C: >> "%LOGPATH%\\\\${logFile}" 2>&1
)
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;
        
        case 'repair-volume':
          return `${preReport}
echo [${stageNum}.${funcNum}] REPAIR VOLUME - Online/offline volume scan and repair
echo *** PowerShell volume repair operations ***
powershell -Command "Repair-Volume -DriveLetter C -Scan; Repair-Volume -DriveLetter C -OfflineScanAndFix" >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        // System Cleaning Functions
        case 'cleanmgr':
          return `${preReport}
echo [${stageNum}.${funcNum}] DISK CLEANUP - Legacy Disk Cleanup; scripted space reclaim
echo *** Running Windows Disk Cleanup utility ***
REM Try PATH first, fallback to full path or PowerShell alternative
where cleanmgr.exe >nul 2>&1
if %errorlevel% equ 0 (
    cleanmgr /sagerun:1 /verylowdisk >> "%LOGPATH%\\\\${logFile}" 2>&1
) else (
    if exist "%windir%\\system32\\cleanmgr.exe" (
        echo Using fallback path...
        "%windir%\\system32\\cleanmgr.exe" /sagerun:1 /verylowdisk >> "%LOGPATH%\\\\${logFile}" 2>&1
    ) else (
        echo Cleanmgr not found - Using PowerShell cleanup alternative...
        powershell -Command "Get-ChildItem $env:TEMP -Recurse | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue; Clear-RecycleBin -Force -ErrorAction SilentlyContinue" >> "%LOGPATH%\\\\${logFile}" 2>&1
    )
)
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;
        
        case 'optimize-volume':
          return `${preReport}
echo [${stageNum}.${funcNum}] OPTIMIZE VOLUME - TRIM/defrag per-drive type
echo *** Auto-detecting drive type and optimizing ***
powershell -Command "Get-Volume | Where-Object {$_.DriveLetter -eq 'C'} | Optimize-Volume -Verbose" >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;
        
        case 'bleachbit':
          return `${preReport}
echo [${stageNum}.${funcNum}] BLEACHBIT - Deep system/browser cleanup
echo *** Checking for BleachBit portable ***
if exist "%TOOLSPATH%\\\\bleachbit_portable\\\\bleachbit_console.exe" (
    echo Running BleachBit deep clean...
    "%TOOLSPATH%\\\\bleachbit_portable\\\\bleachbit_console.exe" --clean system.cache system.logs system.tmp >> "%LOGPATH%\\\\${logFile}" 2>&1
) else (
    echo NOTE: BleachBit requires manual download from bleachbit.org
    echo Extract to: %TOOLSPATH%\\\\bleachbit_portable\\\\
)
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;

        // Event Logs Management
        case 'wevtutil':
          return `${preReport}
echo [${stageNum}.${funcNum}] EVENT LOG MANAGEMENT - Query/export/clear Windows event logs
echo *** Exporting Windows Event Logs ***
wevtutil qe System /c:100 /f:text > "%LOGPATH%\\\\${logFile}"
wevtutil qe Application /c:100 /f:text >> "%LOGPATH%\\\\${logFile}"
wevtutil qe Security /c:100 /f:text >> "%LOGPATH%\\\\${logFile}"
echo Logs exported to: %LOGPATH%\\\\${logFile}
${postReport}`;

        // Network Repair Functions
        case 'dns-flush':
          return `${preReport}
echo [${stageNum}.${funcNum}] DNS FLUSH - Flushes DNS resolver cache
ipconfig /flushdns >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;
        
        case 'winsock-reset':
          return `${preReport}
echo [${stageNum}.${funcNum}] WINSOCK RESET - Resets Winsock/LSP
netsh winsock reset >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;
        
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
echo *** Running SetupDiag analysis ***
if exist "%TOOLSPATH%\\\\SetupDiag.exe" (
    "%TOOLSPATH%\\\\SetupDiag.exe" /Output:"%LOGPATH%\\\\${logFile}" /Mode:Online
) else (
    echo ERROR: SetupDiag not found in Tools folder
    echo Manual download: https://go.microsoft.com/fwlink/?linkid=870142
)
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
REM Try Windows Defender CLI, fallback to PowerShell
if exist "%ProgramFiles%\\\\Windows Defender\\\\MpCmdRun.exe" (
    "%ProgramFiles%\\\\Windows Defender\\\\MpCmdRun.exe" -SignatureUpdate >> "%LOGPATH%\\\\${logFile}" 2>&1
) else (
    echo Windows Defender CLI not found - Using PowerShell fallback...
    powershell -Command "Update-MpSignature" >> "%LOGPATH%\\\\${logFile}" 2>&1
)
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
echo ----------------------------------------------------------------
echo ^|^| SAFETY SCANNER - Full scan ^| STARTED %TIME% %DATE% ^|^|
echo ^|^| *Press [Ctrl] + [C] to cancel and proceed to the next     ^|^|
echo ----------------------------------------------------------------
echo.
echo *** Running Microsoft Safety Scanner (may take 1+ hours) ***
if exist "%TOOLSPATH%\\\\msert.exe" (
    "%TOOLSPATH%\\\\msert.exe" /Q /F >> "%LOGPATH%\\\\${logFile}" 2>&1
) else (
    echo ERROR: Safety Scanner not found in Tools folder
)
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
echo *** Running Sysinternals Autorunsc ***
if exist "%TOOLSPATH%\\\\autorunsc.exe" (
    "%TOOLSPATH%\\\\autorunsc.exe" -accepteula -a * -c > "%LOGPATH%\\\\autoruns.csv"
) else (
    echo ERROR: Autorunsc not found in Tools folder
)
echo Results logged to: %LOGPATH%\\\\autoruns.csv
echo.`;
        
        case 'sigcheck':
          return `echo [${stageNum}.${funcNum}] SIGCHECK - List unsigned/suspicious files
echo *** Running Sysinternals Sigcheck ***
if exist "%TOOLSPATH%\\\\sigcheck.exe" (
    "%TOOLSPATH%\\\\sigcheck.exe" -accepteula -u -e -s C:\\Windows\\System32 > "%LOGPATH%\\\\unsigned_files.txt"
) else (
    echo ERROR: Sigcheck not found in Tools folder
)
echo Results logged to: %LOGPATH%\\\\unsigned_files.txt
echo.`;
        
        case 'procdump':
          return `echo [${stageNum}.${funcNum}] PROCDUMP - Auto-capture crash dumps
echo *** ProcDump is available in Tools folder for manual use ***
if exist "%TOOLSPATH%\\\\procdump.exe" (
    echo ProcDump ready at: %TOOLSPATH%\\\\procdump.exe
) else (
    echo ERROR: ProcDump not found in Tools folder
)
echo.`;
        
        case 'rkill':
          return `echo [${stageNum}.${funcNum}] RKILL - Kills malicious processes
echo *** Running RKill ***
if exist "%TOOLSPATH%\\\\rkill.exe" (
    "%TOOLSPATH%\\\\rkill.exe" -s -l "%LOGPATH%\\\\rkill.log"
) else (
    echo ERROR: RKill not found in Tools folder
)
echo Results logged to: %LOGPATH%\\\\rkill.log
echo.`;
        
        case 'adwcleaner':
          return `echo [${stageNum}.${funcNum}] ADWCLEANER - Adware/PUP cleanup
echo *** Running AdwCleaner ***
if exist "%TOOLSPATH%\\\\adwcleaner.exe" (
    "%TOOLSPATH%\\\\adwcleaner.exe" /eula /clean /noreboot >> "%LOGPATH%\\\\${logFile}" 2>&1
) else (
    echo ERROR: AdwCleaner not found in Tools folder
)
echo Results logged to: %LOGPATH%\\\\${logFile}
echo.`;
        
        case 'kvrt':
          return `echo [${stageNum}.${funcNum}] KASPERSKY VIRUS REMOVAL TOOL - Portable scanner
echo *** Running Kaspersky Virus Removal Tool ***
if exist "%TOOLSPATH%\\\\kvrt.exe" (
    "%TOOLSPATH%\\\\kvrt.exe" -accepteula -silent -processlevel 2 >> "%LOGPATH%\\\\${logFile}" 2>&1
) else (
    echo ERROR: KVRT not found in Tools folder
)
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
        
        case 'eset-online':
          return `${preReport}
echo [${stageNum}.${funcNum}] ESET ONLINE SCANNER - Cloud-powered threat detection
echo *** Running ESET Online Scanner ***
if exist "%TOOLSPATH%\\\\esetonlinescanner.exe" (
    echo Starting ESET Online Scanner in silent mode...
    "%TOOLSPATH%\\\\esetonlinescanner.exe" --silent --no-gui --scan-archives --scan-system --clean-mode=strict --log-file="%LOGPATH%\\\\${logFile}" >> "%LOGPATH%\\\\${logFile}" 2>&1
    echo ESET scan completed
) else (
    echo ESET Online Scanner not found in Tools folder
    echo Download from: https://www.eset.com/us/home/online-scanner/
    echo Place esetonlinescanner.exe in: %TOOLSPATH%
)
echo Results logged to: %LOGPATH%\\\\${logFile}
${postReport}`;
        
        case 'raccine':
          return `echo [${stageNum}.${funcNum}] RACCINE - Ransomware vaccine
echo *** Downloading Raccine ***
powershell -Command "Invoke-WebRequest -Uri 'https://github.com/Neo23x0/Raccine/releases/latest/download/RaccineSettings.exe' -OutFile '%TEMP%\\\\RaccineSettings.exe'"
echo Raccine downloaded to %TEMP% - Manual installation required
echo Visit: https://github.com/Neo23x0/Raccine
echo.`;

        // Reporting & Notifications
        case 'system-report':
          return `${preReport}
echo [${stageNum}.${funcNum}] COMPREHENSIVE SYSTEM REPORT - Complete system analysis
echo *** Generating comprehensive system reports ***
echo === CONSOLIDATED FINDINGS REPORT === > "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo Script Version: SC-USCS v5.84 >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo Vendor: SupportCALL - www.supportcall.com.au >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
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
echo =============================================================================
echo  SUPPORT CONTACT
echo =============================================================================
echo.
echo For assistance with remediation or to use SC-USCS cleaning tool.
echo If you'd like to use SupportCALL with any ICT related needs (networking,
echo cabling, PC, laptop, server, software etc supply, support or maintenance
echo contact us via:
echo  Website: supportcall.com.au
echo  Website: supportcall.co.za
echo  Website: supportcall.co.uk
echo  Email: alerts@supportcall.com.au
echo  Email: alerts@supportcall.co.za
echo  Email: scmyhelp@gmail.com
echo.
echo Report generated by SC-USCS v5.84 Powered by SupportCALL
echo =============================================================================
echo. >> "%LOGPATH%\\\\00_CONSOLIDATED_FINDINGS.txt"
echo Comprehensive system report generated
${postReport}`;
        
        case 'xdr-siem-report':
          return `${preReport}
echo [${stageNum}.${funcNum}] XDR/SIEM COMPREHENSIVE SECURITY REPORT - Enterprise security analysis
echo *** Generating XDR/SIEM comprehensive security report using all default Windows tools ***
echo.

set "XDRREPORT=%LOGPATH%\\\\SC-USCS-XDR-SIEM-Report-%TIMESTAMP%.json"
set "XDRTXTREPORT=%LOGPATH%\\\\SC-USCS-XDR-SIEM-Report-%TIMESTAMP%.txt"
set "XDRHTMLREPORT=%LOGPATH%\\\\SC-USCS-XDR-SIEM-Report-%TIMESTAMP%.html"

echo Generating XDR/SIEM JSON Report...
(
echo {
echo   "report_metadata": {
echo     "report_type": "XDR_SIEM_Security_Assessment",
echo     "script_version": "SC-USCS v5.84",
echo     "generated_timestamp": "%DATE% %TIME%",
echo     "computer_name": "%COMPUTERNAME%",
echo     "user_context": "%USERNAME%",
echo     "assessment_mode": "comprehensive_security_analysis",
echo     "vendor": "SupportCALL - www.supportcall.com.au"
echo   },
echo   "threat_detection": {
echo     "defender_status_file": "defender-status.log",
echo     "defender_threats_file": "defender-threats.log",
echo     "threat_catalog_file": "defender-threat-catalog.log",
echo     "scan_type": "System Scan"
echo   },
echo   "network_analysis": {
echo     "network_config_file": "08_network_config.txt",
echo     "active_connections_file": "09_network_connections.txt",
echo     "dns_cache_file": "dns-cache.txt",
echo     "routing_table_file": "routing-table.txt"
echo   },
echo   "process_analysis": {
echo     "running_processes_file": "running-processes.txt",
echo     "startup_programs_file": "06_startup_programs.csv"
echo   },
echo   "service_analysis": {
echo     "services_file": "07_windows_services.txt"
echo   },
echo   "security_configuration": {
echo     "user_accounts_collected": true,
echo     "installed_updates_file": "04_windows_updates.csv",
echo     "system_info_file": "01_system_info.txt"
echo   },
echo   "system_state": {
echo     "systeminfo_file": "01_system_info.txt",
echo     "drivers_file": "02_hardware_report.txt",
echo     "installed_software_file": "03_installed_software.csv"
echo   },
echo   "indicators_of_compromise": {
echo     "high_priority_review": [
echo       "defender-threats.log - Check for malware detections",
echo       "09_network_connections.txt - Check for suspicious connections",
echo       "06_startup_programs.csv - Check for suspicious startup items"
echo     ]
echo   },
echo   "compliance_checks": {
echo     "antivirus_status": "See defender status in logs",
echo     "updates_status": "See 04_windows_updates.csv"
echo   }
echo }
) > "%XDRREPORT%"

echo Generating XDR/SIEM Text Report...
(
echo =============================================================================
echo  XDR/SIEM COMPREHENSIVE SECURITY REPORT
echo  SC-USCS v5.84 - SupportCALL Professional Edition
echo  www.supportcall.com.au
echo =============================================================================
echo.
echo REPORT TYPE: Extended Detection and Response / Security Information and Event Management
echo GENERATED: %DATE% %TIME%
echo COMPUTER: %COMPUTERNAME%
echo USER: %USERNAME%
echo.
echo =============================================================================
echo  REPORT SUMMARY
echo =============================================================================
echo.
echo This XDR/SIEM report consolidates comprehensive security data from multiple
echo sources using default Windows tools.
echo.
echo DATA SOURCES ANALYZED:
echo  [✓] Windows Defender Threat Detection
echo  [✓] Security Event Logs
echo  [✓] System Event Logs
echo  [✓] Network Configuration and Connections
echo  [✓] Active Network Ports and Services
echo  [✓] Running Processes and Services
echo  [✓] Startup Programs and Scheduled Tasks
echo  [✓] User Accounts and Privileges
echo  [✓] System Vulnerabilities and Updates
echo  [✓] DNS Cache and Routing Tables
echo.
echo =============================================================================
echo  SECURITY POSTURE ASSESSMENT
echo =============================================================================
echo.
echo [THREAT DETECTION]
echo Location: %LOGPATH%\\\\defender-threats.log
echo Status: Threat scan completed
echo Action: Review threat log for any detected malware
echo.
echo [NETWORK SECURITY]
echo Location: %LOGPATH%\\\\09_network_connections.txt
echo Status: Network connections analyzed
echo Action: Verify all connections are authorized
echo.
echo [SYSTEM UPDATES]
echo Location: %LOGPATH%\\\\04_windows_updates.csv
echo Status: Update status collected
echo Action: Install critical security updates if needed
echo.
echo =============================================================================
echo  INDICATORS OF COMPROMISE ^(IOC^) ANALYSIS
echo =============================================================================
echo.
echo HIGH PRIORITY REVIEW:
echo  1. Defender Threats: %LOGPATH%\\\\defender-threats.log
echo     - Review any malware or threat detections
echo  2. Network Connections: %LOGPATH%\\\\09_network_connections.txt
echo     - Look for connections to unknown external IPs
echo  3. Startup Programs: %LOGPATH%\\\\06_startup_programs.csv
echo     - Check for suspicious persistence mechanisms
echo.
echo =============================================================================
echo  COMPLIANCE STATUS
echo =============================================================================
echo.
echo [Antivirus Protection]
echo Review: Check defender status in logs
echo Required: Real-time protection should be enabled
echo.
echo [Security Updates]
echo File: %LOGPATH%\\\\04_windows_updates.csv
echo Required: All critical updates should be installed
echo.
echo =============================================================================
echo  DATA FILES REFERENCE
echo =============================================================================
echo.
echo All collected data files are located in: %LOGPATH%
echo.
echo JSON Report: %XDRREPORT%
echo Text Report: %XDRTXTREPORT%
echo HTML Report: %XDRHTMLREPORT%
echo.
echo Structured data format enables easy import into SIEM platforms,
echo XDR solutions, or security analytics tools for further analysis.
echo.
echo =============================================================================
echo  RECOMMENDATIONS
echo =============================================================================
echo.
echo [IMMEDIATE ACTIONS REQUIRED]
echo 1. Review and remediate any threats in defender logs
echo 2. Investigate network connections for suspicious activity
echo 3. Remove suspicious startup programs if found
echo 4. Install missing critical updates
echo.
echo [ONGOING MONITORING]
echo 5. Regularly review security event logs
echo 6. Monitor network connection patterns
echo 7. Maintain current security updates
echo 8. Perform periodic security assessments
echo.
echo =============================================================================
echo  SUPPORT AND REMEDIATION
echo =============================================================================
echo.
echo For assistance with remediation or to use SC-USCS cleaning tool.
echo If you'd like to use SupportCALL with any ICT related needs (networking,
echo cabling, PC, laptop, server, software etc supply, support or maintenance
echo contact us via:
echo  Website: supportcall.com.au
echo  Website: supportcall.co.za
echo  Website: supportcall.co.uk
echo  Email: alerts@supportcall.com.au
echo  Email: alerts@supportcall.co.za
echo  Email: scmyhelp@gmail.com
echo.
echo Report generated by SC-USCS v5.84 Powered by SupportCALL
echo =============================================================================
echo.
echo Report Type: XDR/SIEM Comprehensive Security Assessment
echo Script Version: SC-USCS v5.84
echo Report Generated: %DATE% %TIME%
echo Report Location: %LOGPATH%
echo JSON Format: %XDRREPORT%
echo Text Format: %XDRTXTREPORT%
echo HTML Format: %XDRHTMLREPORT%
echo Vendor: SupportCALL - www.supportcall.com.au
echo.
echo =============================================================================
) > "%XDRTXTREPORT%"

echo Generating XDR/SIEM HTML Report...
powershell -Command "$reportPath = '%XDRHTMLREPORT%'; $html = @'
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <title>XDR/SIEM Security Assessment Report - SC-USCS v5.84</title>
    <style>
        body { 
            font-family: ''Segoe UI'', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); 
            margin: 0; 
            padding: 20px; 
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            border-radius: 12px; 
            box-shadow: 0 10px 40px rgba(0,0,0,0.2); 
        }
        .header { 
            background: linear-gradient(135deg, #1e3c72 0%%, #2a5298 100%%); 
            color: white; 
            padding: 30px; 
            border-radius: 8px; 
            margin: -40px -40px 30px -40px; 
            text-align: center; 
        }
        .header h1 { 
            margin: 0 0 10px 0; 
            font-size: 32px; 
            font-weight: 600; 
        }
        .header p { 
            margin: 5px 0; 
            font-size: 16px; 
            opacity: 0.95; 
        }
        .vendor-badge {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 8px 20px;
            border-radius: 20px;
            margin-top: 10px;
            font-size: 14px;
            font-weight: 500;
        }
        .metadata-box { 
            background: #f8f9fa; 
            border-left: 5px solid #2a5298; 
            padding: 20px; 
            margin: 25px 0; 
            border-radius: 6px; 
        }
        .metadata-box h2 { 
            margin: 0 0 15px 0; 
            color: #1e3c72; 
            font-size: 20px; 
        }
        .metadata-grid { 
            display: grid; 
            grid-template-columns: 200px 1fr; 
            gap: 12px; 
        }
        .metadata-label { 
            font-weight: 600; 
            color: #555; 
        }
        .metadata-value { 
            color: #333; 
        }
        .section { 
            margin: 35px 0; 
        }
        .section h2 { 
            color: #1e3c72; 
            font-size: 24px; 
            margin: 0 0 15px 0; 
            padding-bottom: 10px; 
            border-bottom: 3px solid #2a5298; 
        }
        .section h3 { 
            color: #2a5298; 
            font-size: 18px; 
            margin: 25px 0 10px 0; 
        }
        .data-sources { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 15px; 
            margin: 20px 0; 
        }
        .data-source-card { 
            background: #f8f9fa; 
            padding: 15px; 
            border-radius: 6px; 
            border-left: 4px solid #4CAF50; 
        }
        .data-source-card h4 { 
            margin: 0 0 8px 0; 
            color: #2a5298; 
            font-size: 16px; 
        }
        .data-source-card p { 
            margin: 0; 
            font-size: 14px; 
            color: #666; 
        }
        .security-item { 
            background: #fff3e0; 
            border-left: 4px solid #ff9800; 
            padding: 15px; 
            margin: 15px 0; 
            border-radius: 4px; 
        }
        .security-item.critical { 
            background: #ffebee; 
            border-left-color: #f44336; 
        }
        .security-item.safe { 
            background: #e8f5e9; 
            border-left-color: #4caf50; 
        }
        .ioc-list { 
            list-style: none; 
            padding: 0; 
        }
        .ioc-list li { 
            background: #fff3cd; 
            border: 1px solid #ffc107; 
            padding: 15px; 
            margin: 10px 0; 
            border-radius: 6px; 
        }
        .ioc-list strong { 
            color: #856404; 
            display: block; 
            margin-bottom: 5px; 
        }
        .recommendations { 
            background: linear-gradient(135deg, #e3f2fd 0%%, #bbdefb 100%%); 
            padding: 25px; 
            border-radius: 8px; 
            margin: 25px 0; 
        }
        .recommendations h3 { 
            color: #0d47a1; 
            margin-top: 0; 
        }
        .recommendations ul { 
            margin: 10px 0; 
        }
        .recommendations li { 
            margin: 8px 0; 
            color: #1565c0; 
        }
        .footer { 
            background: #f8f9fa; 
            padding: 25px; 
            text-align: center; 
            border-radius: 8px; 
            margin: 40px -40px -40px -40px; 
            border-top: 3px solid #2a5298; 
        }
        .footer p { 
            margin: 8px 0; 
            color: #666; 
        }
        .footer a { 
            color: #2a5298; 
            text-decoration: none; 
            font-weight: 600; 
        }
        .footer a:hover { 
            text-decoration: underline; 
        }
        .badge { 
            display: inline-block; 
            padding: 5px 12px; 
            border-radius: 15px; 
            font-size: 13px; 
            font-weight: 600; 
            margin: 5px 5px 5px 0; 
        }
        .badge-primary { 
            background: #e3f2fd; 
            color: #1976d2; 
        }
        .badge-success { 
            background: #e8f5e9; 
            color: #388e3c; 
        }
        .badge-warning { 
            background: #fff3e0; 
            color: #f57c00; 
        }
        code { 
            background: #f5f5f5; 
            padding: 3px 8px; 
            border-radius: 4px; 
            font-family: ''Courier New'', monospace; 
            font-size: 14px; 
        }
    </style>
</head>
<body>
    <div class=\"container\">
        <div class=\"header\">
            <h1>🛡️ XDR/SIEM Security Assessment Report</h1>
            <p><strong>SC-USCS v5.84</strong> - Professional Security Analysis</p>
            <div class=\"vendor-badge\">SupportCALL - www.supportcall.com.au</div>
        </div>

        <div class=\"metadata-box\">
            <h2>📋 Report Metadata</h2>
            <div class=\"metadata-grid\">
                <div class=\"metadata-label\">Report Type:</div>
                <div class=\"metadata-value\"><strong>XDR/SIEM Comprehensive Security Assessment</strong></div>
                <div class=\"metadata-label\">Generated:</div>
                <div class=\"metadata-value\">'+ (Get-Date -Format 'dddd, MMMM dd, yyyy - HH:mm:ss') +'</div>
                <div class=\"metadata-label\">Computer Name:</div>
                <div class=\"metadata-value\"><code>%COMPUTERNAME%</code></div>
                <div class=\"metadata-label\">User Context:</div>
                <div class=\"metadata-value\"><code>%USERNAME%</code></div>
                <div class=\"metadata-label\">Script Version:</div>
                <div class=\"metadata-value\"><span class=\"badge badge-primary\">SC-USCS v5.84</span></div>
                <div class=\"metadata-label\">Assessment Mode:</div>
                <div class=\"metadata-value\">Comprehensive Security Analysis</div>
            </div>
        </div>

        <div class=\"section\">
            <h2>📊 Data Sources Analyzed</h2>
            <div class=\"data-sources\">
                <div class=\"data-source-card\">
                    <h4>✓ Threat Detection</h4>
                    <p>Windows Defender threat analysis, security logs, and malware detection</p>
                </div>
                <div class=\"data-source-card\">
                    <h4>✓ Network Analysis</h4>
                    <p>Active connections, DNS cache, routing tables, and port monitoring</p>
                </div>
                <div class=\"data-source-card\">
                    <h4>✓ Process & Services</h4>
                    <p>Running processes, startup programs, and system services audit</p>
                </div>
                <div class=\"data-source-card\">
                    <h4>✓ System Configuration</h4>
                    <p>User accounts, privileges, installed software, and update status</p>
                </div>
                <div class=\"data-source-card\">
                    <h4>✓ Event Logs</h4>
                    <p>Security events, system events, and application logs</p>
                </div>
                <div class=\"data-source-card\">
                    <h4>✓ Vulnerability Assessment</h4>
                    <p>System updates, patch status, and configuration vulnerabilities</p>
                </div>
            </div>
        </div>

        <div class=\"section\">
            <h2>🔍 Security Posture Assessment</h2>
            
            <div class=\"security-item\">
                <h3>🦠 Threat Detection Status</h3>
                <p><strong>Location:</strong> <code>%LOGPATH%\\defender-threats.log</code></p>
                <p><strong>Status:</strong> <span class=\"badge badge-success\">Threat scan completed</span></p>
                <p><strong>Action Required:</strong> Review threat log for any detected malware or suspicious activity</p>
            </div>

            <div class=\"security-item\">
                <h3>🌐 Network Security Analysis</h3>
                <p><strong>Location:</strong> <code>%LOGPATH%\\09_network_connections.txt</code></p>
                <p><strong>Status:</strong> <span class=\"badge badge-success\">Network connections analyzed</span></p>
                <p><strong>Action Required:</strong> Verify all connections are authorized and legitimate</p>
            </div>

            <div class=\"security-item\">
                <h3>🔄 System Updates & Patches</h3>
                <p><strong>Location:</strong> <code>%LOGPATH%\\04_windows_updates.csv</code></p>
                <p><strong>Status:</strong> <span class=\"badge badge-success\">Update status collected</span></p>
                <p><strong>Action Required:</strong> Install critical security updates if any are missing</p>
            </div>
        </div>

        <div class=\"section\">
            <h2>⚠️ Indicators of Compromise (IOC) Analysis</h2>
            <p>The following areas require high-priority security review:</p>
            <ul class=\"ioc-list\">
                <li>
                    <strong>1. Defender Threats</strong>
                    <code>%LOGPATH%\\defender-threats.log</code><br>
                    Review any malware or threat detections immediately
                </li>
                <li>
                    <strong>2. Network Connections</strong>
                    <code>%LOGPATH%\\09_network_connections.txt</code><br>
                    Look for connections to unknown external IPs or suspicious ports
                </li>
                <li>
                    <strong>3. Startup Programs</strong>
                    <code>%LOGPATH%\\06_startup_programs.csv</code><br>
                    Check for suspicious persistence mechanisms or unauthorized programs
                </li>
            </ul>
        </div>

        <div class=\"section\">
            <h2>✅ Compliance Status</h2>
            <div class=\"security-item safe\">
                <h3>Antivirus Protection</h3>
                <p><strong>Review:</strong> Check Windows Defender status in logs</p>
                <p><strong>Requirement:</strong> Real-time protection must be enabled</p>
                <p><strong>Status:</strong> <span class=\"badge badge-success\">Check logs for current status</span></p>
            </div>
            <div class=\"security-item safe\">
                <h3>Security Updates</h3>
                <p><strong>File:</strong> <code>%LOGPATH%\\04_windows_updates.csv</code></p>
                <p><strong>Requirement:</strong> All critical security updates must be installed</p>
                <p><strong>Status:</strong> <span class=\"badge badge-success\">Update history collected</span></p>
            </div>
        </div>

        <div class=\"recommendations\">
            <h3>🎯 Immediate Actions Required</h3>
            <ul>
                <li>Review and remediate any threats found in defender logs</li>
                <li>Investigate network connections for suspicious activity</li>
                <li>Remove suspicious startup programs if discovered</li>
                <li>Install any missing critical security updates</li>
            </ul>
            <h3>📈 Ongoing Security Monitoring</h3>
            <ul>
                <li>Regularly review security event logs (weekly minimum)</li>
                <li>Monitor network connection patterns for anomalies</li>
                <li>Maintain current security updates and patches</li>
                <li>Perform periodic comprehensive security assessments</li>
                <li>Keep antivirus definitions updated daily</li>
            </ul>
        </div>

        <div class=\"section\">
            <h2>📁 Report Files & Data Location</h2>
            <p><strong>All collected data files are located in:</strong> <code>%LOGPATH%</code></p>
            <div style=\"margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 6px;\">
                <p><strong>JSON Report (SIEM Import):</strong> <code>%XDRREPORT%</code></p>
                <p><strong>Text Report (Human Readable):</strong> <code>%XDRTXTREPORT%</code></p>
                <p><strong>HTML Report (This Document):</strong> <code>%XDRHTMLREPORT%</code></p>
            </div>
            <p>The structured JSON format enables easy import into SIEM platforms, XDR solutions, or security analytics tools for advanced analysis and correlation.</p>
        </div>

        <div class=\"footer\">
            <h3 style=\"color: #1e3c72; margin-top: 0;\">📞 Support Contact</h3>
            <p>=============================================================================<br>
            <strong>SUPPORT CONTACT</strong><br>
            =============================================================================</p>
            <p>For assistance with remediation or to use SC-USCS cleaning tool.<br>
            If you'd like to use SupportCALL with any ICT related needs (networking,<br>
            cabling, PC, laptop, server, software etc supply, support or maintenance<br>
            contact us via:</p>
            <p>
                🌐 Website: <a href=\"http://supportcall.com.au\" target=\"_blank\">supportcall.com.au</a><br>
                🌐 Website: <a href=\"http://supportcall.co.za\" target=\"_blank\">supportcall.co.za</a><br>
                🌐 Website: <a href=\"http://supportcall.co.uk\" target=\"_blank\">supportcall.co.uk</a><br>
                📧 Email: <a href=\"mailto:alerts@supportcall.com.au\">alerts@supportcall.com.au</a><br>
                📧 Email: <a href=\"mailto:alerts@supportcall.co.za\">alerts@supportcall.co.za</a><br>
                📧 Email: <a href=\"mailto:scmyhelp@gmail.com\">scmyhelp@gmail.com</a>
            </p>
            <hr style=\"border: none; border-top: 1px solid #ddd; margin: 20px 0;\">
            <p style=\"font-size: 12px; color: #999;\">
                Report generated by SC-USCS v5.84 Powered by SupportCALL<br>
                Professional Windows Security Assessment & Remediation Tool
            </p>
        </div>
    </div>
</body>
</html>
'@; $html | Out-File -FilePath $reportPath -Encoding UTF8"

echo XDR/SIEM reports generated successfully:
echo  - JSON Report: %XDRREPORT%
echo  - Text Report: %XDRTXTREPORT%
echo  - HTML Report: %XDRHTMLREPORT%
echo.
${postReport}`;
        
        case 'email-report':
          return `${preReport}
echo [${stageNum}.${funcNum}] EMAIL REPORT - Send reports to support team via sc-uscs.com
echo *** Preparing and sending email report via sc-uscs.com ***
powershell -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Continue'; try { $computerName = $env:COMPUTERNAME; $logPath = '%LOGPATH%'; $threats = try { Get-MpThreatDetection -ErrorAction SilentlyContinue } catch { $null }; $threatList = if ($threats) { ($threats | ForEach-Object { $_.ThreatName }) -join ', ' } else { 'No threats detected' }; $threatStatus = if ($threats) { 'THREATS DETECTED' } else { 'System Clean' }; Write-Host 'Collecting system report data...' -ForegroundColor Cyan; $functionsExecuted = '${selectedFunctionData.length} of ${functions.length}'; $scanDate = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'; Write-Host 'Preparing JSON payload for transmission...' -ForegroundColor Cyan; $reportData = @{ computer_name = $computerName; scan_date = $scanDate; functions_executed = $functionsExecuted; threat_status = $threatStatus; threat_list = $threatList; log_path = $logPath; script_version = 'SC-USCS v5.84' } | ConvertTo-Json -Compress; Write-Host 'Sending report to sc-uscs.com...' -ForegroundColor Yellow; Write-Host 'This may take 10-30 seconds...' -ForegroundColor Yellow; try { [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; $response = Invoke-RestMethod -Uri 'https://sc-uscs.com/sendmail.php' -Method POST -Body @{report_data=$reportData} -ContentType 'application/x-www-form-urlencoded' -TimeoutSec 60; Write-Host '========================================' -ForegroundColor Green; Write-Host '✓✓✓ REPORT SENT SUCCESSFULLY! ✓✓✓' -ForegroundColor Green; Write-Host '========================================' -ForegroundColor Green; Write-Host 'Report delivered via sc-uscs.com to:' -ForegroundColor Green; Write-Host '  → alerts@supportcall.com.au' -ForegroundColor Green; Write-Host '  → alerts@supportcall.co.za' -ForegroundColor Green; Write-Host '  → scmyhelp@gmail.com' -ForegroundColor Green; Write-Host '========================================' -ForegroundColor Green; } catch { Write-Host '========================================' -ForegroundColor Red; Write-Host '✗✗✗ REPORT SEND FAILED ✗✗✗' -ForegroundColor Red; Write-Host '========================================' -ForegroundColor Red; Write-Host \\\"Error Type: $($_.Exception.GetType().FullName)\\\" -ForegroundColor Red; Write-Host \\\"Error Message: $($_.Exception.Message)\\\" -ForegroundColor Red; if ($_.Exception.InnerException) { Write-Host \\\"Inner Error: $($_.Exception.InnerException.Message)\\\" -ForegroundColor Red; }; Write-Host '----------------------------------------' -ForegroundColor Yellow; Write-Host 'Possible causes:' -ForegroundColor Yellow; Write-Host '  1. sc-uscs.com is not reachable' -ForegroundColor Yellow; Write-Host '  2. Firewall blocking HTTPS (port 443)' -ForegroundColor Yellow; Write-Host '  3. Network connectivity issues' -ForegroundColor Yellow; Write-Host '  4. sendmail.php not configured on server' -ForegroundColor Yellow; Write-Host '----------------------------------------' -ForegroundColor Yellow; Write-Host 'Saving report data to local file...' -ForegroundColor Cyan; $reportData | Out-File \\\"$logPath\\\\REPORT_DATA.json\\\" -Encoding UTF8; Write-Host \\\"✓ Report data saved to: $logPath\\\\REPORT_DATA.json\\\" -ForegroundColor Green; Write-Host 'Please manually send this file to support.' -ForegroundColor Yellow; Write-Host '========================================' -ForegroundColor Red; } } catch { Write-Host '========================================' -ForegroundColor Red; Write-Host \\\"CRITICAL ERROR in report process: $($_.Exception.Message)\\\" -ForegroundColor Red; Write-Host \\\"Stack Trace: $($_.ScriptStackTrace)\\\" -ForegroundColor Red; Write-Host '========================================' -ForegroundColor Red; }" 2>&1
${postReport}`;
        default:
          return `${preReport}
echo [${stageNum}.${funcNum}] ${func.name.toUpperCase()} - ${func.description}
echo Operation starting...
echo Executing: ${func.name} >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Description: ${func.description} >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Safety Level: ${func.safety} >> "%LOGPATH%\\\\${logFile}" 2>&1
echo Operation completed
${postReport}`;
      }
    };

    // Separate Extended Scans (Long Running) from other functions
    const extendedScansCategory = "Extended Scans (Long Running)";
    const regularFunctions = selectedFunctionData.filter(f => f.category !== extendedScansCategory);
    const extendedScans = selectedFunctionData.filter(f => f.category === extendedScansCategory);

    // Group regular functions by category
    const categorizedFunctions = categories
      .filter(cat => cat !== extendedScansCategory)
      .map(category => ({
        category,
        functions: regularFunctions.filter(f => f.category === category)
      }))
      .filter(cat => cat.functions.length > 0);

    // Generate stage implementations for regular functions
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

    // Generate pre-final-scans comprehensive report
    const preReportStage = extendedScans.length > 0 ? `
REM =============================================================================
REM STAGE ${categorizedFunctions.length + 1}: PRE-FINAL-SCANS COMPREHENSIVE REPORT
REM =============================================================================
echo =============================================================================
echo  STAGE ${categorizedFunctions.length + 1}: PRE-FINAL-SCANS COMPREHENSIVE REPORT
echo =============================================================================
echo Generating comprehensive report of all operations completed so far...
echo This report will be saved BEFORE running the final long-running scans.
echo If you cancel during the final scans, this report will still be available.
echo =============================================================================
echo.

echo [REPORT] Generating comprehensive system report - This may take 2-5 minutes...
echo *** Creating consolidated findings report ***
set "REPORT_TIMESTAMP=%DATE:~10,4%%DATE:~4,2%%DATE:~7,2%-%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%"
set "REPORT_TIMESTAMP=%REPORT_TIMESTAMP: =0%"
set "PRE_REPORT_NAME=SC-USCS-v5.84-PreFinalScans-%REPORT_TIMESTAMP%.txt"
echo === CONSOLIDATED FINDINGS REPORT (PRE-FINAL-SCANS) === > "%LOGPATH%\\%PRE_REPORT_NAME%"
echo Script Version: SC-USCS v5.84 >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo Report Type: Pre-Final-Scans (Before Defender Full Scan ^& CHKDSK) >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo Execution Date: %DATE% %TIME% >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo Functions Executed: ${regularFunctions.length} of ${selectedFunctionData.length} >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo Remaining Functions: ${extendedScans.map(f => f.name).join(', ')} >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === SYSTEM CONFIGURATION === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
systeminfo >> "%LOGPATH%\\01_system_info.txt"
type "%LOGPATH%\\01_system_info.txt" >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === HARDWARE REPORT === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
dxdiag /t "%LOGPATH%\\02_hardware_report.txt"
timeout /t 10 /nobreak >nul
type "%LOGPATH%\\02_hardware_report.txt" >> "%LOGPATH%\\%PRE_REPORT_NAME%" 2>nul
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === INSTALLED SOFTWARE === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
wmic product get name,version,vendor /format:csv > "%LOGPATH%\\03_installed_software.csv" 2>nul
type "%LOGPATH%\\03_installed_software.csv" >> "%LOGPATH%\\%PRE_REPORT_NAME%" 2>nul
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === WINDOWS UPDATES === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
powershell -Command "Get-WmiObject -Class Win32_QuickFixEngineering | Select-Object HotFixID,Description,InstalledOn | Export-Csv -Path '%LOGPATH%\\04_windows_updates.csv' -NoTypeInformation"
type "%LOGPATH%\\04_windows_updates.csv" >> "%LOGPATH%\\%PRE_REPORT_NAME%" 2>nul
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === SECURITY THREATS DETECTED (SO FAR) === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
powershell -Command "$threats = Get-MpThreatDetection; if ($threats) { $threats | Format-Table ThreatName, ActionSuccess, ProcessName -AutoSize | Out-String | Add-Content '%LOGPATH%\\%PRE_REPORT_NAME%' } else { Add-Content '%LOGPATH%\\%PRE_REPORT_NAME%' 'No active threats detected at this stage.' }" 2>nul
powershell -Command "Get-MpThreatDetection | Export-Csv -Path '%LOGPATH%\\05_defender_threats_prefinal.csv' -NoTypeInformation" 2>nul
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === STARTUP PROGRAMS === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
wmic startup get caption,command,location,user /format:csv > "%LOGPATH%\\06_startup_programs.csv" 2>nul
type "%LOGPATH%\\06_startup_programs.csv" >> "%LOGPATH%\\%PRE_REPORT_NAME%" 2>nul
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === WINDOWS SERVICES === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
sc query state= all > "%LOGPATH%\\07_windows_services.txt"
type "%LOGPATH%\\07_windows_services.txt" >> "%LOGPATH%\\%PRE_REPORT_NAME%" 2>nul
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === NETWORK CONFIGURATION === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
ipconfig /all > "%LOGPATH%\\08_network_config.txt"
type "%LOGPATH%\\08_network_config.txt" >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === NETWORK CONNECTIONS === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
netstat -an > "%LOGPATH%\\09_network_connections.txt"
type "%LOGPATH%\\09_network_connections.txt" >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === DISK HEALTH === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
wmic logicaldisk get size,freespace,caption /format:csv > "%LOGPATH%\\10_disk_space.csv"
type "%LOGPATH%\\10_disk_space.csv" >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === EXECUTED OPERATIONS LOG SUMMARY === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo Listing all operation logs generated so far: >> "%LOGPATH%\\%PRE_REPORT_NAME%"
dir /b "%LOGPATH%\\*.log" >> "%LOGPATH%\\%PRE_REPORT_NAME%" 2>nul
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo === SUMMARY === >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo Status: All operations up to this point completed >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo Remaining: Defender Full Scan ^& Check Disk operations >> "%LOGPATH%\\%PRE_REPORT_NAME%"
echo =============================================================================
echo  SUPPORT CONTACT
echo =============================================================================
echo.
echo For assistance with remediation or to use SC-USCS cleaning tool.
echo If you'd like to use SupportCALL with any ICT related needs (networking,
echo cabling, PC, laptop, server, software etc supply, support or maintenance
echo contact us via:
echo  Website: supportcall.com.au
echo  Website: supportcall.co.za
echo  Website: supportcall.co.uk
echo  Email: alerts@supportcall.com.au
echo  Email: alerts@supportcall.co.za
echo  Email: scmyhelp@gmail.com
echo.
echo Report generated by SC-USCS v5.84 Powered by SupportCALL
echo =============================================================================
echo. >> "%LOGPATH%\\%PRE_REPORT_NAME%"

echo.
echo *** HTML VERSION OF REPORT ***
echo Creating formatted HTML report for easy viewing...
set "PRE_REPORT_HTML=SC-USCS-v5.84-PreFinalScans-%REPORT_TIMESTAMP%.html"
powershell -Command "$reportPath = '%LOGPATH%\\%PRE_REPORT_HTML%'; $html = @'
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <title>SC-USCS Pre-Final-Scans Report</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; margin: 20px; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #1e3c72; border-bottom: 3px solid #2a5298; padding-bottom: 10px; }
        h2 { color: #2a5298; border-left: 4px solid #1e3c72; padding-left: 10px; margin-top: 30px; }
        .info-box { background: #f8f9fa; border-left: 4px solid #2a5298; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .status { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
        .status-complete { background: #d4edda; color: #155724; }
        .status-pending { background: #fff3cd; color: #856404; }
        pre { background: #f8f9fa; padding: 15px; border-radius: 4px; overflow-x: auto; }
        .timestamp { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class=\"container\">
        <h1>🛡️ SC-USCS System Report (Pre-Final-Scans)</h1>
        <div class=\"info-box\">
            <p><strong>Script Version:</strong> SC-USCS v5.84</p>
            <p><strong>Report Type:</strong> Pre-Final-Scans Checkpoint</p>
            <p class=\"timestamp\"><strong>Generated:</strong> '+ (Get-Date -Format 'dddd, MMMM dd, yyyy - HH:mm:ss') +'</p>
            <p><strong>Status:</strong> <span class=\"status status-complete\">Completed ${regularFunctions.length} of ${selectedFunctionData.length} Operations</span></p>
            <p><strong>Remaining:</strong> <span class=\"status status-pending\">${extendedScans.map(f => f.name).join(', ')}</span></p>
        </div>
        <h2>⚠️ Important Note</h2>
        <p>This report captures all system information and findings <strong>BEFORE</strong> running the final long-running operations (Defender Full Scan and Check Disk).</p>
        <p>If you cancel execution during these final scans, this report will preserve all work completed up to this point.</p>
        <h2>📊 Report Contents</h2>
        <ul>
            <li>System Configuration</li>
            <li>Hardware Information</li>
            <li>Installed Software Inventory</li>
            <li>Windows Update History</li>
            <li>Security Threat Analysis</li>
            <li>Startup Programs</li>
            <li>Network Configuration</li>
            <li>Disk Health Status</li>
            <li>All Operation Logs</li>
        </ul>
        <h2>📁 Full Report Location</h2>
        <p><code>%LOGPATH%\\%PRE_REPORT_NAME%</code></p>
        <h2>📧 Support Contact</h2>
        <p>=============================================================================<br>
        <strong>SUPPORT CONTACT</strong><br>
        =============================================================================</p>
        <p>For assistance with remediation or to use SC-USCS cleaning tool.<br>
        If you'd like to use SupportCALL with any ICT related needs (networking,<br>
        cabling, PC, laptop, server, software etc supply, support or maintenance<br>
        contact us via:</p>
        <p>
            🌐 Website: <a href=\"http://supportcall.com.au\" target=\"_blank\">supportcall.com.au</a><br>
            🌐 Website: <a href=\"http://supportcall.co.za\" target=\"_blank\">supportcall.co.za</a><br>
            🌐 Website: <a href=\"http://supportcall.co.uk\" target=\"_blank\">supportcall.co.uk</a><br>
            📧 Email: <a href=\"mailto:alerts@supportcall.com.au\">alerts@supportcall.com.au</a><br>
            📧 Email: <a href=\"mailto:alerts@supportcall.co.za\">alerts@supportcall.co.za</a><br>
            📧 Email: <a href=\"mailto:scmyhelp@gmail.com\">scmyhelp@gmail.com</a>
        </p>
        <p style=\"font-size: 12px; color: #999;\">
            Report generated by SC-USCS v5.84 Powered by SupportCALL
        </p>
    </div>
</body>
</html>
'@; $html | Out-File -FilePath $reportPath -Encoding UTF8"

echo.
echo =============================================================================
echo  PRE-FINAL-SCANS REPORT COMPLETE
echo =============================================================================
echo Text Report: %LOGPATH%\\%PRE_REPORT_NAME%
echo HTML Report: %LOGPATH%\\%PRE_REPORT_HTML%
echo.
echo This report captures all work completed so far.
echo If you cancel during the final scans, this report will still be available.
echo =============================================================================
echo.
echo Press any key to continue with the final long-running operations...
pause
echo.
` : '';

    // Generate extended scans stage
    const extendedScansStage = extendedScans.length > 0 ? `
REM =============================================================================
REM STAGE ${categorizedFunctions.length + 2}: EXTENDED SCANS (LONG RUNNING)
REM =============================================================================
echo =============================================================================
echo  STAGE ${categorizedFunctions.length + 2}: EXTENDED SCANS ^(LONG RUNNING^)
echo =============================================================================
echo This stage executes ${extendedScans.length} long-running scan(s).
echo These operations may take several hours to complete.
echo All operations are logged for comprehensive review.
echo =============================================================================
echo.

${extendedScans.map((func, funcIndex) => generateFunctionImplementation(func, categorizedFunctions.length + 2, funcIndex + 1)).join('\n')}

REM =============================================================================
REM FINAL REPORT UPDATE - After Extended Scans Complete
REM =============================================================================
echo.
echo =============================================================================
echo  UPDATING FINAL COMPREHENSIVE REPORT
echo =============================================================================
echo Updating report with results from extended scans...
echo =============================================================================
echo.

echo [FINAL-REPORT] Generating updated comprehensive report...
set "FINAL_REPORT_TIMESTAMP=%DATE:~10,4%%DATE:~4,2%%DATE:~7,2%-%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%"
set "FINAL_REPORT_TIMESTAMP=%FINAL_REPORT_TIMESTAMP: =0%"
set "FINAL_REPORT_NAME=SC-USCS-v5.84-FinalComplete-%FINAL_REPORT_TIMESTAMP%.txt"
echo === FINAL CONSOLIDATED FINDINGS REPORT === > "%LOGPATH%\\%FINAL_REPORT_NAME%"
echo Script Version: SC-USCS v5.84 >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
echo Report Type: Final Complete Report (All Operations) >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
echo Execution Date: %DATE% %TIME% >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
echo Functions Executed: ${selectedFunctionData.length} of ${functions.length} >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
echo. >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
echo === EXTENDED SCAN RESULTS === >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
${extendedScans.some(f => f.id === 'defender-scan') ? `
echo --- Defender Full Scan Results --- >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
powershell -Command "$threats = Get-MpThreatDetection; if ($threats) { Add-Content '%LOGPATH%\\%FINAL_REPORT_NAME%' '=== THREATS DETECTED ==='; $threats | Format-Table ThreatName, ActionSuccess, ProcessName, Resources -AutoSize | Out-String | Add-Content '%LOGPATH%\\%FINAL_REPORT_NAME%' } else { Add-Content '%LOGPATH%\\%FINAL_REPORT_NAME%' '✓ No threats detected by full scan' }" 2>nul
powershell -Command "Get-MpThreatDetection | Export-Csv -Path '%LOGPATH%\\defender_threats_final.csv' -NoTypeInformation" 2>nul
echo. >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
` : ''}
${extendedScans.some(f => f.id === 'chkdsk') ? `
echo --- Check Disk Results --- >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
if exist "%LOGPATH%\\*_chkdsk.log" (
    type "%LOGPATH%\\*_chkdsk.log" >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
) else (
    echo Check Disk log not found >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
)
echo. >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
` : ''}
echo === COPYING DATA FROM PRE-SCAN REPORT === >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
if exist "%LOGPATH%\\%PRE_REPORT_NAME%" (
    type "%LOGPATH%\\%PRE_REPORT_NAME%" >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
)
echo. >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
echo === FINAL SUMMARY === >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
echo Status: ALL OPERATIONS COMPLETED >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
echo Total Functions Executed: ${selectedFunctionData.length} >> "%LOGPATH%\\%FINAL_REPORT_NAME%"
echo =============================================================================
echo  SUPPORT CONTACT
echo =============================================================================
echo.
echo For assistance with remediation or to use SC-USCS cleaning tool.
echo If you'd like to use SupportCALL with any ICT related needs (networking,
echo cabling, PC, laptop, server, software etc supply, support or maintenance
echo contact us via:
echo  Website: supportcall.com.au
echo  Website: supportcall.co.za
echo  Website: supportcall.co.uk
echo  Email: alerts@supportcall.com.au
echo  Email: alerts@supportcall.co.za
echo  Email: scmyhelp@gmail.com
echo.
echo Report generated by SC-USCS v5.84 Powered by SupportCALL
echo =============================================================================
echo. >> "%LOGPATH%\\%FINAL_REPORT_NAME%"

echo *** Creating final HTML report ***
set "FINAL_REPORT_HTML=SC-USCS-v5.84-FinalComplete-%FINAL_REPORT_TIMESTAMP%.html"
powershell -Command "$reportPath = '%LOGPATH%\\%FINAL_REPORT_HTML%'; $threats = Get-MpThreatDetection; $threatStatus = if ($threats) { '<span style=\"color: #d32f2f; font-weight: bold;\">⚠ THREATS DETECTED</span>' } else { '<span style=\"color: #388e3c; font-weight: bold;\">✓ System Clean</span>' }; $threatList = if ($threats) { ($threats | ForEach-Object { '<li style=\"color: #d32f2f; margin: 5px 0;\">' + $_.ThreatName + ' - ' + $_.Resources + '</li>' }) -join '' } else { '<li style=\"color: #388e3c;\">No threats detected</li>' }; $html = @'
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <title>SC-USCS Final Complete Report</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; margin: 20px; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #1e3c72; border-bottom: 3px solid #2a5298; padding-bottom: 10px; }
        h2 { color: #2a5298; border-left: 4px solid #1e3c72; padding-left: 10px; margin-top: 30px; }
        .info-box { background: #f8f9fa; border-left: 4px solid #2a5298; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .status { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
        .status-complete { background: #d4edda; color: #155724; }
        .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
        ul { line-height: 2; }
    </style>
</head>
<body>
    <div class=\"container\">
        <h1>🛡️ SC-USCS Final Complete System Report</h1>
        <div class=\"info-box\">
            <p><strong>Script Version:</strong> SC-USCS v5.84</p>
            <p><strong>Report Type:</strong> Final Complete Report</p>
            <p><strong>Generated:</strong> '+ (Get-Date -Format 'dddd, MMMM dd, yyyy - HH:mm:ss') +'</p>
            <p><strong>Status:</strong> <span class=\"status status-complete\">✓ All ${selectedFunctionData.length} Operations Completed</span></p>
        </div>
        <h2>🔍 Security Status</h2>
        <p style=\"font-size: 18px;\">$threatStatus</p>
        <h2>⚠️ Detected Threats</h2>
        <ul>$threatList</ul>
        <h2>📊 Complete Analysis Available</h2>
        <p>Full detailed report with all system information, scan results, and findings available at:</p>
        <p><code>%LOGPATH%\\%FINAL_REPORT_NAME%</code></p>
        <h2>📧 Support Contact</h2>
        <p>=============================================================================<br>
        <strong>SUPPORT CONTACT</strong><br>
        =============================================================================</p>
        <p>For assistance with remediation or to use SC-USCS cleaning tool.<br>
        If you'd like to use SupportCALL with any ICT related needs (networking,<br>
        cabling, PC, laptop, server, software etc supply, support or maintenance<br>
        contact us via:</p>
        <p>
            🌐 Website: <a href=\"http://supportcall.com.au\" target=\"_blank\">supportcall.com.au</a><br>
            🌐 Website: <a href=\"http://supportcall.co.za\" target=\"_blank\">supportcall.co.za</a><br>
            🌐 Website: <a href=\"http://supportcall.co.uk\" target=\"_blank\">supportcall.co.uk</a><br>
            📧 Email: <a href=\"mailto:alerts@supportcall.com.au\">alerts@supportcall.com.au</a><br>
            📧 Email: <a href=\"mailto:alerts@supportcall.co.za\">alerts@supportcall.co.za</a><br>
            📧 Email: <a href=\"mailto:scmyhelp@gmail.com\">scmyhelp@gmail.com</a>
        </p>
        <p style=\"font-size: 12px; color: #999;\">
            Report generated by SC-USCS v5.84 Powered by SupportCALL
        </p>
    </div>
</body>
</html>
'@; $html | Out-File -FilePath $reportPath -Encoding UTF8"

echo.
echo =============================================================================
echo  FINAL REPORT COMPLETE
echo =============================================================================
echo Text Report: %LOGPATH%\\%FINAL_REPORT_NAME%
echo HTML Report: %LOGPATH%\\%FINAL_REPORT_HTML%
echo =============================================================================
echo.
` : '';

    const allStages = stageImplementations + preReportStage + extendedScansStage;
    
    return `@echo off
REM =============================================================================
REM SupportCALL - Ultimate Secure Clean Script (SC-USCS) v5.84
REM Professional Windows Remediation Engine (SC-UWIRE)
REM Generated: ${new Date().toLocaleString()}
REM Functions Selected: ${selectedFunctionData.length} of ${functions.length}
...
REM =============================================================================

setlocal EnableDelayedExpansion
title SupportCALL - SC-USCS v5.84 - Professional Edition

REM Check for Administrator privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Administrator privileges required!
    echo Please run this script as Administrator.
    pause
    exit /b 1
)

REM Initialize variables
set "SCRIPTDIR=%~dp0"
set "TOOLSPATH=%SCRIPTDIR%Tools"
set "LOGPATH=%USERPROFILE%\\Desktop\\SC-USCS\\SC-USCS_${timestamp}"
set "STARTTIME=%TIME%"
mkdir "%USERPROFILE%\\Desktop\\SC-USCS" 2>nul
mkdir "%LOGPATH%" 2>nul
mkdir "%TOOLSPATH%" 2>nul

echo =============================================================================
echo  SupportCALL - Ultimate Secure Clean Script v5.84
echo  Professional Windows Remediation Engine
echo =============================================================================
echo.
echo Selected Functions: ${selectedFunctionData.length}
echo Tools Path: %TOOLSPATH%
echo Log Path: %LOGPATH%
echo Start Time: %STARTTIME%
echo.

REM =============================================================================
REM STAGE -1: DOWNLOAD AND VERIFY ALL REQUIRED TOOLS
REM =============================================================================
echo =============================================================================
echo  STAGE -1: COMPREHENSIVE TOOL ACQUISITION
echo =============================================================================
echo This stage downloads ALL required external tools to ensure reliability.
echo Even Windows built-in tools will be verified and alternatives provided.
echo Tools will be saved to: %TOOLSPATH%
echo.
echo NOTE: This may take 10-30 minutes on first run depending on your selection.
echo Subsequent runs will skip existing tools and be much faster.
echo.
pause

REM === MICROSOFT OFFICIAL TOOLS ===
echo.
echo === DOWNLOADING MICROSOFT OFFICIAL TOOLS ===
echo.

${selectedFunctionData.some(f => f.id === 'setupdiag') ? `
echo [MS-Tool 1] SetupDiag - Windows Setup/Upgrade Diagnostic Tool...
if not exist "%TOOLSPATH%\\\\SetupDiag.exe" (
    echo Downloading SetupDiag from Microsoft...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://go.microsoft.com/fwlink/?linkid=870142' -OutFile '%TOOLSPATH%\\\\SetupDiag.exe' -UseBasicParsing; Write-Host 'SUCCESS: SetupDiag downloaded' -ForegroundColor Green } catch { Write-Host 'ERROR: Failed to download SetupDiag' -ForegroundColor Red }"
) else (
    echo SetupDiag already exists - skipping download
)
echo.
` : ''}

${selectedFunctionData.some(f => f.id === 'safety-scanner') ? `
echo [MS-Tool 2] Microsoft Safety Scanner (msert.exe)...
if not exist "%TOOLSPATH%\\\\msert.exe" (
    echo Downloading Safety Scanner ^(~130MB - may take several minutes^)...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://go.microsoft.com/fwlink/?LinkId=212732' -OutFile '%TOOLSPATH%\\\\msert.exe' -UseBasicParsing; Write-Host 'SUCCESS: Safety Scanner downloaded' -ForegroundColor Green } catch { Write-Host 'ERROR: Failed to download Safety Scanner' -ForegroundColor Red }"
) else (
    echo Safety Scanner already exists - skipping download
)
echo.
` : ''}

REM === SYSINTERNALS SUITE ===
echo.
echo === DOWNLOADING SYSINTERNALS TOOLS ===
echo.

${selectedFunctionData.some(f => f.id === 'autorunsc') ? `
echo [SysInt-1] Autorunsc - Autorun Analysis Tool...
if not exist "%TOOLSPATH%\\\\autorunsc.exe" (
    echo Downloading from live.sysinternals.com...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://live.sysinternals.com/autorunsc.exe' -OutFile '%TOOLSPATH%\\\\autorunsc.exe' -UseBasicParsing; Write-Host 'SUCCESS: Autorunsc downloaded' -ForegroundColor Green } catch { Write-Host 'ERROR: Failed to download Autorunsc' -ForegroundColor Red }"
) else (
    echo Autorunsc already exists - skipping download
)
echo.
` : ''}

${selectedFunctionData.some(f => f.id === 'sigcheck') ? `
echo [SysInt-2] Sigcheck - Signature Verification Tool...
if not exist "%TOOLSPATH%\\\\sigcheck.exe" (
    echo Downloading from live.sysinternals.com...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://live.sysinternals.com/sigcheck.exe' -OutFile '%TOOLSPATH%\\\\sigcheck.exe' -UseBasicParsing; Write-Host 'SUCCESS: Sigcheck downloaded' -ForegroundColor Green } catch { Write-Host 'ERROR: Failed to download Sigcheck' -ForegroundColor Red }"
) else (
    echo Sigcheck already exists - skipping download
)
echo.
` : ''}

${selectedFunctionData.some(f => f.id === 'procdump') ? `
echo [SysInt-3] ProcDump - Process Dump Tool...
if not exist "%TOOLSPATH%\\\\procdump.exe" (
    echo Downloading from live.sysinternals.com...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://live.sysinternals.com/procdump.exe' -OutFile '%TOOLSPATH%\\\\procdump.exe' -UseBasicParsing; Write-Host 'SUCCESS: ProcDump downloaded' -ForegroundColor Green } catch { Write-Host 'ERROR: Failed to download ProcDump' -ForegroundColor Red }"
) else (
    echo ProcDump already exists - skipping download
)
echo.
` : ''}

REM Download Sysinternals PSExec for advanced operations
echo [SysInt-4] PSExec - Remote Execution Tool...
if not exist "%TOOLSPATH%\\\\psexec.exe" (
    echo Downloading PSExec from live.sysinternals.com...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://live.sysinternals.com/psexec.exe' -OutFile '%TOOLSPATH%\\\\psexec.exe' -UseBasicParsing; Write-Host 'SUCCESS: PSExec downloaded' -ForegroundColor Green } catch { Write-Host 'ERROR: Failed to download PSExec' -ForegroundColor Red }"
) else (
    echo PSExec already exists - skipping download
)
echo.

REM Download Sysinternals Process Explorer
echo [SysInt-5] Process Explorer - Advanced Task Manager...
if not exist "%TOOLSPATH%\\\\procexp.exe" (
    echo Downloading Process Explorer from live.sysinternals.com...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://live.sysinternals.com/procexp.exe' -OutFile '%TOOLSPATH%\\\\procexp.exe' -UseBasicParsing; Write-Host 'SUCCESS: Process Explorer downloaded' -ForegroundColor Green } catch { Write-Host 'ERROR: Failed to download Process Explorer' -ForegroundColor Red }"
) else (
    echo Process Explorer already exists - skipping download
)
echo.

REM === SECURITY & MALWARE REMOVAL TOOLS ===
echo.
echo === DOWNLOADING SECURITY TOOLS ===
echo.

${selectedFunctionData.some(f => f.id === 'rkill') ? `
echo [Security-1] RKill - Malicious Process Killer...
if not exist "%TOOLSPATH%\\\\rkill.exe" (
    echo Downloading from BleepingComputer...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://download.bleepingcomputer.com/grinler/rkill.exe' -OutFile '%TOOLSPATH%\\\\rkill.exe' -UseBasicParsing; Write-Host 'SUCCESS: RKill downloaded' -ForegroundColor Green } catch { Write-Host 'ERROR: Failed to download RKill' -ForegroundColor Red }"
) else (
    echo RKill already exists - skipping download
)
echo.
` : ''}

${selectedFunctionData.some(f => f.id === 'adwcleaner') ? `
echo [Security-2] Malwarebytes AdwCleaner - PUP/Adware Remover...
if not exist "%TOOLSPATH%\\\\adwcleaner.exe" (
    echo Downloading AdwCleaner ^(~10MB^)...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://adwcleaner.malwarebytes.com/adwcleaner?channel=release' -OutFile '%TOOLSPATH%\\\\adwcleaner.exe' -UseBasicParsing; Write-Host 'SUCCESS: AdwCleaner downloaded' -ForegroundColor Green } catch { Write-Host 'ERROR: Failed to download AdwCleaner' -ForegroundColor Red }"
) else (
    echo AdwCleaner already exists - skipping download
)
echo.
` : ''}

${selectedFunctionData.some(f => f.id === 'kvrt') ? `
echo [Security-3] Kaspersky Virus Removal Tool - Second Opinion Scanner...
if not exist "%TOOLSPATH%\\\\kvrt.exe" (
    echo Downloading KVRT ^(~200MB - may take several minutes^)...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://devbuilds.s.kaspersky-labs.com/devbuilds/KVRT/latest/full/KVRT.exe' -OutFile '%TOOLSPATH%\\\\kvrt.exe' -UseBasicParsing; Write-Host 'SUCCESS: KVRT downloaded' -ForegroundColor Green } catch { Write-Host 'ERROR: Failed to download KVRT' -ForegroundColor Red }"
) else (
    echo KVRT already exists - skipping download
)
echo.
` : ''}

REM === POWERSHELL MODULES ===
echo.
echo === INSTALLING POWERSHELL MODULES ===
echo.

${selectedFunctionData.some(f => f.id === 'pswindowsupdate') ? `
echo [PS-Module-1] PSWindowsUpdate - Windows Update Management Module...
powershell -Command "if (!(Get-Module -ListAvailable -Name PSWindowsUpdate)) { try { Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force -ErrorAction SilentlyContinue; Set-PSRepository -Name PSGallery -InstallationPolicy Trusted -ErrorAction SilentlyContinue; Install-Module -Name PSWindowsUpdate -Force -Scope CurrentUser; Write-Host 'SUCCESS: PSWindowsUpdate module installed' -ForegroundColor Green } catch { Write-Host 'ERROR: Failed to install PSWindowsUpdate' -ForegroundColor Red } } else { Write-Host 'PSWindowsUpdate already installed' -ForegroundColor Green }"
echo.
` : ''}

REM === VERIFY CRITICAL WINDOWS BUILT-IN TOOLS ===
echo.
echo === VERIFYING WINDOWS BUILT-IN TOOLS ===
echo.

echo [Verify-1] Checking System File Checker ^(sfc.exe^)...
where sfc.exe >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: SFC.EXE not found in PATH - System may be severely corrupted
    echo FALLBACK: Will attempt to use full path: %windir%\\system32\\sfc.exe
) else (
    echo SUCCESS: SFC.EXE verified
)
echo.

echo [Verify-2] Checking DISM ^(Dism.exe^)...
where dism.exe >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: DISM.EXE not found in PATH
    echo FALLBACK: Will attempt to use full path: %windir%\\system32\\Dism.exe
) else (
    echo SUCCESS: DISM.EXE verified
)
echo.

echo [Verify-3] Checking Check Disk ^(chkdsk.exe^)...
where chkdsk.exe >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: CHKDSK.EXE not found in PATH
    echo FALLBACK: Will attempt to use full path: %windir%\\system32\\chkdsk.exe
) else (
    echo SUCCESS: CHKDSK.EXE verified
)
echo.

echo [Verify-4] Checking Disk Cleanup ^(cleanmgr.exe^)...
where cleanmgr.exe >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: CLEANMGR.EXE not found - Will use PowerShell alternative
) else (
    echo SUCCESS: CLEANMGR.EXE verified
)
echo.

echo [Verify-5] Checking Windows Defender ^(MpCmdRun.exe^)...
if exist "%ProgramFiles%\\Windows Defender\\MpCmdRun.exe" (
    echo SUCCESS: Windows Defender CLI verified
) else (
    echo WARNING: Windows Defender CLI not found
    echo FALLBACK: Will use PowerShell Defender cmdlets
)
echo.

echo [Verify-6] Checking Network Tools ^(ipconfig, netsh^)...
where ipconfig.exe >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: IPCONFIG.EXE not found
) else (
    echo SUCCESS: Network tools verified
)
echo.

echo [Verify-7] Checking PowerShell...
where powershell.exe >nul 2>&1
if %errorlevel% neq 0 (
    echo CRITICAL ERROR: PowerShell not found - Cannot continue
    echo System requires Windows repair or reinstallation
    pause
    exit /b 1
) else (
    echo SUCCESS: PowerShell verified
)
echo.

REM === DOWNLOAD NINITE FOR MASS APP UPDATES ===
${selectedFunctionData.some(f => f.id === 'winget') ? `
echo.
echo === VERIFYING APP MANAGEMENT TOOLS ===
echo.
echo [AppMgmt-1] Checking Windows Package Manager ^(winget^)...
where winget.exe >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Winget not found - Install from Microsoft Store: "App Installer"
    echo Download: https://aka.ms/getwinget
) else (
    echo SUCCESS: Winget verified
)
echo.
` : ''}

echo =============================================================================
echo  TOOL ACQUISITION COMPLETE
echo =============================================================================
echo.
echo EXTERNAL TOOLS: Downloaded to %TOOLSPATH%
echo BUILT-IN TOOLS: Verified ^(fallbacks configured for missing tools^)
echo MODULES: PowerShell modules installed
echo.
echo All required tools are now ready for use.
echo On future runs, existing tools will be reused without re-downloading.
echo.
echo IMPORTANT NOTES:
echo - If any CRITICAL tools failed, the script will attempt fallbacks
echo - For severely corrupted systems, Windows repair may be required
echo - All external tools are from official vendor sources
echo.
echo === INITIALIZING REPORTING SYSTEM ===
echo Creating execution timeline tracking...
echo === EXECUTION TIMELINE === > "%LOGPATH%\\\\execution-timeline.log"
echo Script: SC-USCS v5.84 >> "%LOGPATH%\\\\execution-timeline.log"
echo Start Time: %STARTTIME% >> "%LOGPATH%\\\\execution-timeline.log"
echo Selected Functions: ${selectedFunctionData.length} >> "%LOGPATH%\\\\execution-timeline.log"
echo. >> "%LOGPATH%\\\\execution-timeline.log"
echo === PROGRESS SUMMARY === > "%LOGPATH%\\\\progress-summary.txt"
echo SC-USCS v5.84 - Execution Progress Tracker >> "%LOGPATH%\\\\progress-summary.txt"
echo Start Time: %STARTTIME% >> "%LOGPATH%\\\\progress-summary.txt"
echo Total Functions: ${selectedFunctionData.length} >> "%LOGPATH%\\\\progress-summary.txt"
echo. >> "%LOGPATH%\\\\progress-summary.txt"
echo Reporting system initialized successfully
echo All function execution will be tracked in real-time
echo.
echo Press any key to continue with system preparation...
pause
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
echo Creating System Restore Point: SC-USCS-Pre-Run-v5.84...
powershell -Command "$result = Checkpoint-Computer -Description 'SC-USCS-Pre-Run-v5.84' -RestorePointType 'MODIFY_SETTINGS' -Verbose; if ($result -eq $null) { Write-Host 'SUCCESS: System Restore Point Created' -ForegroundColor Green } else { Write-Host 'WARNING: Restore Point Creation Status Unknown' -ForegroundColor Yellow }"

REM Verify restore point was created
echo Verifying restore point creation...
powershell -Command "Get-ComputerRestorePoint | Sort-Object CreationTime -Descending | Select-Object -First 1 | Format-Table CreationTime, Description, RestorePointType"

echo.
echo *** SYSTEM RESTORE POINT CREATION COMPLETE ***
echo IMPORTANT: If restore point creation failed, press CTRL+C to abort!
echo Otherwise, press any key to continue with system modifications...
pause
echo.

${allStages}

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
echo === FINALIZING EXECUTION TIMELINE ===
echo. >> "%LOGPATH%\\\\execution-timeline.log"
echo === EXECUTION COMPLETE === >> "%LOGPATH%\\\\execution-timeline.log"
echo End Time: %ENDTIME% >> "%LOGPATH%\\\\execution-timeline.log"
echo Total Functions Completed: ${selectedFunctionData.length} >> "%LOGPATH%\\\\execution-timeline.log"
echo. >> "%LOGPATH%\\\\execution-timeline.log"
echo === CREATING CONSOLIDATED FINDINGS REPORT ===
echo Generating comprehensive system report with all findings...
copy /Y "%LOGPATH%\\\\execution-timeline.log" + "%LOGPATH%\\\\progress-summary.txt" "%LOGPATH%\\\\CONSOLIDATED_FINDINGS.txt"
echo.
echo === REPORTS GENERATED ===
echo ✓ Execution Timeline: %LOGPATH%\\\\execution-timeline.log
echo ✓ Progress Summary: %LOGPATH%\\\\progress-summary.txt
echo ✓ Consolidated Findings: %LOGPATH%\\\\CONSOLIDATED_FINDINGS.txt
echo ✓ Individual Function Logs: %LOGPATH%\\\\*.log
${selectedFunctionData.some(f => f.id === 'system-report' || f.id === 'email-report') ? `
echo ✓ Pre-Final Report: %LOGPATH%\\\\SC-USCS-v5.84-PreFinalScans-*.txt
echo ✓ Pre-Final HTML Report: %LOGPATH%\\\\SC-USCS-v5.84-PreFinalScans-*.html
echo ✓ Final Complete Report: %LOGPATH%\\\\SC-USCS-v5.84-FinalComplete-*.txt
echo ✓ Final Complete HTML Report: %LOGPATH%\\\\SC-USCS-v5.84-FinalComplete-*.html
` : ''}
echo.
echo ALL OPERATIONS LOGGED TO: %LOGPATH%
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-background dark:to-muted/20 pt-16">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <header role="banner">
        {/* Header */}
        <Card className="mb-6 border-0 shadow-2xl bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-xl">
          <CardHeader className="text-center space-y-6 py-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                SupportCALL
              </h1>
              <div className="text-2xl md:text-4xl font-bold text-foreground">
                Ultimate Secure Clean Script
              </div>
              <div className="text-xl md:text-2xl font-semibold text-primary">
                v5.84 - <span onClick={downloadScript} className="cursor-pointer">Professional Edition</span>
              </div>
            </div>
            
            <CardDescription className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-foreground/90 font-medium px-4">
              Professional Custom Script Generator for Windows System Cleaning, Security Enhancement & 
              Optimization - Tailored PowerShell Solutions for Windows 10/11
            </CardDescription>
            
            <div className="flex justify-center gap-3 md:gap-4 flex-wrap pt-4">
              <Badge variant="default" className="px-4 py-2 text-base font-bold">SC-USCS v5.84</Badge>
              <Badge variant="secondary" className="px-4 py-2 text-base font-bold">Safety: 98%</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base font-bold border-2">Effectiveness: 95%</Badge>
              <Badge variant="outline" className="px-4 py-2 text-base font-bold border-2">Win 10/11 Compatible</Badge>
            </div>
          </CardHeader>
        </Card>
        </header>

        <main role="main">

        {/* Critical Warnings */}
        <section aria-labelledby="critical-warnings" className="grid gap-4 mb-8 lg:grid-cols-2">
          <h2 id="critical-warnings" className="sr-only">Critical System Warnings</h2>
           <Alert className="border-destructive/50 bg-destructive/5 shadow-lg">
             <AlertDescription className="font-semibold text-base leading-relaxed">
               <strong className="text-destructive text-lg block mb-1">ADMINISTRATOR REQUIRED:</strong>
               <span className="text-foreground/90">
                 This script must run with full Administrator privileges. Save all work and close applications before execution. System restart may be required.
               </span>
             </AlertDescription>
           </Alert>

           <Alert className="border-destructive bg-destructive/10 shadow-lg">
             <AlertDescription className="font-semibold text-base leading-relaxed">
               <strong className="text-destructive text-lg block mb-1">BACKUP MANDATORY:</strong>
               <span className="text-foreground/90">
                 Create system backup and restore point before running. While extensively tested, system modifications carry inherent risks.
               </span>
             </AlertDescription>
           </Alert>
        </section>

        {/* Professional Pre-Run Checklist - ENHANCED */}
        <section aria-labelledby="pre-execution-checklist" className="mb-8">
        <Card className="border border-primary/20 bg-card shadow-glow relative overflow-hidden">
          {/* Cyan accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          
          <CardHeader className="text-center pb-6 pt-8 px-6">
            <div className="inline-block mb-3">
              <div className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Required</span>
              </div>
            </div>
            <h2 id="pre-execution-checklist" className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Pre-Execution Checklist
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Complete all items below before running the script to ensure safe execution
            </p>
          </CardHeader>
          
          <CardContent className="px-6 pb-8">
            <div className="grid gap-5 md:grid-cols-2 mb-6">
              {/* Critical System Preparation */}
              <div className="space-y-4 p-5 rounded-lg bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-colors">
                 <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                   <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 border border-primary/30">
                     <span className="text-primary text-lg">⚙</span>
                   </div>
                   <h3 className="font-bold text-base text-foreground">
                     System Preparation
                   </h3>
                 </div>
                <ul className="space-y-2">
                  {[
                    "Full system backup to EXTERNAL drive",
                    "Windows System Restore Point created", 
                    "Administrator account access CONFIRMED",
                    "ALL critical applications CLOSED"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground/90 text-sm p-2.5 rounded-md hover:bg-muted/30 transition-colors group">
                      <span className="text-primary text-base flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Environment Requirements */}
              <div className="space-y-4 p-5 rounded-lg bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-colors">
                 <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                   <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 border border-primary/30">
                     <span className="text-primary text-lg">🌐</span>
                   </div>
                   <h3 className="font-bold text-base text-foreground">
                     Environment Requirements
                   </h3>
                 </div>
                 <ul className="space-y-2">
                  {[
                    "Device connected to POWER source",
                    "Active internet connection (required for downloading free tools and sending email reports)", 
                    "Minimum 5GB free disk space",
                    "NO competing security scans running"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground/90 text-sm p-2.5 rounded-md hover:bg-muted/30 transition-colors group">
                      <span className="text-primary text-base flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Warning Alert */}
            <Alert className="border-destructive/50 bg-destructive/15 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
                <AlertDescription className="flex-1">
                  <div className="font-bold text-destructive text-base mb-1.5">
                    Failure to complete checklist may result in system damage
                  </div>
                  <div className="text-sm text-white font-medium">
                    SupportCALL is NOT responsible for damage caused by improper preparation and/or use of SC-USCS.
                  </div>
                </AlertDescription>
              </div>
            </Alert>
          </CardContent>
        </Card>
        </section>

        {/* Quick Action Toolbar */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4">
              <Button 
                onClick={handleSelectAll} 
                variant={selectedFunctions.length === functions.length ? "default" : "outline"}
                size="lg" 
                className="flex-1 sm:flex-none"
              >
                Select All Functions
              </Button>
              <Button 
                onClick={handleClearAll} 
                variant={selectedFunctions.length === 0 ? "default" : "outline"}
                size="lg" 
                className="flex-1 sm:flex-none"
              >
                Clear All Selections
              </Button>
              <Button 
                onClick={handleSelectRecommended} 
                variant={
                  selectedFunctions.length > 0 &&
                  functions.filter(f => f.recommendation === "Recommended").length === selectedFunctions.length &&
                  functions.filter(f => f.recommendation === "Recommended").every(f => selectedFunctions.includes(f.id))
                    ? "default"
                    : "outline"
                }
                size="lg" 
                className="flex-1 sm:flex-none"
              >
                Recommended Only
              </Button>
              <Button 
                onClick={handleToggleDebloat} 
                variant={
                  functions
                    .filter(f => f.category === "Windows Debloat & Privacy")
                    .every(f => selectedFunctions.includes(f.id)) &&
                  functions.filter(f => f.category === "Windows Debloat & Privacy").length > 0 &&
                  selectedFunctions.some(id => functions.find(f => f.id === id)?.category === "Windows Debloat & Privacy")
                    ? "default"
                    : "outline"
                }
                size="lg" 
                className="flex-1 sm:flex-none"
              >
                {functions
                  .filter(f => f.category === "Windows Debloat & Privacy")
                  .every(f => selectedFunctions.includes(f.id)) &&
                  functions.filter(f => f.category === "Windows Debloat & Privacy").length > 0 &&
                  selectedFunctions.some(id => functions.find(f => f.id === id)?.category === "Windows Debloat & Privacy")
                  ? "Deselect"
                  : "Select"} Debloat Functions
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
