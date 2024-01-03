"use server";
import nodemailer from "nodemailer";

const sendMainForm = async (formData: FormData): Promise<string> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.nodemailerEmail,
      pass: process.env.nodemailerPassword,
    },
  });

  const documentTypesDictionary = [
    {
      key: "adjustment",
      value: "korekty",
      isChecked: formData.get("adjustment"),
    },
    {
      key: "proofreading",
      value: "redakcji",
      isChecked: formData.get("proofreading"),
    },
    {
      key: "formatting",
      value: "formatowania",
      isChecked: formData.get("formatting"),
    },
  ];

  const foundServicesType = documentTypesDictionary.filter((type) => type.isChecked);

  const formattedServiesType = foundServicesType.map((type) => ` ${type.value}`).toString();

  const data = {
    servicesType: formattedServiesType,
    additionalInformation: formData.get("additionalInformation"),
    file: formData.get("file"),
    userData: {
      name: formData.get("name"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      companyName: formData.get("companyName"),
    },
    textData: {
      type: formData.get("textType"),
      deadline: formData.get("deadline"),
      pages: formData.get("pages"),
      numberOfCharactersWithSpaces: formData.get("numberOfCharactersWithSpaces"),
      topic: formData.get("topic"),
    },
  } as {
    servicesType: string;
    additionalInformation: string;
    file: File;
    userData: {
      name: string;
      email: string;
      phoneNumber?: string;
      companyName?: string;
    };
    textData: {
      type: string;
      deadline: string;
      pages: string;
      numberOfCharactersWithSpaces: string;
      topic: string;
    };
  };

  const {
    servicesType,
    additionalInformation,
    file,
    userData: { name, email, phoneNumber, companyName },
    textData: { type: textType, deadline, pages, numberOfCharactersWithSpaces, topic },
  } = data;

  const fileArrayBuffer = await file.arrayBuffer();

  const info = await transporter.sendMail({
    from: `${name} <${email}>`,
    to: "kontakt@atelier-redakcji.eu",
    subject: `Wycena ${servicesType} od ${name} <${email}>`,
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
      <h1 class="title">${`Wycena ${servicesType}`}:</h1>
      <p>Wiadomość:</p>
      <p class="message">${additionalInformation}</p>
      <p>Typ: ${textType}</p>
      <p>Temat przewodni utworu: ${topic}</p>
      <p>Ilość znaków ze spacją: ${numberOfCharactersWithSpaces}</p>
      <p>Ilość stron: ${pages}</p>
      <p>Czas realizacji: ${new Date(deadline).toLocaleDateString("pl-PL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      <b class="contact">Dane kontaktowe:</b>
      <p>Imię: ${name}</p>
      <p>Email: ${email}</p>
      <p>Numer telefonu: ${phoneNumber}</p>
      <p>Nazwa firmy: ${companyName}</p>
    </body>
  </html>
  
    `,
  });

  return info.response;
};

export default sendMainForm;
