/**
 * Contact Service
 * Handles business logic for contact form submissions
 * In production, integrate with email service (SendGrid, Mailgun, etc.)
 */

exports.processContactForm = async (formData) => {
  // Log contact submission (replace with email service in production)
  console.log('\n📧 New Contact Form Submission:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Name:     ${formData.name}`);
  console.log(`Email:    ${formData.email}`);
  console.log(`Phone:    ${formData.phone || 'Not provided'}`);
  console.log(`Company:  ${formData.company || 'Not provided'}`);
  console.log(`Message:  ${formData.message}`);
  console.log(`Time:     ${formData.submittedAt}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In production, add email service integration here:
  // await emailService.send({
  //   to: 'hello@wolfalpha.com',
  //   subject: `New Contact: ${formData.name}`,
  //   template: 'contact-notification',
  //   data: formData
  // });

  return {
    id: generateId(),
    status: 'received',
    timestamp: formData.submittedAt
  };
};

// Generate simple unique ID
function generateId() {
  return 'contact_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
