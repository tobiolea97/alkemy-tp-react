import { createRequire } from "module";
import fs from "fs";
const require = createRequire(import.meta.url);
require("dotenv").config();

// Cargar datos en memoria al iniciar
let usersArray = [];
let productsArray = [];

let currentId = 1;
function nextId(list) {
  // obtener el ID máximo actual
  if (list.length > 0) {
    const maxId = Math.max(...list.map((item) => item.id));
    currentId = maxId + 1; // incrementar para el próximo ID
  }
  return currentId++;
}

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
    //throw new Error("Error al obtener usuarios"); // descomentar para simular error
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

  app.put("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userIndex = usersArray.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Actualizar los campos del usuario
    usersArray[userIndex] = { ...usersArray[userIndex], ...req.body };
    res.json(usersArray[userIndex]);
  });

  app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const userIndex = usersArray.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    
    usersArray.splice(userIndex, 1);
    return res.status(204).send();
  });

  app.post("/api/users", (req, res) => {
    const {
      nombre,
      apellido,
      email,
      ciudad = "",
      pais = "",
      altura = null,
      edad = null,
    } = req.body;

    // 1) Validación mínima
    if (!nombre || !apellido || !email) {
      return res
        .status(400)
        .json({ error: "nombre, apellido y email son obligatorios" });
    }

    // 2) Verificar duplicado por email (ejemplo):
    const exists = usersArray.some((u) => u.email === email);
    if (exists) {
      return res.status(409).json({ error: "Email ya registrado" });
    }

    // 3) Crear usuario
    const newUser = {
      id: nextId(usersArray),
      nombre,
      apellido,
      email,
      ciudad,
      pais,
      altura,
      edad,
    };

    usersArray.push(newUser);

    // 4) Devolver resultado
    // 201 = Created, y Location header con la URL del nuevo recurso
    res.status(201).location(`/api/users/${newUser.id}`).json(newUser);
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

  app.put("/api/products/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const productIndex = productsArray.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    // Actualizar los campos del producto
    productsArray[productIndex] = { ...productsArray[productIndex], ...req.body };
    res.json(productsArray[productIndex]);
  });
  
  app.delete("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const productIndex = productsArray.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    
    productsArray.splice(productIndex, 1);
    return res.status(204).send();
  });
  
  app.post("/api/products", (req, res) => {
    const { nombre, precio, categoria } = req.body;
    // 1) Validación mínima
    if (!nombre || !precio || !categoria) {
      return res.status(400).json({ error: "nombre, precio y categoria son obligatorios" });
    }

    // 2) Verificar duplicado por nombre (ejemplo):
    const exists = productsArray.some((p) => p.nombre === nombre);
    if (exists) {
      return res.status(409).json({ error: "Producto ya registrado" });
    }

    // 3) Crear producto
    const newProduct = {
      id: nextId(productsArray),
      nombre,
      precio,
      categoria,
    };

    productsArray.push(newProduct);

    // 4) Devolver resultado
    res.status(201).location(`/api/products/${newProduct.id}`).json(newProduct);
  });
};

export default endpoints;

