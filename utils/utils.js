import nodemailer from "nodemailer";

export async function sendMessage(subject, text) {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    requireTLS: process.env.EMAIL_TLS,
  });

  let message = {
    from: process.env.MESSAGE_FROM,
    to: process.env.MESSAGE_TO,
    subject: subject,
    text: text,
  };

  await transporter
    .sendMail(message)
    .then(() => {
      console.log("Message sent: %s");
    })
    .catch((error) => {
      console.error("Error sending message: %s", error);
    });
}
