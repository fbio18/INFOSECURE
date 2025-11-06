import User from "../entities/User";
import UserRepository from "../repositories/user.repository";
import { validateNumberId, validateUserData } from "./validation";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config";
import { InvalidData, InvalidId } from "./errorMessages";

export async function createUserService(userData: Partial<User>) {
    if (!validateUserData(userData)) throw new InvalidData();

    const hashedPassword = await bcrypt.hash(userData.password as string, SALT_ROUNDS)

    return await UserRepository.createUser(userData, hashedPassword);
}

export async function readUserService(userId: number): Promise<User> {
    if (!validateNumberId(userId)) throw new InvalidId("number");

    return await UserRepository.readUser(userId);
}

export async function readsAllUsersService() {
    return await UserRepository.readAllUsers();
}

export async function updateUserService(updatedUserData: User) {
    if (!validateUserData(updatedUserData)) throw new Error();

    await UserRepository.updateUser();
}

export async function deleteUserService(userId: number) {
    if (!validateNumberId(userId)) throw new InvalidId("number");

    await UserRepository.deleteUser(userId);
}

export async function assignEmployeeRelationService(userId: number, employeeId: number) {
    if (!validateNumberId(employeeId) || !validateNumberId(userId)) throw new InvalidId("number");

    await UserRepository.assignEmployeeRelation(userId, employeeId);
}

export async function assignClientRelationService(userId: number, clientId: number) {
    if (!validateNumberId(userId) || !validateNumberId(clientId)) throw new InvalidId("number");

    await UserRepository.assignClientRelation(userId, clientId);
}
