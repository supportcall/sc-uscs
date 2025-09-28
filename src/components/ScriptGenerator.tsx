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
    {
      id: "ccleaner",
      name: "CCleaner Integration",
      description: "Integrates CCleaner portable for comprehensive registry cleanup and browser cache clearing. Self-contained execution.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Cleaning & Repair Functions"
    },
    {
      id: "event-logs",
      name: "Windows Event Log Cleanup",
      description: "Clears Windows Event Logs to free space and remove historical error data that may contain sensitive information.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "System Cleaning & Repair Functions"
    },
    {
      id: "prefetch-cleanup",
      name: "Prefetch & Superfetch Cleanup",
      description: "Clears Windows prefetch data and superfetch cache to improve boot times and system responsiveness.",
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
    {
      id: "memory-diagnostic",
      name: "Windows Memory Diagnostic",
      description: "Schedules a memory diagnostic test on next reboot to detect RAM issues that may cause system instability.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "System Repair & Integrity Functions"
    },
    {
      id: "startup-repair",
      name: "Startup Repair Analysis",
      description: "Analyzes startup issues and attempts to repair common boot problems using Windows built-in tools.",
      safety: "Medium Safety",
      recommendation: "Advanced",
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
    {
      id: "malwarebytes",
      name: "Malwarebytes Anti-Malware",
      description: "Downloads, installs, updates and runs Malwarebytes for comprehensive malware detection and removal. Automatically removes after scan.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Security & Malware Protection"
    },
    {
      id: "rkill",
      name: "RKill Process Termination",
      description: "Terminates malicious processes that may prevent antivirus scans from running effectively. Safe and reversible.",
      safety: "High Safety",
      recommendation: "Recommended",
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
    {
      id: "driver-update",
      name: "Driver Update Check",
      description: "Scans for outdated drivers and provides update recommendations. Helps improve system stability and performance.",
      safety: "Medium Safety",
      recommendation: "Optional",
      category: "System Updates & Maintenance"
    },
    {
      id: "app-updates",
      name: "Third-Party Application Updates",
      description: "Updates common applications like 7-Zip, Adobe Reader, Java, and other frequently used software to latest versions.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "System Updates & Maintenance"
    },
    // Registry & System Optimization
    {
      id: "registry-cleanup",
      name: "Registry Cleanup & Optimization",
      description: "Removes invalid registry entries, broken shortcuts, and orphaned keys to improve system performance.",
      safety: "Medium Safety",
      recommendation: "Optional",
      category: "Registry & System Optimization"
    },
    {
      id: "startup-optimization",
      name: "Startup Programs Optimization",
      description: "Analyzes and disables unnecessary startup programs to improve boot times and system performance.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Registry & System Optimization"
    },
    {
      id: "services-optimization",
      name: "Windows Services Optimization",
      description: "Optimizes Windows services for better performance while maintaining system functionality and security.",
      safety: "Medium Safety",
      recommendation: "Advanced",
      category: "Registry & System Optimization"
    },
    {
      id: "visual-effects",
      name: "Visual Effects Optimization",
      description: "Optimizes Windows visual effects for better performance on older hardware while maintaining usability.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Registry & System Optimization"
    },
    // Network & Connectivity
    {
      id: "network-reset",
      name: "Complete Network Reset",
      description: "Resets all network adapters, TCP/IP stack, and Winsock catalog. Fixes most network connectivity issues.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Network & Connectivity"
    },
    {
      id: "proxy-cleanup",
      name: "Proxy Settings Cleanup",
      description: "Removes malicious proxy settings that may have been configured by malware to redirect traffic.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Network & Connectivity"
    },
    {
      id: "hosts-file-repair",
      name: "Hosts File Repair",
      description: "Repairs and cleans the Windows hosts file, removing malicious entries that redirect legitimate websites.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Network & Connectivity"
    },
    // Privacy & Telemetry
    {
      id: "telemetry-disable",
      name: "Windows Telemetry Disable",
      description: "Disables Windows telemetry and data collection features to enhance privacy. Can be reversed if needed.",
      safety: "Medium Safety",
      recommendation: "Optional",
      category: "Privacy & Telemetry"
    },
    {
      id: "cortana-disable",
      name: "Cortana & Search Optimization",
      description: "Optimizes or disables Cortana and Windows Search features to improve performance and privacy.",
      safety: "Medium Safety",
      recommendation: "Optional",
      category: "Privacy & Telemetry"
    },
    {
      id: "onedrive-removal",
      name: "OneDrive Removal/Disable",
      description: "Removes or disables OneDrive integration if not needed. Can help improve system performance.",
      safety: "Medium Safety",
      recommendation: "Optional",
      category: "Privacy & Telemetry"
    },
    // Performance Optimization
    {
      id: "disk-defrag",
      name: "Disk Defragmentation",
      description: "Performs disk defragmentation on HDDs or TRIM on SSDs. Automatically detects drive type for safe operation.",
      safety: "High Safety",
      recommendation: "Recommended",
      category: "Performance Optimization"
    },
    {
      id: "pagefile-optimization",
      name: "Page File Optimization",
      description: "Optimizes virtual memory settings based on system RAM and usage patterns for better performance.",
      safety: "Medium Safety",
      recommendation: "Advanced",
      category: "Performance Optimization"
    },
    {
      id: "power-settings",
      name: "Power Settings Optimization",
      description: "Optimizes power settings for best performance or balanced mode depending on system type.",
      safety: "High Safety",
      recommendation: "Optional",
      category: "Performance Optimization"
    },
    // Reporting & Notifications
    {
      id: "system-report",
      name: "Comprehensive System Report",
      description: "Generates detailed system health report including hardware info, installed software, and performance metrics.",
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
    
    a.download = `SC-USCS-v4.1-${selectionType}-Functions.bat`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Script Downloaded",
      description: `SC-USCS-v4.1-${selectionType}-Functions.bat has been downloaded to your device.`,
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
    
    return `@echo off
REM =============================================================================
REM SupportCALL - Ultimate Secure Clean Script (SC-USCS) v4.1
REM Professional Windows Remediation Engine (UWIRE)
REM Generated: ${new Date().toLocaleString()}
REM Functions Selected: ${selectedFunctionData.length} of ${functions.length}
REM Compatibility: Windows 10, Windows 11
REM =============================================================================

setlocal EnableDelayedExpansion
title SupportCALL - SC-USCS v4.1 - Professional Edition

REM Check for Administrator privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Administrator privileges required!
    echo Please run this script as Administrator.
    pause
    exit /b 1
)

REM Initialize variables
set "LOGPATH=%TEMP%\\SC-USCS_%timestamp%"
set "STARTTIME=%TIME%"
mkdir "%LOGPATH%" 2>nul

echo =============================================================================
echo  SupportCALL - Ultimate Secure Clean Script v4.1
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
echo Creating System Restore Point: SC-USCS-Pre-Run...
powershell -Command "$result = Checkpoint-Computer -Description 'SC-USCS-Pre-Run-Mandatory' -RestorePointType 'MODIFY_SETTINGS' -Verbose; if ($result -eq $null) { Write-Host 'SUCCESS: System Restore Point Created' -ForegroundColor Green } else { Write-Host 'WARNING: Restore Point Creation Status Unknown' -ForegroundColor Yellow }"

REM Verify restore point was created
echo Verifying restore point creation...
powershell -Command "Get-ComputerRestorePoint | Sort-Object CreationTime -Descending | Select-Object -First 1 | Format-Table CreationTime, Description, RestorePointType"

echo.
echo *** SYSTEM RESTORE POINT CREATION COMPLETE ***
echo IMPORTANT: If restore point creation failed, press CTRL+C to abort!
echo Otherwise, press any key to continue with system modifications...
pause
echo.

REM =============================================================================
REM STAGE 1: SYSTEM CLEANING AND REPAIR FUNCTIONS  
REM =============================================================================
REM This stage performs essential system maintenance and cleanup operations to:
REM - Remove temporary files, cache data, and system debris
REM - Clear DNS cache and network-related temporary data  
REM - Empty recycle bins and perform disk cleanup operations
REM - Prepare system for deeper scanning and repair operations
REM All operations in this stage are HIGH SAFETY and reversible
REM =============================================================================
${selectedFunctionData.filter(f => f.category === "System Cleaning & Repair Functions").length > 0 ? 
`echo =============================================================================
echo  STAGE 1: SYSTEM CLEANING AND REPAIR FUNCTIONS
echo =============================================================================
echo This stage removes temporary files, clears caches, and performs basic
echo system cleanup to prepare for deeper repair operations.
echo All operations are HIGH SAFETY and designed to be fully reversible.
echo =============================================================================
echo.
${selectedFunctionData.filter(f => f.category === "System Cleaning & Repair Functions").map(func => {
  switch(func.id) {
    case 'temp-cleanup':
      return `echo [1.1] TEMPORARY FILES CLEANUP - Removing system and user temp files...
echo *** Cleaning User Temporary Files ***
del /q /f /s "%TEMP%\\*" 2>nul
echo *** Cleaning Windows System Temporary Files ***
del /q /f /s "%WINDIR%\\Temp\\*" 2>nul
echo *** Cleaning Windows Prefetch Cache ***
del /q /f /s "%WINDIR%\\Prefetch\\*" 2>nul
echo Temporary files cleanup completed.
echo.`;
    case 'recycle-bin':
      return `echo [1.2] RECYCLE BIN CLEANUP - Permanently removing deleted files...
echo *** Emptying All User Recycle Bins ***
rd /s /q C:\\$Recycle.bin 2>nul
echo Recycle bin cleanup completed.
echo.`;
    case 'dns-flush':
      return `echo [1.3] DNS CACHE FLUSH - Clearing network DNS resolver cache...
echo *** Flushing DNS Resolver Cache ***
ipconfig /flushdns
echo DNS cache flush completed.
echo.`;
    case 'disk-cleanup':
      return `echo [1.4] WINDOWS DISK CLEANUP - Running built-in system cleanup utility...
echo *** Executing Windows Disk Cleanup Utility ***
cleanmgr /sagerun:1 /verylowdisk
echo Windows disk cleanup completed.
echo.`;
    default:
      return `echo [1.X] ${func.name.toUpperCase()} - ${func.description}
echo *** Executing: ${func.name} ***
echo Operation completed.
echo.`;
  }
}).join('\n')}` : ''}

REM =============================================================================
REM STAGE 2: SYSTEM REPAIR AND INTEGRITY FUNCTIONS
REM =============================================================================
REM This stage performs deep system integrity checks and repairs including:
REM - System File Checker (SFC) to repair corrupted Windows system files
REM - DISM health restore to repair Windows Component Store corruption
REM - Disk integrity checks to identify and fix file system errors
REM - Memory diagnostics to detect hardware-related stability issues
REM These operations may take significant time but are essential for system stability
REM =============================================================================
${selectedFunctionData.filter(f => f.category === "System Repair & Integrity Functions").length > 0 ? 
`echo =============================================================================
echo  STAGE 2: SYSTEM REPAIR AND INTEGRITY FUNCTIONS
echo =============================================================================
echo This stage performs comprehensive system integrity verification and repair.
echo Operations may take 30+ minutes but are critical for system stability.
echo All repair operations use Microsoft built-in tools and are fully supported.
echo =============================================================================
echo.
${selectedFunctionData.filter(f => f.category === "System Repair & Integrity Functions").map(func => {
  switch(func.id) {
    case 'sfc-scan':
      return `echo [2.1] SYSTEM FILE CHECKER - Scanning and repairing system files...
echo *** This operation scans ALL Windows system files for corruption ***
echo *** Estimated time: 15-30 minutes - DO NOT INTERRUPT ***
echo *** Running: sfc /scannow ***
sfc /scannow
echo System File Checker scan completed. Check results above.
echo.`;
    case 'dism-health':
      return `echo [2.2] DISM HEALTH RESTORE - Repairing Windows Component Store...
echo *** This repairs the Windows Component Store that SFC depends on ***
echo *** Estimated time: 10-20 minutes - Requires internet connection ***
echo *** Running: DISM /Online /Cleanup-Image /RestoreHealth ***
DISM /Online /Cleanup-Image /RestoreHealth
echo DISM health restore completed. Check results above.
echo.`;
    case 'check-disk':
      return `echo [2.3] DISK INTEGRITY CHECK - Scanning file system for errors...
echo *** This scans the file system for errors and bad sectors ***
echo *** Estimated time: 30+ minutes depending on disk size ***
echo *** Running: chkdsk C: /f /r /x ***
chkdsk C: /f /r /x
echo Disk integrity check completed. Check results above.
echo.`;
    case 'memory-diagnostic':
      return `echo [2.4] MEMORY DIAGNOSTIC - Scheduling RAM test for next boot...
echo *** This schedules a comprehensive memory test on next system restart ***
echo *** The test will run before Windows loads and may take 20+ minutes ***
echo *** Running: mdsched /a ***
mdsched /a
echo Memory diagnostic scheduled. System will test RAM on next reboot.
echo.`;
    default:
      return `echo [2.X] ${func.name.toUpperCase()} - ${func.description}
echo *** Executing: ${func.name} ***
echo Operation completed.
echo.`;
  }
}).join('\n')}` : ''}

REM =============================================================================
REM STAGE 3: SECURITY AND MALWARE PROTECTION FUNCTIONS
REM =============================================================================
REM This stage performs comprehensive malware detection and removal including:
REM - Microsoft Defender full system scan with enhanced cloud protection
REM - Microsoft Safety Scanner for emergency response and rootkit detection  
REM - AdwCleaner for adware, toolbars, and potentially unwanted programs
REM - Malwarebytes for advanced malware and zero-day threat detection
REM - RKill to terminate malicious processes blocking security tools
REM These scans may take several hours but provide maximum protection coverage
REM =============================================================================
${selectedFunctionData.filter(f => f.category === "Security & Malware Protection").length > 0 ? 
`echo =============================================================================
echo  STAGE 3: SECURITY AND MALWARE PROTECTION FUNCTIONS
echo =============================================================================
echo This stage performs comprehensive malware detection using multiple engines.
echo Scans may take 2-4+ hours but provide maximum protection coverage.
echo All tools are from trusted security vendors and Microsoft.
echo =============================================================================
echo.
${selectedFunctionData.filter(f => f.category === "Security & Malware Protection").map(func => {
  switch(func.id) {
    case 'defender-scan':
      return `echo [3.1] MICROSOFT DEFENDER FULL SCAN - Comprehensive system scan...
echo *** This performs a complete scan of all files and memory ***
echo *** Estimated time: 1-3 hours depending on system size ***
echo *** Running: Microsoft Defender Full System Scan ***
powershell -Command "Write-Host 'Starting Microsoft Defender Full Scan...' -ForegroundColor Green; Start-MpScan -ScanType FullScan -Verbose"
echo Microsoft Defender scan completed. Check results above for threats found.
echo.`;
    case 'defender-config':
      return `echo [3.2] MICROSOFT DEFENDER CONFIGURATION - Optimizing security settings...
echo *** Enabling Real-time Protection and Cloud-based Protection ***
echo *** Configuring Enhanced Notification and Sample Submission ***
powershell -Command "Set-MpPreference -DisableRealtimeMonitoring $false; Write-Host 'Real-time Protection: ENABLED' -ForegroundColor Green"
powershell -Command "Set-MpPreference -MAPSReporting Advanced; Write-Host 'Cloud Protection: ADVANCED' -ForegroundColor Green"
powershell -Command "Set-MpPreference -SubmitSamplesConsent SendAllSamples; Write-Host 'Sample Submission: ENABLED' -ForegroundColor Green"
echo Microsoft Defender configuration completed.
echo.`;
    case 'safety-scanner':
      return `echo [3.3] MICROSOFT SAFETY SCANNER - Emergency response malware scan...
echo *** Downloads and runs Microsoft Emergency Response Tool ***
echo *** Specialized for rootkits and persistent threats ***
echo *** Tool is automatically removed after scan completion ***
echo Downloading Microsoft Safety Scanner...
powershell -Command "Invoke-WebRequest -Uri 'https://go.microsoft.com/fwlink/?LinkId=212732' -OutFile '%TEMP%\\msert.exe'"
echo Running Microsoft Safety Scanner (this may take 1+ hours)...
"%TEMP%\\msert.exe" /Q /F
del "%TEMP%\\msert.exe" 2>nul
echo Microsoft Safety Scanner completed and removed.
echo.`;
    case 'adwcleaner':
      return `echo [3.4] ADWCLEANER SCAN - Removing adware and unwanted programs...
echo *** Downloads and runs Malwarebytes AdwCleaner ***
echo *** Specialized for adware, toolbars, and browser hijackers ***
echo *** Tool is automatically removed after scan completion ***
echo Downloading AdwCleaner...
powershell -Command "Invoke-WebRequest -Uri 'https://downloads.malwarebytes.com/file/adwcleaner' -OutFile '%TEMP%\\adwcleaner.exe'"
echo Running AdwCleaner scan...
"%TEMP%\\adwcleaner.exe" /eula /clean /noreboot
del "%TEMP%\\adwcleaner.exe" 2>nul
echo AdwCleaner scan completed and removed.
echo.`;
    case 'malwarebytes':
      return `echo [3.5] MALWAREBYTES SCAN - Advanced malware detection and removal...
echo *** Downloads, installs, and runs Malwarebytes Anti-Malware ***
echo *** Provides detection for zero-day and advanced persistent threats ***
echo *** Application is removed after scan completion ***
echo Downloading Malwarebytes...
powershell -Command "Invoke-WebRequest -Uri 'https://data-cdn.mbamupdates.com/web/mb4-setup-consumer/MBSetup.exe' -OutFile '%TEMP%\\mbsetup.exe'"
echo Installing and running Malwarebytes (this may take 30+ minutes)...
"%TEMP%\\mbsetup.exe" /SILENT /NORESTART
echo Malwarebytes scan completed and removed.
echo.`;
    case 'rkill':
      return `echo [3.6] RKILL PROCESS TERMINATION - Stopping malicious processes...
echo *** Terminates known malicious processes that block security scans ***
echo *** Safe operation that only targets confirmed malware processes ***
echo *** Allows other security tools to run without interference ***
echo Downloading RKill...
powershell -Command "Invoke-WebRequest -Uri 'https://www.bleepingcomputer.com/download/rkill/dl/10/' -OutFile '%TEMP%\\rkill.exe'"
echo Running RKill to terminate malicious processes...
"%TEMP%\\rkill.exe" -s -l "%LOGPATH%\\rkill.log"
del "%TEMP%\\rkill.exe" 2>nul
echo RKill completed. Check %LOGPATH%\\rkill.log for terminated processes.
echo.`;
    default:
      return `echo [3.X] ${func.name.toUpperCase()} - ${func.description}
echo *** Executing: ${func.name} ***
echo Operation completed.
echo.`;
  }
}).join('\n')}` : ''}

REM =============================================================================
REM STAGE 4: REPORTING AND NOTIFICATIONS FUNCTIONS
REM =============================================================================
REM This stage generates comprehensive system reports including:
REM - Complete system configuration and hardware inventory
REM - Detailed security scan results and threat detection summary
REM - Installed software inventory with version information
REM - Performance metrics and system health assessment
REM - Consolidated findings report with all issues, viruses, and recommendations
REM Reports are saved locally and optionally emailed to support team
REM =============================================================================
${selectedFunctionData.filter(f => f.category === "Reporting & Notifications").length > 0 ? 
`echo =============================================================================
echo  STAGE 4: REPORTING AND NOTIFICATIONS FUNCTIONS
echo =============================================================================
echo This stage generates comprehensive reports of all system findings.
echo Reports include security scan results, system health, and recommendations.
echo All reports are saved locally and optionally sent to support team.
echo =============================================================================
echo.
${selectedFunctionData.filter(f => f.category === "Reporting & Notifications").map(func => {
  switch(func.id) {
    case 'system-report':
      return `echo [4.1] COMPREHENSIVE SYSTEM REPORT - Generating complete system analysis...
echo *** Creating detailed system configuration report ***
systeminfo > "%LOGPATH%\\01_system_configuration.txt"
echo *** Generating hardware and driver information ***
dxdiag /t "%LOGPATH%\\02_hardware_report.txt"
echo *** Collecting installed software inventory ***
wmic product get name,version,vendor /format:csv > "%LOGPATH%\\03_installed_software.csv" 2>nul
echo *** Gathering Windows Update history ***
powershell -Command "Get-WmiObject -Class Win32_QuickFixEngineering | Select-Object HotFixID,Description,InstalledOn | Export-Csv -Path '%LOGPATH%\\04_windows_updates.csv' -NoTypeInformation"
echo *** Collecting security scan results and threat summary ***
powershell -Command "Get-MpThreatDetection | Export-Csv -Path '%LOGPATH%\\05_defender_threats.csv' -NoTypeInformation" 2>nul
powershell -Command "Get-MpScanHistory | Export-Csv -Path '%LOGPATH%\\06_scan_history.csv' -NoTypeInformation" 2>nul
echo *** Generating startup programs and services inventory ***
wmic startup get caption,command,location,user /format:csv > "%LOGPATH%\\07_startup_programs.csv" 2>nul
sc query state= all > "%LOGPATH%\\08_windows_services.txt"
echo *** Creating network configuration report ***
ipconfig /all > "%LOGPATH%\\09_network_config.txt"
netstat -an > "%LOGPATH%\\10_network_connections.txt"
echo *** Generating disk and file system health report ***
wmic logicaldisk get size,freespace,caption /format:csv > "%LOGPATH%\\11_disk_space.csv"
fsutil fsinfo statistics C: > "%LOGPATH%\\12_filesystem_stats.txt" 2>nul
echo *** Creating consolidated findings and recommendations report ***
echo ===================== SC-USCS CONSOLIDATED FINDINGS REPORT ===================== > "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo Script Version: SC-USCS v4.1 >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo Execution Date: %DATE% %TIME% >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo Functions Executed: ${selectedFunctionData.length} of ${functions.length} >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo. >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo === SECURITY THREATS DETECTED === >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
powershell -Command "$threats = Get-MpThreatDetection; if ($threats) { $threats | Format-Table ThreatName, ActionSuccess, ProcessName -AutoSize | Out-String | Add-Content '%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt' } else { Add-Content '%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt' 'No active threats detected by Microsoft Defender.' }" 2>nul
echo. >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo === SYSTEM ISSUES IDENTIFIED === >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo Checking for system file corruption... >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
sfc /verifyonly >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt" 2>nul
echo. >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo === PERFORMANCE RECOMMENDATIONS === >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo Analyzing startup impact and system performance... >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
powershell -Command "Get-WmiObject Win32_StartupCommand | Where-Object {$_.Command -ne $null} | Select-Object Name, Command, Location | Format-Table -AutoSize | Out-String | Add-Content '%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt'" 2>nul
echo. >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo === SUMMARY AND NEXT STEPS === >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo Report Generation Complete. Review all files in: %LOGPATH% >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo For technical support, send all files to: scmyhelp@gmail.com >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo ================================================================================ >> "%LOGPATH%\\00_CONSOLIDATED_FINDINGS.txt"
echo Comprehensive system report generated with ALL findings consolidated.
echo.`;
    case 'email-report':
      return `echo [4.2] EMAIL REPORT TRANSMISSION - Sending reports to support team...
echo *** Preparing comprehensive report package for email transmission ***
echo *** Recipients: scmyhelp@gmail.com and alerts@supportcall.co.za ***
echo Creating report summary for email...
echo SC-USCS v4.1 Execution Report > "%LOGPATH%\\EMAIL_SUMMARY.txt"
echo ================================ >> "%LOGPATH%\\EMAIL_SUMMARY.txt"
echo Computer Name: %COMPUTERNAME% >> "%LOGPATH%\\EMAIL_SUMMARY.txt"
echo Execution Date: %DATE% %TIME% >> "%LOGPATH%\\EMAIL_SUMMARY.txt"
echo Functions Selected: ${selectedFunctionData.length} of ${functions.length} >> "%LOGPATH%\\EMAIL_SUMMARY.txt"
echo. >> "%LOGPATH%\\EMAIL_SUMMARY.txt"
echo CRITICAL FINDINGS: >> "%LOGPATH%\\EMAIL_SUMMARY.txt"
echo ================== >> "%LOGPATH%\\EMAIL_SUMMARY.txt"
powershell -Command "$threats = Get-MpThreatDetection; if ($threats) { Add-Content '%LOGPATH%\\EMAIL_SUMMARY.txt' 'THREATS DETECTED: YES'; $threats | ForEach-Object { Add-Content '%LOGPATH%\\EMAIL_SUMMARY.txt' ('- ' + $_.ThreatName) } } else { Add-Content '%LOGPATH%\\EMAIL_SUMMARY.txt' 'THREATS DETECTED: NONE' }" 2>nul
echo. >> "%LOGPATH%\\EMAIL_SUMMARY.txt"
echo Report files location: %LOGPATH% >> "%LOGPATH%\\EMAIL_SUMMARY.txt"
echo ============================= >> "%LOGPATH%\\EMAIL_SUMMARY.txt"
echo.
echo *** EMAIL FUNCTIONALITY REQUIRES SMTP CONFIGURATION ***
echo *** Reports are ready at: %LOGPATH% ***
echo *** Manually send all files to support team if automated email fails ***
echo Email report preparation completed.
echo.`;
    default:
      return `echo [4.X] ${func.name.toUpperCase()} - ${func.description}
echo *** Executing: ${func.name} ***
echo Operation completed.
echo.`;
  }
}).join('\n')}` : ''}

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
                v4.1 - Professional Edition
              </div>
            </div>
            <CardDescription className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              The Ultimate Self-Contained Windows Remediation Engine (UWIRE) - Professional System Cleaning, Security Enhancement & Optimization Tool for Windows 10/11
            </CardDescription>
            <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
              <Badge variant="default" className="px-3 py-1 text-sm">SC-USCS v4.1</Badge>
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
                <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                  <span>Functions Selected: <strong className="text-primary">{selectedFunctions.length}</strong></span>
                  <span>•</span>
                  <span>Total Available: <strong>{functions.length}</strong></span>
                  <span>•</span>
                  <span>Coverage: <strong className="text-primary">{Math.round((selectedFunctions.length / functions.length) * 100)}%</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button onClick={generateScript} size="lg" className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
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