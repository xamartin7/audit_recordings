import { User } from "../../src/modules/users/domain/User";
import { AuthRepository } from "../../src/modules/auth/application/interfaces/AuthRepository";
import { LoginWithGoogleUseCase } from "../../src/modules/auth/application/use-cases/LoginWithGoogleUseCase";
import { SupabaseAuthRepository } from "../../src/modules/auth/infrastructure/supabase/SupabaseAuthReposiroty";
import { CreateUserUseCase } from "../../src/modules/users/application/use-cases/CreateUserUseCase";
import { AuthToken } from "../../src/modules/auth/domain/AuthToken";

describe('LoginWithSSOGoogleUseCase', () => {
    let loginWithSSOGoogleUseCase: LoginWithGoogleUseCase;
    let mockSupabaseAuthRepository: jest.Mocked<AuthRepository>;
    let mockCreateUserUseCase: jest.Mocked<CreateUserUseCase>;

    const mockUser = new User({
        id: "",
        email: "xavimartinalonso@gmail.com",
        name: "Xavi",
        surname: "Martín",
        second_surname: "Alonso",
        created_at: new Date(),
        password: "hashed-password",
    })

    const mockAuthToken = new AuthToken("123", new Date(Date.now() + 1000 * 60 * 60 * 24));
    const mockToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6IlFqSktVR1JLbWFIS3YwQUIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3JsdmZmZ3hma3d0aXRwZ3podmRoLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIxYmQzZmQ5Zi1hNTMyLTQ1MjktODA5YS0xN2E3YjU1ZWEwMTciLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ4MDc5NTU3LCJpYXQiOjE3NDgwNzU5NTcsImVtYWlsIjoieGF2aW1hcnRpbmFsb25zb0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0t4MW1oMzdHR1F6ZHN5aElBb0daYmVrSmRkeFlKTExULU1VRnFlUzVqZDhlVm91QT1zOTYtYyIsImVtYWlsIjoieGF2aW1hcnRpbmFsb25zb0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZnVsbF9uYW1lIjoieGF2aSBtYXJ0aW4iLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoieGF2aSBtYXJ0aW4iLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLeDFtaDM3R0dRemRzeWhJQW9HWmJla0pkZHhZSkxMVC1NVUZxZVM1amQ4ZVZvdUE9czk2LWMiLCJwcm92aWRlcl9pZCI6IjExNzgwOTE3MzQ1MTcwODQ0OTQ3MCIsInN1YiI6IjExNzgwOTE3MzQ1MTcwODQ0OTQ3MCJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNzQ4MDc1OTU3fV0sInNlc3Npb25faWQiOiI1MDM3ZTE4MC02NDllLTQxNDctOGFlZC1hYjA3YmQ0ZTA4MTAiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.rCm0GKGdfdyUboMtVGV3UjEaSh8ero6kb1tEyPvbeNQ"

    beforeEach(() => {
        jest.clearAllMocks()

        mockSupabaseAuthRepository = {
            findUserByEmail: jest.fn(),
            createUser: jest.fn(),
            generateToken: jest.fn(),
            validateGoogleToken: jest.fn(),
            verifyPassword: jest.fn(),
        } as unknown as jest.Mocked<SupabaseAuthRepository>;

        mockCreateUserUseCase = {
            createUser: jest.fn(),
        } as unknown as jest.Mocked<CreateUserUseCase>;

        loginWithSSOGoogleUseCase = new LoginWithGoogleUseCase(mockSupabaseAuthRepository, mockCreateUserUseCase);
    })

    it('Should be logged with sso google', async () => {
        // Arrange
        mockSupabaseAuthRepository.findUserByEmail.mockResolvedValue(mockUser);
        mockSupabaseAuthRepository.generateToken.mockResolvedValue(mockAuthToken);

        // Act
        const result = await loginWithSSOGoogleUseCase.login(mockToken);

        // Assert
        expect(result).toEqual({user: mockUser, authToken: mockAuthToken});
        expect(mockSupabaseAuthRepository.findUserByEmail).toHaveBeenCalledWith(mockUser.getEmail());
        expect(mockSupabaseAuthRepository.generateToken).toHaveBeenCalledWith(mockUser);
    })
        
})
