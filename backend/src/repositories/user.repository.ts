import AppDataSource from "../db";
import User from "../entities/User";
import { readClientService } from "../services/client.services";
import { readEmployeeService } from "../services/employee.services";
import { NotFound } from "../services/errorMessages";
import { UpdateUserValidated, UserValidated } from "../services/validation";

const UserRepository = AppDataSource.getRepository(User).extend({
    async createUser(userData: UserValidated, hashedPassword: string) {
        await this
        .createQueryBuilder("product")
        .insert()
        .values({
            email: userData.email,
            password: hashedPassword,
            username: userData.username
        })
        .execute();

        const returnedUser = await this
        .createQueryBuilder("user")
        .orderBy("user_id", "DESC")
        .getOne();

        if (!returnedUser) throw new NotFound("user");

        return returnedUser;
    },

    async readUser(userId: number) {
        const user = await this
        .createQueryBuilder("user")
        .where("user.user_id = :userId", { userId })
        .getOne();

        if (!user) throw new NotFound("user");

        return user;
    },

    async readAllUsers() {
        const users = await this
        .createQueryBuilder("user")
        .getMany();

        if (!users) throw new NotFound("user");

        return users;
    },

    async updateUser(userId: number, updatedUserData: Partial<User>): Promise<User> {
        await this
        .createQueryBuilder()
        .update()
        .set(updatedUserData)
        .where("user_id = :userId", { userId })
        .execute();

        const updatedUser = await this.readUser(userId);

        return updatedUser;
    },

    async deleteUser(userId: number) {
        await this
        .createQueryBuilder("user")
        .delete()
        .where("user.user_id = :userId", { userId })
        .execute();
    },

    async assignEmployeeRelation(userId: number, employeeId: number) {
        const employee = await readEmployeeService(employeeId);

        await this
        .createQueryBuilder("user")
        .update()
        .set({ employee: employee })
        .where("user_id = :userId", { userId })
        .execute();
    },

    async assignClientRelation(userId: number, clientId: number) {
        const client = await readClientService(clientId);

        await this
        .createQueryBuilder("user")
        .update()
        .set({ client: client })
        .where("user_id = :userId", { userId })
        .execute();
    }
})

export default UserRepository;
