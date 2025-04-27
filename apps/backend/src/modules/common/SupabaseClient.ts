import { createClient } from "@supabase/supabase-js";

export class SupabaseClient {
    private static supabase: SupabaseClient;

    private constructor() {}

    public static getInstance(): SupabaseClient {
        if (!this.supabase) {
            this.supabase = createClient(
                process?.env?.SUPABASE_URL ?? '',
                process?.env?.SUPABASE_ANON_KEY ?? ''
            );
        }
        return this.supabase;
    }
}
