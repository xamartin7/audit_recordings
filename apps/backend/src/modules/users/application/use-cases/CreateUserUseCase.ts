import { User } from "../../domain/User";
import { IUsersRepository } from "../../infrastructure/interfaces/IUsersRepository";

export class CreateUserUseCase {
    private usersRepository: IUsersRepository;

    public constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    public async createUser(user: User): Promise<User> {
        return this.usersRepository.createUser(user);
    }
}
