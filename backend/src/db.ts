import { DataSource } from "typeorm";
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME, DB_URL } from "./db-config";
import User from "./entities/User";
import Cart from "./entities/Cart";
import Item from "./entities/Item";
import Client from "./entities/Client";
import Product from "./entities/Product";
import Invoice from "./entities/Invoice";
import Role from "./entities/Role";
import Nationality from "./entities/Nationality";
import Employee from "./entities/Employee";
import { ENVIRONMENT } from "./config";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: ENVIRONMENT === "test" ? "" : DB_URL,
    //ssl: {
    //rejectUnauthorized: false,
    //},
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: (<number>DB_PORT),
    database: DB_NAME,
    entities: [User, Cart, Client, Product, Invoice, Role, Nationality, Employee, Item],
    logging: ENVIRONMENT === "test",
    synchronize: true,
    dropSchema: ENVIRONMENT === "test"
});

export default AppDataSource;
