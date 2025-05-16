import { Router } from "express";
import BookRouteHandler from "../controller/books.controller";

const RouteHandler: Router = Router();

RouteHandler.use("/api/books", BookRouteHandler);

export default RouteHandler;
