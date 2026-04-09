import nodemailer from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: EmailOptions) => {
  
  const transporter = nodemailer.createTransport({
    
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'insightO Team <hello@insighto.com>',
    to: options.email,
    subject: options.subject,
    html: `<b>${options.message}</b>` 
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;