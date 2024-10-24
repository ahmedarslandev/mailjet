import Mailjet from "node-mailjet";

export const mailjet = new Mailjet.apiConnect(
  `${process.env.API_KEY}`,
  `${process.env.API_SECRET}`
);
