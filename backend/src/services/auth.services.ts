import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError, InvalidId, MissingData } from "./errorMessages";
import UserRepository from "../repositories/user.repository";
import User from "../entities/User";
import { JWT_SECRET } from "../config";
import { validateNumberId } from "./validation";

export async function loginService(user: Partial<User>): Promise<{ token: string, user: Partial<User> }> {
    if (!user.email) throw new MissingData();
    if (!user.password) throw new MissingData();

    const userToLogin = await UserRepository.readUserForLogin(user.email);

    const passwordIsCorrect = await bcrypt.compare(user.password, userToLogin.password as string);
    if (!passwordIsCorrect) throw new CustomError("La contraseña ingresada es inválida", 401);

    const token = jwt.sign(
        { user_id: userToLogin.user_id, username: userToLogin.username, role: userToLogin.role },
        JWT_SECRET,
        { expiresIn: "48h" }
    );

    return { token: token, user: userToLogin };
}

export async function confirmEmailService(userId: number, emailIsVerified: { hasEmailVerified: boolean }): Promise<{ verified: boolean }> {
    if (!validateNumberId(userId)) throw new InvalidId();
    if (!emailIsVerified) throw new MissingData();
    if (emailIsVerified.hasEmailVerified === false) throw new CustomError("No se puede asignar un valor de false a la verificación del mail", 401);

    await UserRepository.updateUser(userId, { hasVerifiedEmail: emailIsVerified.hasEmailVerified });

    return { verified: true };
}
