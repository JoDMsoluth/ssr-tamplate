import fs from "fs";
import path from "path";
import { renderPages, prerenderPages } from "./common";

for (const page of prerenderPages) {
  const result = renderPages(page);
  fs.writeFileSync(path.resolve(__dirname, `../dist/${page}.html`), result);
}
