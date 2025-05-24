import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { User } from "../../domain/User";
import { EnvConfig } from "../../../../config/EnvConfig";

export class SupabaseUserRepository implements IUsersRepository {
    private client: SupabaseClient;

    // TODO Refactor to use a singleton pattern and Dependency injection
    public constructor() {
        this.client = createClient(EnvConfig.getSUPABASE_URL(), EnvConfig.getSUPABASE_ANON_KEY());
    }

    /**
     * @param user 
     * @throws Error if the user is not created
     * @returns Promise<User>
     */
    public async createUser(user: User): Promise<User> {
        const { data, error } = await this.client
            .from('users')
            .insert({
                // id: user.getId(),
                // created_at: user.getCreatedAt(),
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

    /**
     * @param user 
     * @throws Error if the user is not updated
     * @returns Promise<User>
     */
    public async updateUser(user: User): Promise<User> {
        const { data, error } = await this.client
            .from('users')
            .update({
                email: user.getEmail(),
                password: user.getPassword(), 
                name: user.getName(),
                surname: user.getSurname(),
                second_surname: user.getSecondSurname()
            })
            .eq('id', user.getId())
            .select()
            .single();

        if (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }

        return new User(data);
    }
    
    /**
     * @param email 
     * @returns Promise<User | null>
     */
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

    /**
     * @param id 
     * @returns Promise<User | null>
     */
    public async findUserById(id: string): Promise<User | null> {
        const { data, error } = await this.client
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            return null;
        }

        return new User(data);
    }

    /**
     * @param id
     * @throws Error if the user is not deleted
     */
    public async deleteUser(id: string): Promise<void> {
        const { error } = await this.client
            .from('users')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
}