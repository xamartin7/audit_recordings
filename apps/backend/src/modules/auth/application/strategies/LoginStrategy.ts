import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../domain/User";

export interface LoginStrategy {
    login(credentials: {email: string, password: string}): Promise<{user: User, authToken: AuthToken}>;
}