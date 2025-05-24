import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../../users/domain/User";
import { AuthRepository } from "../interfaces/AuthRepository";
import { OAuthLoginUseCase } from "../interfaces/OAuthLoginUseCase";
import { AccessTokenDecoder } from "../services/AccessTokenDecoder";
import { CreateUserUseCase } from "../../../users/application/use-cases/CreateUserUseCase";
import { SignupData } from "shared/src/Auth.t";
import { UserCreator } from "../../../users/application/creators/UserCreator";

export class LoginWithGoogleUseCase implements OAuthLoginUseCase {
    private authRepository: AuthRepository;
    private createUserCase: CreateUserUseCase;

    public constructor(authRepository: AuthRepository, createUserCase: CreateUserUseCase) {
        this.authRepository = authRepository;
        this.createUserCase = createUserCase;
    }

    public async login(token: string): Promise<{user: User, authToken: AuthToken}> {
        const decodedToken = AccessTokenDecoder.decode(token);
        let user = await this.authRepository.findUserByEmail(decodedToken.email);
        if (!user) {
            const data: SignupData = {
                email: decodedToken.email,
                password: '',
                repeatPassword: '',
                name: decodedToken.full_name,
                surname: '',
                secondSurname: ''
            }
            user = UserCreator.create(data);
            user = await this.createUserCase.createUser(user);
        }
        const authToken = await this.authRepository.generateToken(user);
        return {user, authToken};
    }

}
