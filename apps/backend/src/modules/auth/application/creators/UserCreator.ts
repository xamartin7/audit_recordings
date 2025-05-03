import { SignupData } from "shared/src/Auth.t";
import { User } from "../../domain/User";

export class UserCreator {
    public static create(data: SignupData): User {
        return new User({
            id: '',
            created_at: new Date(),
            email: data.email,
            password: data.password,
            name: data.name,
            surname: data.surname,
            second_surname: data.secondSurname,
        });
    }
}