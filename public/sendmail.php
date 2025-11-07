<?php
/**
 * SC-USCS Email Gateway - sendmail.php
 * 
 * This PHP script receives system report data from SC-USCS batch scripts
 * running anywhere in the world and forwards them via email using SMTP.
 * 
 * INSTALLATION INSTRUCTIONS:
 * 1. Upload this file to your sc-uscs.com server root directory
 * 2. Ensure PHP is installed and configured on your server
 * 3. Update SMTP credentials below with your mail server details
 * 4. Ensure the server allows outbound SMTP connections (port 465/587)
 * 5. Test by accessing: https://sc-uscs.com/sendmail.php (should show "Ready")
 * 
 * SECURITY:
 * - Only accepts POST requests with valid report data
 * - Rate limiting recommended (via .htaccess or server config)
 * - Consider adding IP whitelist if needed
 * - SMTP credentials are stored server-side (never exposed to clients)
 */

// ============================================================================
// CONFIGURATION - UPDATE THESE VALUES WITH YOUR SMTP SERVER DETAILS
// ============================================================================

// SMTP Server Configuration
define('SMTP_HOST', 'smtp.gmail.com');                 // Gmail SMTP server
define('SMTP_PORT', 465);                              // SMTP port (465 for SSL)
define('SMTP_SECURE', 'ssl');                          // SSL encryption
define('SMTP_USERNAME', 'scmyhelp@gmail.com');         // Gmail username
define('SMTP_PASSWORD', 'bbvheyppvtponcdu');           // Gmail app password

// Email Configuration
define('FROM_EMAIL', 'noreply@sc-uscs.com');           // From address
define('FROM_NAME', 'SC-USCS Automated Reports');      // From name
define('TO_EMAILS', 'alerts@supportcall.com.au,alerts@supportcall.co.za,scmyhelp@gmail.com'); // Comma-separated recipients

// Optional: Enable debug mode (set to false in production)
define('DEBUG_MODE', false);

// ============================================================================
// DO NOT MODIFY BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING
// ============================================================================

// Set headers for JSON response
header('Content-Type: application/json; charset=utf-8');
header('X-Powered-By: SC-USCS Email Gateway v1.0');

// CORS headers (optional - remove if not needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Use POST.',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

// Check if report data is provided
if (!isset($_POST['report_data']) || empty($_POST['report_data'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing report_data parameter',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

// Decode JSON report data
$reportData = json_decode($_POST['report_data'], true);

if (!$reportData) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid JSON in report_data',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

// Extract report information
$computerName = isset($reportData['computer_name']) ? htmlspecialchars($reportData['computer_name']) : 'Unknown';
$scanDate = isset($reportData['scan_date']) ? htmlspecialchars($reportData['scan_date']) : date('Y-m-d H:i:s');
$functionsExecuted = isset($reportData['functions_executed']) ? htmlspecialchars($reportData['functions_executed']) : 'Unknown';
$threatStatus = isset($reportData['threat_status']) ? htmlspecialchars($reportData['threat_status']) : 'Unknown';
$threatList = isset($reportData['threat_list']) ? htmlspecialchars($reportData['threat_list']) : 'No data';
$logPath = isset($reportData['log_path']) ? htmlspecialchars($reportData['log_path']) : 'Not specified';
$scriptVersion = isset($reportData['script_version']) ? htmlspecialchars($reportData['script_version']) : 'Unknown';

// Determine threat status styling
$threatColor = ($threatStatus === 'System Clean') ? '#388e3c' : '#d32f2f';
$threatIcon = ($threatStatus === 'System Clean') ? '✓' : '⚠';

// Build HTML email body
$htmlBody = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 650px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: #ffffff; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .header p { margin: 8px 0 0 0; font-size: 14px; opacity: 0.95; }
        .content { padding: 30px 25px; }
        .status-box { background-color: #f8f9fa; border-left: 4px solid #2a5298; padding: 15px 20px; margin: 20px 0; border-radius: 4px; }
        .status-box h2 { margin: 0 0 10px 0; font-size: 18px; color: #1e3c72; }
        .info-grid { display: table; width: 100%; margin: 15px 0; }
        .info-row { display: table-row; }
        .info-label { display: table-cell; padding: 8px 15px 8px 0; font-weight: 600; color: #555; width: 40%; }
        .info-value { display: table-cell; padding: 8px 0; color: #333; }
        .section { margin: 25px 0; }
        .section h3 { color: #1e3c72; font-size: 16px; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #e0e0e0; }
        .findings-list { list-style: none; padding: 0; margin: 10px 0; }
        .findings-list li { padding: 8px 12px; margin: 5px 0; background-color: #f8f9fa; border-radius: 4px; }
        .footer { background-color: #f8f9fa; padding: 20px 25px; text-align: center; font-size: 13px; color: #666; border-top: 1px solid #e0e0e0; }
        .footer p { margin: 5px 0; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
        .badge-success { background-color: #e8f5e9; color: #2e7d32; }
        .badge-warning { background-color: #fff3e0; color: #e65100; }
        .alert-box { background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; padding: 15px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🛡️ SC-USCS System Report</h1>
            <p>Windows Remediation & Security Scan {$scriptVersion}</p>
        </div>
        <div class='content'>
            <div class='status-box'>
                <h2>Security Status</h2>
                <p style='font-size: 18px; margin: 10px 0; color: {$threatColor}; font-weight: bold;'>{$threatIcon} {$threatStatus}</p>
            </div>
            <div class='section'>
                <h3>System Information</h3>
                <div class='info-grid'>
                    <div class='info-row'>
                        <div class='info-label'>Computer Name:</div>
                        <div class='info-value'><strong>{$computerName}</strong></div>
                    </div>
                    <div class='info-row'>
                        <div class='info-label'>Scan Date:</div>
                        <div class='info-value'>{$scanDate}</div>
                    </div>
                    <div class='info-row'>
                        <div class='info-label'>Functions Executed:</div>
                        <div class='info-value'><span class='badge badge-success'>{$functionsExecuted}</span></div>
                    </div>
                    <div class='info-row'>
                        <div class='info-label'>Log Location:</div>
                        <div class='info-value'><code style='background: #f5f5f5; padding: 2px 6px; border-radius: 3px;'>{$logPath}</code></div>
                    </div>
                </div>
            </div>
            <div class='section'>
                <h3>Critical Findings</h3>
                <p style='padding: 8px 12px; margin: 5px 0; background-color: #f8f9fa; border-radius: 4px;'>{$threatList}</p>
            </div>
            <div class='alert-box'>
                <strong>📋 Next Steps:</strong>
                <ul style='margin: 10px 0 0 0; padding-left: 20px;'>
                    <li>Review detailed logs at the location specified above</li>
                    <li>Check CONSOLIDATED_FINDINGS.txt for complete analysis</li>
                    <li>A system restart may be required to complete repairs</li>
                </ul>
            </div>
        </div>
        <div class='footer'>
            <p><strong>SC-USCS</strong> - Automated Windows System Care</p>
            <p><strong>SupportCALL:</strong> <a href='http://www.supportcall.com.au' target='_blank' style='color: #2a5298;'>www.supportcall.com.au</a></p>
            <p style='color: #999; font-size: 12px;'>This is an automated report from your system remediation script</p>
        </div>
    </div>
</body>
</html>
HTML;

// Build plain text version (fallback)
$textBody = <<<TEXT
SC-USCS SYSTEM REPORT
{$scriptVersion}
=====================================

SECURITY STATUS: {$threatStatus}

SYSTEM INFORMATION:
- Computer Name: {$computerName}
- Scan Date: {$scanDate}
- Functions Executed: {$functionsExecuted}
- Log Location: {$logPath}

CRITICAL FINDINGS:
{$threatList}

NEXT STEPS:
- Review detailed logs at the location specified above
- Check CONSOLIDATED_FINDINGS.txt for complete analysis
- A system restart may be required to complete repairs

---
SC-USCS - Automated Windows System Care
SupportCALL: www.supportcall.com.au
This is an automated report from your system remediation script
TEXT;

// Send email using PHP mail() with custom headers for SMTP
// Note: This requires your server to be configured with SMTP settings
// Alternative: Use PHPMailer library for more reliable SMTP (see comments below)

$toEmails = explode(',', TO_EMAILS);
$subject = "SC-USCS Report: {$computerName} - {$scanDate}";

// Build email headers
$headers = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/html; charset=UTF-8";
$headers[] = "From: " . FROM_NAME . " <" . FROM_EMAIL . ">";
$headers[] = "Reply-To: " . FROM_EMAIL;
$headers[] = "X-Mailer: SC-USCS Email Gateway/1.0";
$headers[] = "X-Priority: 1 (Highest)";
$headers[] = "Importance: High";

$success = true;
$errors = array();

// Send to each recipient
foreach ($toEmails as $toEmail) {
    $toEmail = trim($toEmail);
    if (filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
        $result = mail($toEmail, $subject, $htmlBody, implode("\r\n", $headers));
        if (!$result) {
            $success = false;
            $errors[] = "Failed to send to {$toEmail}";
        }
    } else {
        $success = false;
        $errors[] = "Invalid email address: {$toEmail}";
    }
}

// Log the request (optional - uncomment if needed)
if (DEBUG_MODE) {
    $logEntry = date('Y-m-d H:i:s') . " | {$computerName} | {$threatStatus} | " . ($success ? 'SUCCESS' : 'FAILED') . "\n";
    file_put_contents(__DIR__ . '/sendmail.log', $logEntry, FILE_APPEND);
}

// Send response
if ($success) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Report sent successfully',
        'recipients' => count($toEmails),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to send email',
        'details' => $errors,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

/*
 * ALTERNATIVE: Using PHPMailer for Better SMTP Support
 * 
 * If you want more reliable SMTP with authentication, install PHPMailer:
 * 1. Download from: https://github.com/PHPMailer/PHPMailer
 * 2. Extract to your server (e.g., /lib/PHPMailer/)
 * 3. Replace the mail() function above with this code:
 * 
 * require 'lib/PHPMailer/src/PHPMailer.php';
 * require 'lib/PHPMailer/src/SMTP.php';
 * require 'lib/PHPMailer/src/Exception.php';
 * 
 * $mail = new PHPMailer\PHPMailer\PHPMailer(true);
 * try {
 *     $mail->isSMTP();
 *     $mail->Host = SMTP_HOST;
 *     $mail->SMTPAuth = true;
 *     $mail->Username = SMTP_USERNAME;
 *     $mail->Password = SMTP_PASSWORD;
 *     $mail->SMTPSecure = SMTP_SECURE;
 *     $mail->Port = SMTP_PORT;
 *     $mail->setFrom(FROM_EMAIL, FROM_NAME);
 *     foreach ($toEmails as $email) {
 *         $mail->addAddress(trim($email));
 *     }
 *     $mail->isHTML(true);
 *     $mail->Subject = $subject;
 *     $mail->Body = $htmlBody;
 *     $mail->AltBody = $textBody;
 *     $mail->send();
 *     $success = true;
 * } catch (Exception $e) {
 *     $success = false;
 *     $errors[] = $mail->ErrorInfo;
 * }
 */
?>
