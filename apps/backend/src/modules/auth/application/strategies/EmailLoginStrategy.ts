import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../domain/User";
import { LoginStrategy } from "./LoginStrategy";

export class EmailLoginStrategy implements LoginStrategy {
    public async login(credentials: {email: string, password: string}): Promise<{user: User, authToken: AuthToken}> {
        throw new Error('Not implemented');
    }
}
