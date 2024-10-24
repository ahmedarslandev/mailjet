import Mailjet from "node-mailjet";

export const mailjet = new Mailjet.apiConnect(
  `${process.env.API_KEY}`,
  `${process.env.API_SECRET}`
);

import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

export async function sendEmail({ to, Subject, html }) {
  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL,
            Name: process.env.NAME,
          },
          To: [
            {
              Email: to,
              Name: "You",
            },
          ],
          Subject,
          TextPart: "Greetings from Mailjet!",
          HTMLPart: html,
        },
      ],
    });
    return request
  } catch (error) {
    throw new Error(error.message);
  }
}
