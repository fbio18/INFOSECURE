import "reflect-metadata";
import AppDataSource from "./db";
import app from "./app";
import { PORT } from "./config";

async function main(){
    try {
        await AppDataSource.initialize()
        console.log("Database intialized");
        app.listen(PORT || 4000);
        console.log("Server up on port ", PORT);
    } catch (error) {
        console.error(error);
    }
}

main();
