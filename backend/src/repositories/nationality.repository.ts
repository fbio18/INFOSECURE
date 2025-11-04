import AppDataSource from "../db";
import Nationality from "../entities/Nationality";

const NationalityRepository = AppDataSource.getRepository(Nationality);

export default NationalityRepository;
