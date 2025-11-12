import NationalityRepository from "../repositories/nationality.repository";
import UserRepository from "../repositories/user.repository";
import { getCountries } from "@yusifaliyevpro/countries";
import ProductRepository from "../repositories/product.repository";
import RoleRepository from "../repositories/role.repository";
import { ENVIRONMENT } from "../config";

export async function preloadData() {
    try {
        const countries = await getCountries({ fields: ["name"]});
        if (!countries) throw new Error();

        for (const country of countries) {
            await NationalityRepository.save([
                { name: country.name.common }
            ]);
        }

        if (ENVIRONMENT !== "test") return;

        await UserRepository.save([
            {
                username: "Nico",
                email: "miqueasnruarte@protonmail.com",
                password: "12345678"
            },
            {
                username: "BitsHunter",
                email: "pabloHunter@gmail.com",
                password: "chillimicateamo" },
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

        await ProductRepository.save([
            {
                name: "BitFort Antivirus",
                price: 35000.00
            }
        ]);

        await RoleRepository.save([
            {
                name: "Atención al cliente"
            },
            {
                name: "Gerente de Recursos Humanos"
            },
            {
                name: "Gerente de Producción"
            },
            {
                name: "Gerente general"
            },
            {
                name: "Programador"
            },
            {
                name: "Personal de limpieza"
            }
        ])

        console.log("Países, roles, usuarios y productos cargados con éxito");
    } catch (error) {
        console.error(error);
        console.log("No se pudo cargar la lista de países en BD");
    }
}
