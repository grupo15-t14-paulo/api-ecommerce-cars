import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { carRoutes } from "./routes/cars.routes";
import { imgRoutes } from "./routes/images.routes";

const app: Application = express();
app.use(express.json());

app.use("/cars", carRoutes);
app.use("/images", imgRoutes);

app.use(handleErrors);

export default app;
