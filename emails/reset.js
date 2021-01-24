const keys = require('../keys');

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Access recovery',
    html: `
      <h1>Your Password Reset Request</h1>
      <p>Dear, ${email}</p>
      <p>To reset the password for your account, click <span><a href="${keys.BASE_URL}auth/password/${token}">Restore access</a></span></p>
      <p>This link will expire within 60 minutes. If you do not wish to reset your password, simply ignore this email and nothing will be changed.</p>
      <hr>
      <a href="${keys.BASE_URL}">Courses Store</a>
      <p>Sincerely,<br>Courses store</p>
    `
  };
};