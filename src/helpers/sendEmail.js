import emailjs from '@emailjs/nodejs';
import dotenv from 'dotenv';

dotenv.config();

export async function sendEmail(req, res) {
  const { email, fullName, description } = req.body;

  return await emailjs
    .send(
      process.env.EMAIL_SERVICE_ID, //service ID
      process.env.EMAIL_TEMPLATE_ID, //template ID
      { name: fullName, email, message: description },
      {
        publicKey: process.env.EMAIL_PUBLIC_KEY,
        privateKey: process.env.EMAIL_PRIVATE_KEY,
      }
    )
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
        return 'SUCCESS';
      },
      function (err) {
        throw err.text;
      }
    );
}
