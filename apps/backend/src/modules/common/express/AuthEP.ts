import { Express, Request, Response } from "express";
import { LoginWithEmailUseCase } from "../../auth/application/use-cases/LoginWithEmailUseCase";
import { LoginWithGoogleUseCase } from "../../auth/application/use-cases/LoginWithGoogleUseCase";
import { AuthController } from "../../auth/infrastructure/controllers/Auth.controller";
import { SupabaseAuthRepository } from "../../auth/infrastructure/supabase/SupabaseAuthReposiroty";
import { SignupUseCase } from "../../auth/application/use-cases/SignupUseCase";
import { EmailValidator } from "../../auth/application/services/EmailValidator";

export const setupAuthEP = (app: Express) => {
    const authController = new AuthController(
        new LoginWithEmailUseCase(new SupabaseAuthRepository()),
        new LoginWithGoogleUseCase(new SupabaseAuthRepository()),
        new SignupUseCase(new SupabaseAuthRepository(), new EmailValidator(new SupabaseAuthRepository()))
    );

    app.post('/auth/login', (req: Request, res: Response) => { authController.loginWithEmail(req, res); });
    app.post('/auth/signup', (req: Request, res: Response) => { authController.signup(req, res); });
    app.post('/auth/google', (req: Request, res: Response) => { authController.loginWithSSOGoogle(req, res); });
};
