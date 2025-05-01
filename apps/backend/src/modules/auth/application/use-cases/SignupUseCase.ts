import { AuthSchema } from "api-types/src/AuthSchema";
import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../domain/User";
import { AuthRepository } from "../interfaces/AuthRepository";
import { SignupData } from "shared/src/Auth.t";
import { UserCreator } from "../creators/UserCreator";


export class SignupUseCase {
    private authRepository: AuthRepository;
    public constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    public async execute(data: SignupData): Promise<{user: User, authToken: AuthToken}> {
        const validatedData = AuthSchema.signup.parse(data);
        let user = UserCreator.create(validatedData);
        user = await this.authRepository.createUser(user);
        const authToken = await this.authRepository.generateToken(user);
        return { user, authToken };
    }
}
