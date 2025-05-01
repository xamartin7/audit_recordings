import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { AuthRepository } from "../../application/interfaces/AuthRepository";
import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../domain/User";
import jwt from "jsonwebtoken";
import { EnvConfig } from "../../../../config/EnvConfig";


export class SupabaseAuthRepository implements AuthRepository {
    private client: SupabaseClient;

    public constructor() {
        this.client = createClient(EnvConfig.getSUPABASE_URL(), EnvConfig.getSUPABASE_ANON_KEY());
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        const { data, error } = await this.client
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !data) {
            return null;
        }

        return new User(data);
    }

    public async createUser(user: User): Promise<User> {
        const { data, error } = await this.client
            .from('users')
            .insert({
                id: user.getId(),
                created_at: user.getCreatedAt(),
                email: user.getEmail(),
                password: user.getPassword(),
                name: user.getName(),
                surname: user.getSurname(),
                second_surname: user.getSecondSurname()
            })
            .select()
            .single();

        if (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }

        return new User(data);
    }

    public async generateToken(user: User): Promise<AuthToken> {
        const token = jwt.sign(
            { userId: user.getId(), email: user.getEmail() },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        )
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        return new AuthToken(token, expiresAt);
    }

    public async validateGoogleToken(token: string): Promise<User> {
        throw new Error('Not implemented');
    }
    
    public async verifyPassword(email: string, password: string): Promise<boolean> {
        const { data, error } = await this.client
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !data) {
            return false;
        }

        // Compare the provided password with the stored hashed password
        return data.password === password; // Note: In production, use proper password hashing
    }
}