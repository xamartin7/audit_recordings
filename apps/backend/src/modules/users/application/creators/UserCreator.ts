import { SignupData } from "shared/src/Auth.t";
import { User } from "../../domain/User";

export class UserCreator {
    public static create(data: SignupData): User {
        return new User({
            id: 0,
            created_at: new Date(),
            email: data.email,
            password: data.password,
            name: data.name,
            surname: data.surname,
            second_surname: data.secondSurname,
        });
    }

    public static createFromGoogle(email: string, fullName: string): User {
        return new User({
            id: 0,
            created_at: new Date(),
            email: email,
            password: '',
            name: fullName.split(' ')[0],
            surname: fullName.split(' ')[1],
            second_surname: fullName.split(' ')[2],
        });
    }
}