import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.routes";
import clientRouter from "./routes/client.routes";
import employeeRouter from "./routes/employee.routes";
import productRouter from "./routes/product.routes";
import invoiceRouter from "./routes/invoice.routes";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(userRouter);
app.use(clientRouter);
app.use(employeeRouter);
app.use(productRouter);
app.use(invoiceRouter);

export default app;
