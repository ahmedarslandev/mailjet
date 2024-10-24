import { Queue, Worker } from "bullmq";
import {defaultJobOptions , redisConnection} from "../index.js"
import { sendEmail } from "../../config/Mail/client/sendEmail.js";

export const queueName = "emailQueue";

export const queue = new Queue(queueName, {
  connection: redisConnection,
  defaultJobOptions: defaultJobOptions,
});

export const worker = new Worker(
  queueName,
  async (job) => {
    const { to, subject, html} = job.data;
    await sendEmail({
      to,
      Subject: subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  },
  { connection: redisConnection }
);
