import AppDataSource from "../db";
import Nationality from "../entities/Nationality";
import { NotFound } from "../services/errorMessages";

const NationalityRepository = AppDataSource.getRepository(Nationality).extend({
    async readNationality(nationalityId: number) {
        const nationality = await this
        .createQueryBuilder("nationality")
        .where("nationality.nationality_id = :nationalityId", { nationalityId })
        .getOne();

        if (!nationality) throw new NotFound("nationality");

        return nationality;
    },
});

export default NationalityRepository;
