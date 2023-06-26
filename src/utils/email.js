const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// "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"
const sendWelcomeEmail = (email) => {
  sgMail.send({
    to: email,
    from: "prajapatichirag2162003@gmail.com",
    subject: "A device is Logged in with this E-mail",
    html: `<h2>A device is logged in.</h2>
    <p> we are just awear you</p>`,
  });
};

const sendCancelationEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: "prajapatichirag2162003@gmail.com",
    subject: "Sorry to see you go!",
    text: `Good Bye, ${name}.I hope to see you back soon.`,
    html: `<h1>You have successfully logged out from Safe Printing.</h1>
    <h2>Hey ${name} ,</h2>
    <p> We hope that you found our services helpful and that you were able to achieve what you needed to during your visit.</p>
    <p>Please note that if you have any further printing needs or questions, our customer support team is always here to assist you. You can reach us through our contact page, which can be found on our website.</p>
    <p><b>Thank you for choosing our Xerox printing site. We appreciate your business and hope to see you again soon.</b></p>`,
  });
};

const sendResetPasswordEmail = (email, url) => {
  sgMail.send({
    to: email,
    from: "prajapatichirag2162003@gmail.com",

    subject: `Hey there, Now you can simply reset your password from belo link.`,
    // text: url,
    html: `<h1>Hellow Admin</h1>
    <p>
      We received a request to reset your password. If you didn't make this request,
      please ignore this email.
    </p>
    <p>To reset your password, please click on the button below:</p>
    <p>
      <a href="${url}"><button >Reset Password</button></a>
    </p>
    <p>Link is valide for 5 minitus.</p>`,
  });
};

// const sendOtp = (name, email) => {
//   const no = Math.random() + "";
//   let OTP;

//   if (no.startsWith("0.0")) OTP = parseInt((0.1 + no * 1) * 10000);
//   else OTP = parseInt(no * 10000);

//   sgMail.send({
//     to: email,
//     from: "prajapatichirag2162003@gmail.com",
//     subject: "thanks for joining in ..",
//     text: `hii ${name},your one time otp is ${OTP}`,
//   });
//   return OTP;
// };
module.exports = {
  //   sendOtp,
  sendWelcomeEmail,
  sendCancelationEmail,
  sendResetPasswordEmail,
};
