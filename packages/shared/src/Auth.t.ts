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

export interface JWTDecodedToken {
    email: string;
    exp: number;
    phone: string;
    full_name: string;
    avatar_url: string;
    session_id: string;
}
