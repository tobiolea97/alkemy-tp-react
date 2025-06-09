import { createRequire } from "module";
import fs from "fs";
const require = createRequire(import.meta.url);
require("dotenv").config();

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
    //throw new Error("This endpoint is not implemented yet.");
    res.json(usersArray);
  });

  app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = usersArray.find((u) => u.id === id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  });

   app.get("/api/products", (req, res) => {
    res.json(productsArray);
  });

  app.get("/api/products/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = productsArray.find((p) => p.id === id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  });
};

export default endpoints;
