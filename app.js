import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { queue, queueName } from "./queue/jobs/emailJob.js";
import { HtmlMaker } from "./utils/ejsHTMLMaker.js";

const app = express();
const PORT = process.env.PORT || 8000;

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// Routes
app.get("/", async (req, res) => {
  res.sendStatus(200);
});

app.post("/send-otp", async (req, res) => {
  const data = req.body;
  const html = await HtmlMaker("verify-code.ejs", {
    name: data.name,
    otp: data.otp,
  });
  await queue.add(queueName, {
    html,
    subject: "Hello",
    to: data.email,
  });

  res.json({success: true, message: "Email sent successfully."});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
