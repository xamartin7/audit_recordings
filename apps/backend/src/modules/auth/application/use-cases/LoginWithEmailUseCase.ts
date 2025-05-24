import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../../users/domain/User";
import { AuthRepository } from "../interfaces/AuthRepository";
import { AuthSchema } from "api-types/src/AuthSchema";

export class LoginWithEmailUseCase {
    private authRepository: AuthRepository;

    public constructor (authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    public async execute(credentials: {email: string, password: string}): Promise<{user: User, authToken: AuthToken}> {
        const validatedCredentials = AuthSchema.emailLogin.parse(credentials);
        const user = await this.authRepository.findUserByEmail(validatedCredentials.email);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await this.authRepository.verifyPassword(user.getEmail(), validatedCredentials.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const authToken = await this.authRepository.generateToken(user);
        return { user, authToken };
    }
}