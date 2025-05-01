import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../domain/User";
import { AuthRepository } from "../interfaces/AuthRepository";
import { LoginStrategy } from "./LoginStrategy";

export class EmailLoginStrategy implements LoginStrategy {
    private authRepository: AuthRepository;

    public constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    public async login(credentials: {email: string, password: string}): Promise<{user: User, authToken: AuthToken}> {
        const user = await this.authRepository.findUserByEmail(credentials.email);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await this.authRepository.verifyPassword(user.getEmail(), credentials.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const authToken = await this.authRepository.generateToken(user);
        return { user, authToken };
    }
}
