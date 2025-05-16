import "dotenv/config";
import express, { Express, Request, Response, urlencoded } from "express";
import RouteHandler from "./routes";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Express middlwares
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is up & running" });
});

// Routes
app.use(RouteHandler);

app.listen(PORT, () => console.log(`Server is up & running on ${PORT}`));
