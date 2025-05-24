import { AuthSchema } from "api-types/src/AuthSchema";
import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../../users/domain/User";
import { AuthRepository } from "../interfaces/AuthRepository";
import { SignupData } from "shared/src/Auth.t";
import { UserCreator } from "../../../users/application/creators/UserCreator";
import { EmailValidator } from "../services/EmailValidator";


export class SignupUseCase {
    private authRepository: AuthRepository;
    private emailValidator: EmailValidator;
    public constructor(authRepository: AuthRepository, emailValidator: EmailValidator) {
        this.authRepository = authRepository;
        this.emailValidator = emailValidator;
    }

    public async execute(data: SignupData): Promise<{user: User, authToken: AuthToken}> {
        const validatedData = AuthSchema.signup.parse(data);
        const emailExists = await this.emailValidator.validate(validatedData.email);
        if (emailExists) {
            throw new Error('El email ya está en uso');
        }
        let user = UserCreator.create(validatedData);
        user = await this.authRepository.createUser(user);
        const authToken = await this.authRepository.generateToken(user);
        return { user, authToken };
    }
}
