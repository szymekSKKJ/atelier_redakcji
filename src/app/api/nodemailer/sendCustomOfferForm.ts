"use server";

import nodemailer from "nodemailer";

const sendCustomOfferForm = async (formData: FormData): Promise<string> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const data = {
    additionalInformation: formData.get("additionalInformation"),
    file: formData.get("file"),
    userData: {
      name: formData.get("name"),
      email: formData.get("email"),
    },
  } as {
    additionalInformation: string;
    file: File;
    userData: {
      name: string;
      email: string;
    };
  };

  const {
    additionalInformation,
    file,
    userData: { name, email },
  } = data;

  const fileArrayBuffer = await file.arrayBuffer();

  const info = await transporter.sendMail({
    from: `${name} <${email}>`,
    to: "kontakt@atelier-redakcji.eu",
    subject: `Wiadomość od ${name} <${email}>`,
    attachments: [
      {
        filename: file.name,
        //@ts-ignore
        content: Buffer.from(fileArrayBuffer, "binary"),
        encoding: "base64",
      },
    ],
    html: `
    <html>
    <head>
      <style>
        * {
          box-sizing: border-box;
          margin: 0px;
          padding: 0px;
        }

        body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        h1.title {
          margin-bottom: 10px;
        }

        p, b {
          line-height: 1;
          font-size: 15px;
          padding: 2px;
        }

        p.message {
          margin: 0px 0px 50px 0px;
        }

        b {
          display: block;
        }

        .contact {
          margin-top: 50px;
        }
      </style>
    </head>
    <body>
      <h1 class="title">${`Wiadomość`}:</h1>
      <p>Wiadomość:</p>
      <p class="message">${additionalInformation}</p>
      <b class="contact">Dane kontaktowe:</b>
      <p>Imię: ${name}</p>
      <p>Email: ${email}</p>
    </body>
  </html>

    `,
  });

  return info.response;
};

export default sendCustomOfferForm;
