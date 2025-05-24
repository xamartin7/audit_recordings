import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../domain/User";

export interface OAuthLoginUseCase {
    login(token: string): Promise<{user: User, authToken: AuthToken}>;
}