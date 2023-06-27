import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { carRoutes } from "./routes/cars.routes";
import { imgRoutes } from "./routes/images.routes";
import { userRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";
import { commentsRoutes } from "./routes/commets.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/cars", carRoutes);
app.use("/images", imgRoutes);
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/comments", commentsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(handleErrors);

export default app;
