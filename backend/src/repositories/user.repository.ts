import AppDataSource from "../db";
import User from "../entities/User";
import { MissingData, NotFound } from "../services/errorMessages";

const UserRepository = AppDataSource.getRepository(User).extend({
    async createUser(userData: Partial<User>, hashedPassword: string) {
        if (!userData.email || !hashedPassword || !userData.username) throw new MissingData();

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

        if (!user) throw new Error();

        return user;
    },

    async readAllUsers() {
        const users = await this
        .createQueryBuilder()
        .getMany();

        if (!users) throw new Error();

        return users;

    },

    async updateUser() {
        const updatedUser = await this
        .createQueryBuilder()
        .update()
        .set({})
        .where({})
        .execute();

        if (!updatedUser) throw new Error();

        return updatedUser;

    },

    async deleteUser(userId: number) {
        await this
        .createQueryBuilder("user")
        .delete()
        .where("user.user_id = :userId", { userId })
        .execute();
    }
})

export default UserRepository;
