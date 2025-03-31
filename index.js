import { createServer } from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
  try {
    let requestedPath = req.url === "/" ? "/index.html" : req.url;

    if (requestedPath === "/") {
      requestedPath = "/index.html";
    }

    if (!path.extname(requestedPath)) {
      requestedPath += ".html";
    }

    let filePath = path.join(__dirname, "public", requestedPath);
    let extname = path.extname(filePath);
    let contentType = extname === ".html" ? "text/html" : "text/css";

    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data, "utf8");
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(data, "utf8");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
