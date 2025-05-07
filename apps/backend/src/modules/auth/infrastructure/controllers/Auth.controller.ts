import { Request, Response } from "express";
import { LoginWithEmailUseCase } from "../../application/use-cases/LoginWithEmailUseCase";
import { LoginWithGoogleUseCase } from "../../application/use-cases/LoginWithGoogleUseCase";
import { SignupUseCase } from "../../application/use-cases/SignupUseCase";

export class AuthController {
    private loginWithEmailUseCase: LoginWithEmailUseCase;
    private loginWithGoogleUseCase: LoginWithGoogleUseCase;
    private signupUseCase: SignupUseCase;

    public constructor(
        loginWithEmailUseCase: LoginWithEmailUseCase,
        loginWithGoogleUseCase: LoginWithGoogleUseCase,
        signupUseCase: SignupUseCase,
    ) {
        this.loginWithEmailUseCase = loginWithEmailUseCase;
        this.loginWithGoogleUseCase = loginWithGoogleUseCase;
        this.signupUseCase = signupUseCase;
    }

    public async loginWithEmail(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { user, authToken } = await this.loginWithEmailUseCase.execute({ email, password });
            res.status(200).json({ user, authToken });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    public async loginWithSSOGoogle() {
        throw new Error('Not implemented');
    }

    public async signup(req: Request, res: Response) {
        try {
            const { email, password, repeatPassword, name, surname, secondSurname } = req.body;
            const { user, authToken } = await this.signupUseCase.execute({ email, password, repeatPassword, name, surname, secondSurname });
            res.status(200).json({ user, authToken });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}
