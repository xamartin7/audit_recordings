import { UserDTO } from "shared/src/Auth.t";


export class User {
    private id: string;
    private created_at: Date;
    private email: string;
    private password: string;
    private name: string;
    private surname: string;
    private second_surname: string;

    /*constructor(id: string, created_at: Date, email: string, password: string, name: string, surname: string, second_surname: string) {
        this.id = id;
        this.created_at = created_at;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.second_surname = second_surname;
    }*/

    public constructor(user: UserDTO) {
        this.id = user.id;
        this.created_at = user.created_at;
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.surname = user.surname;
        this.second_surname = user.second_surname;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getCreatedAt(): Date {
        return this.created_at;
    }

    public setCreatedAt(created_at: Date): void {
        this.created_at = created_at;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getSurname(): string {
        return this.surname;
    }

    public setSurname(surname: string): void {
        this.surname = surname;
    }

    public getSecondSurname(): string {
        return this.second_surname;
    }

    public setSecondSurname(second_surname: string): void {
        this.second_surname = second_surname;
    }
}