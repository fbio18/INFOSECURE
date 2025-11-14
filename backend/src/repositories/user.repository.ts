import AppDataSource from "../db";
import User from "../entities/User";
import { readClientService } from "../services/client.services";
import { readEmployeeService } from "../services/employee.services";
import { NotFound } from "../services/errorMessages";
import { UserValidated } from "../services/validation";
import ClientRepository from "./client.repository";
import EmployeeRepository from "./employee.repository";

const UserRepository = AppDataSource.getRepository(User).extend({
    async createUser(userData: UserValidated, hashedPassword: string) {
        await this
        .createQueryBuilder("product")
        .insert()
        .values({ 
            email: userData.email,
            password: hashedPassword,
            username: userData.username,
            role: userData.role as string
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

    async readUserPassword(userId: number): Promise<Partial<User>> {
        const userPassword = await this
        .createQueryBuilder()
        .select("user.password", "password")
        .where("user.user_id = :userId", { userId })
        .getOne();

        if (!userPassword) throw new NotFound("user");

        return userPassword;
    },

    async readUserForLogin(userEmail: string): Promise<Partial<User>> {
        const user = await this
        .createQueryBuilder("user")
        .select("user.email")
        .addSelect("user.password")
        .addSelect("user.role")
        .addSelect("user.user_id")
        .where("user.email = :userEmail", { userEmail })
        .getOne();

        if (!user) throw new NotFound("user");

        return user;
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

    async deleteUser(userId: number): Promise<{ message: string, statusCode: number }> {
        await EmployeeRepository.unassignUserRelation(userId);
        await ClientRepository.unassignUserRelation(userId);

        await this
        .createQueryBuilder("user")
        .delete()
        .where("user_id = :userId", { userId })
        .execute();

        return { message: "El usuario fue eliminado con éxito", statusCode: 200 }
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

    async unassignEmployeeRelation(employeeId: number): Promise<void> {
        const user = await this
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.employee", "employee")
        .where("employee.employee_id = :employeeId", { employeeId })
        .getOne();

        await this
        .createQueryBuilder()
        .relation(User, "employee")
        .of(user)
        .set(null);
    },

    async assignClientRelation(userId: number, clientId: number) {
        const client = await readClientService(clientId);

        await this
        .createQueryBuilder("user")
        .update()
        .set({ client: client })
        .where("user_id = :userId", { userId })
        .execute();
    },

    async unassignClientRelation(clientId: number): Promise<void> {
        const user = await this
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.client", "client")
        .where("client.client_id = :clientId", { clientId })
        .getOne();

        await this
        .createQueryBuilder()
        .relation(User, "client")
        .of(user)
        .set(null)
    }
})

export default UserRepository;
