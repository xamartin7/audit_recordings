import dotenv from 'dotenv';
dotenv.config();

export class EnvConfig {
    
    public static getSUPABASE_URL(): string {
        return process.env.SUPABASE_URL!;
    }   

    public static getSUPABASE_ANON_KEY(): string {
        return process.env.SUPABASE_ANON_KEY!;
    }
}

