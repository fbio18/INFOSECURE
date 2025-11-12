import Role from "../entities/Role";
import AppDataSource from "../db";


const RoleRepository = AppDataSource.getRepository(Role);

export default RoleRepository;
