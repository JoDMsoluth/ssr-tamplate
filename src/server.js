import express from "express";
import fs from "fs";
import path from "path";
import * as url from "url";

import { renderPages, prerenderPages } from "./common";

const prerenderHtml = {};
for (const page of prerenderPages) {
  const pageHtml = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}.html`),
    "utf8"
  );
  prerenderHtml[page] = pageHtml;
}

const app = express();

app.use("/dist", express.static("dist"));
app.get("/favicon.ico", (req, res) => res.sendStatus(204));

app.get("*", (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : "home";
  const initialData = { page };
  const pageHtml = prerenderPages.includes(page)
    ? prerenderHtml[page]
    : renderPages(page);
  const result = pageHtml.replace(
    "__DATA_FROM_SERVER__",
    JSON.stringify(initialData)
  );
  res.send(result);
});
app.listen(3000);
