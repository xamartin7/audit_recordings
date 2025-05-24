import { User } from "../../domain/User";

export interface IUsersRepository {
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(id: string): Promise<User | null>;
    deleteUser(id: string): Promise<void>;
}
