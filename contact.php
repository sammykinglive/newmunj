<?php
// contact.php - Backend handler for Aethel Vault contact form
// Works with your EXISTING HTML form - no changes needed!

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data - matches your EXISTING form field names
    $name = sanitize_input($_POST['name'] ?? '');
    $email = sanitize_input($_POST['email'] ?? '');
    $phone = sanitize_input($_POST['phone'] ?? '');
    $service = sanitize_input($_POST['service'] ?? '');
    $message = sanitize_input($_POST['message'] ?? '');
    
    // Validate required fields
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required";
    }
    
    // If there are errors, redirect back with error message
    if (!empty($errors)) {
        $error_string = urlencode(implode(", ", $errors));
        header("Location: index.html?contact_error=$error_string#contact");
        exit;
    }
    
    // Recipient email
    $to = "jmarnaholdings@gmail.com";
    
    // Email subject
    $subject = "New Contact Form - Aethel Vault";
    
    // Email headers
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email body
    $email_content = "
    <html>
    <body style='font-family: Arial, sans-serif;'>
        <h2 style='color: #d4af37;'>New Contact Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> " . (!empty($phone) ? $phone : 'Not provided') . "</p>
        <p><strong>Service:</strong> $service</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br($message) . "</p>
        <hr>
        <p><small>Sent from Aethel Vault website</small></p>
    </body>
    </html>
    ";
    
    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        // Success - redirect back with success message
        header("Location: index.html?contact_success=1#contact");
    } else {
        // Error - redirect back with error message
        header("Location: index.html?contact_error=Could+not+send+message.+Please+try+again.#contact");
    }
    exit;
    
} else {
    // If someone tries to access this file directly
    header("Location: index.html");
    exit;
}
?>