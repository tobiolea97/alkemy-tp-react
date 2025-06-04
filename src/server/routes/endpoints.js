import { createRequire } from 'module';
import fs from "fs";
const require = createRequire(import.meta.url);
require('dotenv').config();

const endpoints = (app) => {
  app.get("/api/users", (req, res) => {
    fs.readFile("./data/users.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading users file:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      try {
        const users = JSON.parse(data);
        res.json(users);
      } catch (parseError) {
        console.error("Error parsing users data:", parseError);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  });

  app.get("/api/products", (req, res) => {
    fs.readFile("./data/products.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading products file:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      try {
        const products = JSON.parse(data);
        res.json(products);
      } catch (parseError) {
        console.error("Error parsing products data:", parseError);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  });
}


export default endpoints;