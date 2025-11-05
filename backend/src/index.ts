import "reflect-metadata";
import AppDataSource from "./db";
import app from "./app";
import { PORT } from "./config";
import { preloadData } from "./seed/data-initalization";

async function main(){
    try {
        await AppDataSource.initialize()
        await preloadData();
        app.listen(PORT || 4000);
        console.log("Server up on port ", PORT);
    } catch (error) {
        console.error(error);
        app.listen(PORT || 4000);
        console.log("Server up on port ", PORT);
    }
}

main();
