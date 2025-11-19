import nodemailer from "nodemailer";
import { MAIL_USER, MAIL_PASSWORD } from "../config";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    }
})

async function verifyTransporter(): Promise<void> {
    await transporter.verify();
    console.log("Transporter de nodemailer verificado");
}



export async function sendConfirmationEmail(clientEmail: string): Promise<void> {
const confirmationEmailHTML = `
                <h1>Confirma la validez de tu mail para terminar de crear tu cuenta en infosecure.com</h1>

                <p> Para confirmar tu mail, por favor ingresa al siguiente <a href="http://localhost:5555/login-email-confirmado.html">enlace</a> para proseguir con la creación de tu cuenta.</p>

                <p> Si no has intentado crear una cuenta en nuestra página, puedes ignorar este mensaje.</p>
            `
    try {
        await verifyTransporter();

        await transporter.sendMail({
            from: "'InfoSecure' <infosecuref@gmail.com>",
            to: clientEmail,
            subject: "Confirmación de email",
            html: confirmationEmailHTML
        });
    } catch (error) {
        console.error(error);
    }
}
