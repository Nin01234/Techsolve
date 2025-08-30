# EmailJS Integration Setup

This document explains how EmailJS is integrated into the TechSolve AI application.

## Configuration

The EmailJS integration uses the following credentials:
- **Service ID**: `service_p1ybkk9`
- **Template ID**: `template_nrv18sr`
- **Public Key**: `WfRtj_M_7WpdBFasC`

## Features

### 1. Contact Form
- Users can send messages through the Contact page
- Messages are sent via EmailJS to your configured email
- Form includes user authentication data when available

### 2. Community Notifications
- When users create new posts, notification emails are sent
- Includes post details, author information, and content preview
- Helps track community activity

### 3. Settings Confirmation
- When users update their settings, confirmation emails are sent
- Provides security by notifying users of account changes
- Includes summary of updated settings

## Implementation

### EmailJS Utility (`src/lib/emailjs.ts`)
Centralized email functionality with the following functions:
- `initEmailJS()` - Initialize EmailJS
- `sendEmail()` - Generic email sending function
- `sendContactEmail()` - Contact form emails
- `sendCommunityNotification()` - Community post notifications
- `sendSettingsConfirmation()` - Settings update confirmations

### Template Parameters
All emails include these standard parameters:
- `from_name` - Sender name
- `from_email` - Sender email
- `subject` - Email subject
- `message` - Email content
- `priority` - Email priority (low/medium/high)
- `user_id` - User ID for tracking
- `timestamp` - When the email was sent

## Usage

### Contact Form
```typescript
const result = await sendContactEmail(formData, user?.id);
if (result.success) {
  // Email sent successfully
} else {
  // Handle error
}
```

### Community Posts
```typescript
const result = await sendCommunityNotification(postData, user);
if (result.success) {
  console.log('Notification sent');
}
```

### Settings Updates
```typescript
const result = await sendSettingsConfirmation(settings, user);
if (result.success) {
  console.log('Confirmation sent');
}
```

## EmailJS Template Setup

Make sure your EmailJS template (`template_nrv18sr`) includes these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Email message content
- `{{priority}}` - Priority level
- `{{user_id}}` - User identifier
- `{{timestamp}}` - Timestamp

## Security Notes

- The public key is safe to expose in client-side code
- All sensitive operations should be validated server-side
- Email templates should be configured to prevent spam
- Consider rate limiting for email sending

## Troubleshooting

1. **Emails not sending**: Check EmailJS service configuration
2. **Template errors**: Verify template variables match the code
3. **Authentication issues**: Ensure EmailJS is properly initialized
4. **Rate limiting**: Check EmailJS service limits

## Future Enhancements

- Add email templates for different types of notifications
- Implement email preferences in user settings
- Add email tracking and analytics
- Support for email attachments
- Automated email responses
