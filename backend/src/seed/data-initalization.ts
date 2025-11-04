import NationalityRepository from "../repositories/nationality.repository";
import { getCountries } from "@yusifaliyevpro/countries";

export async function preloadData() {
    const countries = await getCountries({ fields: ["name"]});
    if (!countries) throw new Error();

    for (const country of countries) {
        await NationalityRepository.save([
            { name: country.name.common }
        ]);
    }
    console.log("Países cargados en bases de datos");
}
