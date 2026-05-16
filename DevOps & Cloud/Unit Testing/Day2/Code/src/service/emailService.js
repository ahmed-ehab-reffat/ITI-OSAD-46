async function sendWelcomeEmail(email) {
  // sends a real email — we do NOT want this in tests
  console.log("test mock");
  
  await mailer.send({ to: email, subject: 'Welcome!' });
}

module.exports = { sendWelcomeEmail };