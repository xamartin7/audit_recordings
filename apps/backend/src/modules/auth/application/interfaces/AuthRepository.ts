import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../../users/domain/User";

export interface AuthRepository {
    findUserByEmail(email: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    generateToken(user: User): Promise<AuthToken>;
    validateGoogleToken(token: string): Promise<User>;
    verifyPassword(email: string, password: string): Promise<boolean>;
    emailExists(email: string): Promise<boolean>;
}