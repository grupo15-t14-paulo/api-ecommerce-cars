import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { carRoutes } from "./routes/cars.routes";
import { imgRoutes } from "./routes/images.routes";
import { userRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/cars", carRoutes);
app.use("/images", imgRoutes);
app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(handleErrors);

export default app;
