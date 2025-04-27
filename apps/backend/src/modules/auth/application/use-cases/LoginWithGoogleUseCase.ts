import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../domain/User";

export class LoginWithGoogleUseCase {
    public constructor() {

    }

    public async execute(credentials: {email: string, password: string}): Promise<{user: User, authToken: AuthToken}> {
        throw new Error('Not implemented');
    }
}
