import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../domain/User";
import { AuthRepository } from "../interfaces/AuthRepository";
import { OAuthLoginUseCase } from "../interfaces/OAuthLoginUseCase";
import { AccessTokenDecoder } from "../services/AccessTokenDecoder";

export class LoginWithGoogleUseCase implements OAuthLoginUseCase {
    private authRepository: AuthRepository;

    public constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    public async login(token: string): Promise<{user: User, authToken: AuthToken}> {
        console.log('token', token);
        const decodedToken = AccessTokenDecoder.decode(token);
        console.log('decodedToken', decodedToken);
        // TODO Find user by email, if not exists, create a new user with the decoded token data
        throw new Error('Not implemented');
    }

}
