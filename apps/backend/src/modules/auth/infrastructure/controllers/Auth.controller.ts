import { Request, Response } from "express";
import { LoginWithEmailUseCase } from "../../application/use-cases/LoginWithEmailUseCase";
import { LoginWithGoogleUseCase } from "../../application/use-cases/LoginWithGoogleUseCase";
import { SignupUseCase } from "../../application/use-cases/SignupUseCase";
import { OAuthLoginUseCase } from "../../application/interfaces/OAuthLoginUseCase";

export class AuthController {
    private loginWithEmailUseCase: LoginWithEmailUseCase;
    private oauthLoginUseCase: OAuthLoginUseCase;
    private signupUseCase: SignupUseCase;

    public constructor(
        loginWithEmailUseCase: LoginWithEmailUseCase,
        oauthLoginUseCase: OAuthLoginUseCase,
        signupUseCase: SignupUseCase,
    ) {
        this.loginWithEmailUseCase = loginWithEmailUseCase;
        this.oauthLoginUseCase = oauthLoginUseCase;
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

    public async loginWithSSOGoogle(req: Request, res: Response) {
        try {
            const { token } = req.body;
            const { user, authToken } = await this.oauthLoginUseCase.login(token);
            res.status(200).json({ user, authToken });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
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
