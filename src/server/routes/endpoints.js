import { createRequire } from 'module';
import fs from "fs";
const require = createRequire(import.meta.url);
require('dotenv').config();

// Cargar datos en memoria al iniciar
let usersArray = [];
let productsArray = [];

try {
  const usersData = fs.readFileSync("./data/users.json", "utf8");
  usersArray = JSON.parse(usersData);
} catch (err) {
  console.error("Error loading users.json:", err);
}

try {
  const productsData = fs.readFileSync("./data/products.json", "utf8");
  productsArray = JSON.parse(productsData);
} catch (err) {
  console.error("Error loading products.json:", err);
}

const endpoints = (app) => {
  app.get("/api/users", (req, res) => {
    res.json(usersArray);
  });

  app.get("/api/products", (req, res) => {
    res.json(productsArray);
  });
};


export default endpoints;