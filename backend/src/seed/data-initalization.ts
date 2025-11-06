import NationalityRepository from "../repositories/nationality.repository";
import UserRepository from "../repositories/user.repository";
import { getCountries } from "@yusifaliyevpro/countries";

export async function preloadData() {
    try {
        const countries = await getCountries({ fields: ["name"]});
        if (!countries) throw new Error();

        for (const country of countries) {
            await NationalityRepository.save([
                { name: country.name.common }
            ]);
        }

        await UserRepository.save([
            {
                username: "Nico",
                email: "miqueasnruarte@protonmail.com",
                password: "12345678"
            },
            {
                username: "BitsHunter",
                email: "pabloHunter@gmail.com",
                password: "holasoygay"
            },
            {
                username: "ZackDaga",
                email: "zackdaga@gmail.com",
                password: "soyunenano+10"
            },
            {
                username: "Saparrafpa",
                email: "chad67depenopochepe",
                password: "4khd7822"
            }
        ]);
        console.log("Países cargados en bases de datos");
    } catch (error) {
        console.log("No se pudo cargar la lista de países en BD");
    }
}
