import User from "../entities/User";
import UserRepository from "../repositories/user.repository";
import { CustomError } from "./errorMessages";
import { validateUserData } from "./validation";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config";

export async function createUserService(userData: Partial<User>) {
    if (!validateUserData(userData)) throw new CustomError("invalid-data");

    const hashedPassword = await bcrypt.hash(userData.password as string, SALT_ROUNDS)

    return await UserRepository.createUser(userData, hashedPassword);
}

export async function readUserService(userId: number): Promise<User> {
    if (!validateUserData(userData)) throw new CustomError("invalid-data");

    return await UserRepository.readUser(userId);
}

export async function readsAllUserService() {
    if (!validateUserData(userData)) throw new CustomError("invalid-data");

    return await UserRepository.readAllUsers();
}

export async function updateUserService(updatedUserData: User) {
    if (!validateUserData(userData)) throw new CustomError("invalid-data");

    if (!validateUserData(updatedUserData)) throw new Error();

    await UserRepository.updateUser();
}

export async function deleteUserService(userId: number) {
    if (!validateUserData(userData)) throw new CustomError("invalid-data");

    await UserRepository.deleteUser(userId);
}
