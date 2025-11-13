import NationalityRepository from "../repositories/nationality.repository";
import UserRepository from "../repositories/user.repository";
import { getCountries } from "@yusifaliyevpro/countries";
import ProductRepository from "../repositories/product.repository";
import RoleRepository from "../repositories/role.repository";
import { ENVIRONMENT } from "../config";
import { CustomError } from "../services/errorMessages";
import EmployeeRepository from "../repositories/employee.repository";

export async function preloadData() {
    try {
        const countries = await getCountries({ fields: ["name"]});
        if (!countries) throw new CustomError("La petición a la API de países falló", 500);

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


        await EmployeeRepository.createEmployee(
            {
                dni: "35192380",
                surnames: "De la Cruz",
                names: "Ernesto Vicente",
                salary: 750520,
                user: 1,
                role: 1,
            }
        )

        await EmployeeRepository.createEmployee(
            {
                dni: "40291283",
                surnames: "Gómez Mendez",
                names: "Daniel",
                salary: 619201,
                user: 2,
                role: 2,
            }
        )

        await EmployeeRepository.createEmployee(
            {
                dni: "38190240",
                surnames: "Fernandez",
                names: "Celia Fernanda",
                salary: 1000010,
                user: 3,
                role: 3,
            }
        )

        await EmployeeRepository.createEmployee(
            {
                dni: "28012756",
                surnames: "Güemes Benavidez",
                names: "Pedro Baltazar",
                salary: 900192.00,
                user: 4,
                role: 4,
            }
        )

        console.log("Países, roles, usuarios y productos cargados con éxito");
    } catch (error) {
        console.error(error);
        console.log("No se pudo cargar la lista de países en BD");
    }
}
