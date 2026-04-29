<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
    <h2>New Contact Form Submission</h2>

    <p><strong>First Name:</strong> {{ $contactMessage->first_name }}</p>
    <p><strong>Last Name:</strong> {{ $contactMessage->last_name ?: 'N/A' }}</p>
    <p><strong>Email:</strong> {{ $contactMessage->email }}</p>
    <p><strong>Phone:</strong> {{ $contactMessage->phone }}</p>
    <p><strong>Inquiry Type:</strong> {{ $contactMessage->inquiry_type ?: 'N/A' }}</p>

    <p><strong>Message:</strong></p>
    <p>{{ $contactMessage->message }}</p>

    <hr>
    <p style="font-size: 12px; color: #666;">
        Sent from Dubai Street Kitties contact form.
    </p>
</body>
</html>
