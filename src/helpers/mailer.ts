import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { User } from "@/models/userModel";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailInfo: MailOptions = {
      from: "muhammadusama798i@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset Your Password",
      html: `<p> To ${
        emailType === "VERIFY" ? `Verify YourSelf Click <a href="${
        process.env.DOMAIN
      }/verifysignupemail?token=${hashedToken}">Here<a/>` : `Reset your password Click <a href="${
        process.env.DOMAIN
      }/verifyresetpasswordmail?token=${hashedToken}">Here<a/>`
      } 
        or Simply Copy and paste link to browser <br/> ${
        emailType === "VERIFY" ? `${process.env.DOMAIN}/verifysignupemail?token=${hashedToken}`:`${process.env.DOMAIN}/verifyresetpasswordmail?token=${hashedToken}`}
        <p/>`,
    };

    const mailResponse = await transport.sendMail(mailInfo);

    return mailResponse;
  } catch (error) {
    console.log("Something went wrong in sending mail" + error);
  }
};

export { sendEmail };
