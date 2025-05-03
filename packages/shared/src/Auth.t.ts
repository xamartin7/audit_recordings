export interface UserDTO {
    id: string;
    created_at: Date;
    email: string;
    password: string;
    name: string;
    surname: string;
    second_surname: string;
}

export interface SignupData {
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
    surname: string;
    secondSurname: string;
}