import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../domain/User";
import { LoginStrategy } from "../strategies/LoginStrategy";
import { AuthSchema } from "api-types/src/AuthSchema";

export class LoginWithEmailUseCase {
    private loginStrategy: LoginStrategy
    public constructor (loginStrategy: LoginStrategy) {
        this.loginStrategy = loginStrategy;
    }

    public async execute(credentials: {email: string, password: string}): Promise<{user: User, authToken: AuthToken}> {
        const validatedCredentials = AuthSchema.emailLogin.parse(credentials);
        return this.loginStrategy.login(validatedCredentials);
    }
}