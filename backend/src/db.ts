import { DataSource } from "typeorm";
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } from "./db-config";


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
    entities: [],
    logging: true,
    synchronize: true,
    dropSchema: true
});

export default AppDataSource;
