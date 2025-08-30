import emailjs from '@emailjs/browser';

// EmailJS configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_p1ybkk9',
  TEMPLATE_ID: 'template_nrv18sr',
  PUBLIC_KEY: 'WfRtj_M_7WpdBFasC'
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

// Send email function
export const sendEmail = async (templateParams: any) => {
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error };
  }
};

// Contact form email
export const sendContactEmail = async (formData: any, userId?: string) => {
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    priority: formData.priority,
    user_id: userId || 'anonymous',
    timestamp: new Date().toISOString()
  };

  return await sendEmail(templateParams);
};

// Community notification email
export const sendCommunityNotification = async (postData: any, user: any) => {
  const templateParams = {
    from_name: 'TechSolve Community',
    from_email: 'noreply@techsolveai.com',
    subject: `New Community Post: ${postData.title}`,
    message: `A new post has been created in the TechSolve community:
    
Title: ${postData.title}
Category: ${postData.category}
Author: ${user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous'}
Content: ${postData.content.substring(0, 200)}${postData.content.length > 200 ? '...' : ''}

You can view and respond to this post in the community section.`,
    priority: 'medium',
    user_id: user?.id || 'anonymous',
    timestamp: new Date().toISOString()
  };

  return await sendEmail(templateParams);
};

// Settings confirmation email
export const sendSettingsConfirmation = async (settings: any, user: any) => {
  const templateParams = {
    from_name: 'TechSolve Settings',
    from_email: 'noreply@techsolveai.com',
    subject: 'Settings Updated Successfully',
    message: `Your TechSolve account settings have been updated successfully.

Updated Settings:
- Profile: ${settings.profile.fullName ? 'Updated' : 'No changes'}
- Notifications: ${Object.values(settings.notifications).some(v => v) ? 'Configured' : 'No changes'}
- Privacy: ${Object.values(settings.privacy).some(v => v) ? 'Updated' : 'No changes'}

If you did not make these changes, please contact support immediately.

Thank you for using TechSolve!`,
    priority: 'low',
    user_id: user?.id || 'anonymous',
    timestamp: new Date().toISOString()
  };

  return await sendEmail(templateParams);
};
