"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = require("nodemailer");
const errors_1 = require("../errors");
const mailgen_1 = __importDefault(require("mailgen"));
class EmailService {
    sendEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ to, subject, text }) {
            const transporter = (0, nodemailer_1.createTransport)({
                service: "hotmail",
                host: "smtp-mail.outlook.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
            yield transporter
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
                throw new errors_1.AppError("Error sending email, try again later", 500);
            });
        });
    }
    resetPasswordTemplate(userName, userEmail, resetToken) {
        const mailGenerator = new mailgen_1.default({
            theme: "default",
            product: {
                name: "Reset Password",
                link: "https://frontend-ecommerce-cars.vercel.app/",
            },
        });
        const email = {
            body: {
                name: userName,
                intro: "Você recebeu este e-mail porque uma solicitação de redefinição de senha para sua conta foi recebida.",
                action: {
                    instructions: "Clique no botão abaixo para redefinir sua senha:",
                    button: {
                        color: "#DC4D2F",
                        text: "Redefina sua senha",
                        link: `https://frontend-ecommerce-cars.vercel.app/users/resetPassword/${resetToken}`,
                    },
                },
                outro: "Se você não solicitou uma redefinição de senha, nenhuma outra ação será necessária de sua parte.",
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
exports.emailService = emailService;
