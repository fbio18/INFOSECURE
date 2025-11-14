import express from "express";
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
    origin: ["http://localhost:5555", "http://127.0.0.1:5555"],
    credentials: true
}));
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
