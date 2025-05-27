import { User } from "../../src/modules/users/domain/User";
import { LoginWithEmailUseCase } from "../../src/modules/auth/application/use-cases/LoginWithEmailUseCase";
import { SupabaseAuthRepository } from "../../src/modules/auth/infrastructure/supabase/SupabaseAuthReposiroty";
import { AuthRepository } from "../../src/modules/auth/application/interfaces/AuthRepository";
import { AuthToken } from "../../src/modules/auth/domain/AuthToken";


describe("LoginWithEmailUseCase", () => {
    let loginWithEmailUseCase: LoginWithEmailUseCase;
    let mockSupabaseAuthRepository: jest.Mocked<AuthRepository>;

    const mockUser = new User({
        id: "123",
        email: "test@example.com",
        name: "John",
        surname: "Doe",
        second_surname: "",
        created_at: new Date(),
        password: "hashed-password",
    });

    const mockAuthToken = new AuthToken("123", new Date(Date.now() + 1000 * 60 * 60 * 24));

    beforeEach(() => {
        jest.clearAllMocks();

        mockSupabaseAuthRepository = {
            findUserByEmail: jest.fn(),
            createUser: jest.fn(),
            generateToken: jest.fn(),
            validateGoogleToken: jest.fn(),
            verifyPassword: jest.fn(),
            emailExists: jest.fn(),
        } as unknown as jest.Mocked<SupabaseAuthRepository>;

        loginWithEmailUseCase = new LoginWithEmailUseCase(mockSupabaseAuthRepository);
    });

    it("should login with email", async () => {
        // Arrange
        mockSupabaseAuthRepository.findUserByEmail.mockResolvedValue(mockUser);
        mockSupabaseAuthRepository.verifyPassword.mockResolvedValue(true);
        mockSupabaseAuthRepository.generateToken.mockResolvedValue(mockAuthToken);

        // Act
        const result = await loginWithEmailUseCase.execute({ email: mockUser.getEmail(), password: mockUser.getPassword() });

        // Assert
        expect(result).toEqual({user: mockUser, authToken: mockAuthToken});
    });
});
