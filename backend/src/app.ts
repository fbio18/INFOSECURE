import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.routes";
import clientRouter from "./routes/client.routes";
import employeeRouter from "./routes/employee.routes";
import productRouter from "./routes/product.routes";
import invoiceRouter from "./routes/invoice.routes";
import cartRoutes from "./routes/cart.routes";
import authRoutes from "./routes/auth.routes";
import paymentRoutes from "./routes/payment.routes";
import { ENVIRONMENT } from "./config";

const app = express();

app.use(morgan("dev"));
app.use(cors({
    origin: "*",
    credentials: true
}));
//app.options("*", cors());
//app.use((req: Request, res: Response, next: NextFunction) => {
//    res.append("Access-Control-Allow-Origin", ["*"]);
//    res.append("Access-Control-Allow-Methods", "GET, POST, HEAD, PUT, DELETE");
//
//    next();
//})
app.use(express.json());
app.use(cookieParser());

app.use(paymentRoutes);
app.use(authRoutes);
app.use(userRouter);
app.use(clientRouter);
app.use(employeeRouter);
app.use(productRouter);
app.use(invoiceRouter);
app.use(cartRoutes);

export default app;
