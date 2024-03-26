"use server";
import nodemailer from "nodemailer";

const sendVereficationLink = async (email: string, uuid: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  return await transporter.sendMail({
    to: process.env.NODEMAILER_EMAIL,
    subject: `Aktywacja konta użytkownika ${email}`,
    html: `
            <html>
                <head>
                    <style>
                        span {
                            font-weight: 700;
                        }
        
                        p.link {
                            font-size: 22px;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <h1>Aktywacja konta użytkownika ${email}</h1>
                    <p>Kliknij w poniższy link aby zezwolić użytkownikowi <span>${email}</span> na dostęp do edycji artykułów na blogu</p>
                    <p class="link">${process.env.NEXT_PUBLIC_URL}/activateAccount/${uuid}</p>
                    <p>Jeżeli nie zazwalasz zgody, zingoruj tę wiadomość</p>
                </body>
          </html>
            `,
  });
};

export default sendVereficationLink;
