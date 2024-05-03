import nodemailer from 'nodemailer';
import 'dotenv/config';

const { MAILTRAP_PASS } = process.env;

const configEmail = {
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '2ae41992198cff',
    pass: MAILTRAP_PASS,
  },
};

const transport = nodemailer.createTransport(configEmail);

export const sendEmail = async (data) => {
  const email = { ...data, from: '2ae41992198cff' };

  try {
    await transport.sendMail(email);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
