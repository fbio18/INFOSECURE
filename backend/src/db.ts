import { DataSource } from "typeorm";
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } from "./db-config";
import User from "./entities/User";
import Cart from "./entities/Cart";
import Cart_Product from "./entities/Cart_Product";
import Client from "./entities/Client";
import Product from "./entities/Product";
import Invoice from "./entities/Invoice";
import Invoice_type from "./entities/Invoice_type";
import Invoice_Product from "./entities/Invoice_product";
import Role from "./entities/Role";
import Nationality from "./entities/Nationality";
import Employee from "./entities/Employee";

export const AppDataSource = new DataSource({
    type: "postgres",
    //url: DB_URL,
    //ssl: {
    //rejectUnauthorized: false,
    //},
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: (<number>DB_PORT),
    database: DB_NAME,
    entities: [User, Cart, Client, Product, Invoice, Invoice_type, Role, Nationality, Employee, Invoice_Product, Cart_Product],
    logging: true,
    synchronize: true,
    dropSchema: true
});

export default AppDataSource;
