import { Request, Response } from "express";
import { LoginWithEmailUseCase } from "../../application/use-cases/LoginWithEmailUseCase";
import { LoginWithGoogleUseCase } from "../../application/use-cases/LoginWithGoogleUseCase";

export class AuthController {
    private loginWithEmailUseCase: LoginWithEmailUseCase;
    private loginWithGoogleUseCase: LoginWithGoogleUseCase;

    public constructor(loginWithEmailUseCase: LoginWithEmailUseCase, loginWithGoogleUseCase: LoginWithGoogleUseCase) {
        this.loginWithEmailUseCase = loginWithEmailUseCase;
        this.loginWithGoogleUseCase = loginWithGoogleUseCase;
    }

    public async loginWithEmail(req: Request, res: Response) {
        const { email, password } = req.body;
        const { user, authToken } = await this.loginWithEmailUseCase.execute({ email, password });
        res.status(200).json({ user, authToken });
    }

    public async loginWithSSOGoogle() {
        throw new Error('Not implemented');
    }
    
    
}
