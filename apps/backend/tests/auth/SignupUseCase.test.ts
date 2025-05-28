import { SupabaseAuthRepository } from "../../src/modules/auth/infrastructure/supabase/SupabaseAuthReposiroty";
import { SignupUseCase } from "../../src/modules/auth/application/use-cases/SignupUseCase";
import { AuthRepository } from "../../src/modules/auth/application/interfaces/AuthRepository";
import { EmailValidator } from "../../src/modules/auth/application/services/EmailValidator";
import { User } from "../../src/modules/users/domain/User";
import { AuthToken } from "../../src/modules/auth/domain/AuthToken";


describe("SignupUseCase", () => {

    let signupUseCase: SignupUseCase;
    let mockSupabaseAuthRepository: jest.Mocked<AuthRepository>;
    let mockEmailValidator: jest.Mocked<EmailValidator>;
    
    const mockUser = new User({
        id: "",
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
        } as unknown as jest.Mocked<SupabaseAuthRepository>;

        mockEmailValidator = {
            validate: jest.fn(),
        } as unknown as jest.Mocked<EmailValidator>;

        signupUseCase = new SignupUseCase(mockSupabaseAuthRepository, mockEmailValidator);
    })

    it('should signup with email', async () => {
        // Arrange
        mockEmailValidator.validate.mockResolvedValue(false);
        mockSupabaseAuthRepository.createUser.mockResolvedValue(mockUser);
        mockSupabaseAuthRepository.generateToken.mockResolvedValue(mockAuthToken);

        const result = await signupUseCase.execute({
            email: mockUser.getEmail(),
            password: mockUser.getPassword(),
            name: mockUser.getName(),
            surname: mockUser.getSurname(),
            secondSurname: mockUser.getSecondSurname(),
            repeatPassword: mockUser.getPassword(),
        });

        expect(result).toEqual({user: mockUser, authToken: mockAuthToken});
        expect(mockEmailValidator.validate).toHaveBeenCalledWith(mockUser.getEmail());
        expect(mockSupabaseAuthRepository.createUser).toHaveBeenCalledWith(
            expect.objectContaining({
                email: mockUser.getEmail(),
                name: mockUser.getName(),
                surname: mockUser.getSurname(),
                second_surname: mockUser.getSecondSurname(),
                created_at: expect.any(Date),
                password: mockUser.getPassword(),
            })
        );
        expect(mockSupabaseAuthRepository.generateToken).toHaveBeenCalledWith(mockUser);
    })

    it('should throw error when email already exists', async () => {
        // Arrange
        mockEmailValidator.validate.mockResolvedValue(true);

        // Act & Assert
        await expect(signupUseCase.execute({
            email: mockUser.getEmail(),
            password: mockUser.getPassword(),
            name: mockUser.getName(),
            surname: mockUser.getSurname(),
            secondSurname: mockUser.getSecondSurname(),
            repeatPassword: mockUser.getPassword(),
        })).rejects.toThrow('El email ya está en uso');

        expect(mockEmailValidator.validate).toHaveBeenCalledWith(mockUser.getEmail());
        expect(mockSupabaseAuthRepository.createUser).not.toHaveBeenCalled();
        expect(mockSupabaseAuthRepository.generateToken).not.toHaveBeenCalled();
    })

})
