import { createTransport } from "nodemailer";
import { AppError } from "../errors";
import Mailgen from "mailgen";

interface IEmailRequest {
  to: string;
  subject: string;
  text: string;
}

class EmailService {
  async sendEmail({ to, subject, text }: IEmailRequest) {
    const transporter = createTransport({
      host: "smtp-mail.outlook.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter
      .sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html: text,
      })
      .then(() => {
        console.log("email send");
      })
      .catch((err) => {
        console.log(err);
        throw new AppError("Error sending email, try again later", 500);
      });
  }

  resetPasswordTemplate(
    userName: string,
    userEmail: string,
    resetToken: string
  ) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Reset Password",
        link: "https://frontend-ecommerce-cars.vercel.app",
      },
    });

    const email = {
      body: {
        name: userName,
        intro:
          "Você recebeu este e-mail porque uma solicitação de redefinição de senha para sua conta foi recebida.",
        action: {
          instructions: "Clique no botão abaixo para redefinir sua senha:",
          button: {
            color: "#DC4D2F",
            text: "Redefina sua senha",
            link: `https://frontend-ecommerce-cars.vercel.app/resetPassword/${resetToken}`,
          },
        },
        outro:
          "Se você não solicitou uma redefinição de senha, nenhuma outra ação será necessária de sua parte.",
      },
    };

    const emailBody = mailGenerator.generate(email);
    const emailTemplate = {
      to: userEmail,
      subject: "Redefinir Senha",
      text: emailBody,
    };
    return emailTemplate;
  }
}

const emailService = new EmailService();
export { emailService };
