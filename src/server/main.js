import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import cors from "cors";
import endpoints from "./routes/endpoints.js";

const app = express();
app.use(express.json());

endpoints(app);

app.use(bodyParser.json());
app.use(cors());


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
