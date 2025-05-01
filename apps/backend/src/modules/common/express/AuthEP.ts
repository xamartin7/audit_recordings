import { Express, Request, Response } from "express";
import { EmailLoginStrategy } from "../../auth/application/strategies/EmailLoginStrategy";
import { LoginWithEmailUseCase } from "../../auth/application/use-cases/LoginWithEmailUseCase";
import { LoginWithGoogleUseCase } from "../../auth/application/use-cases/LoginWithGoogleUseCase";
import { AuthController } from "../../auth/infrastructure/controllers/Auth.controller";

export const setupAuthEP = (app: Express) => {
    const authController = new AuthController(new LoginWithEmailUseCase(new EmailLoginStrategy()), new LoginWithGoogleUseCase());

    app.post('/login', (req: Request, res: Response) => { authController.loginWithEmail(req, res); });
}