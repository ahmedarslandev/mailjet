import path from "path";
import ejs from "ejs";
import { __dirname } from "../app.js";


export const HtmlMaker = async (viewPath, args) => {
  console.log(__dirname)
  const fullPath = path.resolve(__dirname, `./views/${viewPath}`);
  const html = await ejs.renderFile(fullPath, args);
  return html;
};
