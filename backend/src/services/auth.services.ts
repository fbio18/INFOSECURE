import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError, MissingData } from "./errorMessages";
import UserRepository from "../repositories/user.repository";
import User from "../entities/User";
import { JWT_SECRET } from "../config";

export async function loginService(user: Partial<User>): Promise<{ token: string, user: Partial<User> }> {
    if (!user.username) throw new MissingData();
    if (!user.password) throw new MissingData();

    const userToLogin = await UserRepository.readUserForLogin(user.username);

    const passwordIsCorrect = await bcrypt.compare(user.password, userToLogin.password as string);
    if (!passwordIsCorrect) throw new CustomError("La contraseña ingresada es inválida", 401);

    const token = jwt.sign(
        { user_id: userToLogin.user_id, username: userToLogin.username },
        JWT_SECRET,
        { expiresIn: "48h" }
    );

    return { token: token, user: userToLogin };
}
