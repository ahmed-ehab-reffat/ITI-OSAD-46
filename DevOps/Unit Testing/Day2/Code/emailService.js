/**
 * emailService.js
 * Handles sending emails.
 * In tests, this entire module is mocked with jest.mock('./emailService')
 * so no real email is ever sent.
 */

/**
 * Send a welcome email to a newly registered user.
 * In production this would call a real mailer (SendGrid, Nodemailer, etc.)
 */
async function sendWelcomeEmail(email) {
  // Simulated delay — as if calling an external mail API
  console.log(`[emailService] Sending welcome email to ${email}`);
  return { success: true, to: email };
}

/**
 * Send a password reset email.
 */
async function sendPasswordResetEmail(email, resetToken) {
  console.log(`[emailService] Sending reset email to ${email}`);
  return { success: true, to: email, token: resetToken };
}

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
};