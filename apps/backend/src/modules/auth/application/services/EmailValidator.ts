import { AuthRepository } from "../interfaces/AuthRepository";

export class EmailValidator {
    private authRepository: AuthRepository;

    public constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    public async validate(email: string): Promise<boolean> {
        return await this.authRepository.emailExists(email);
    }
}


