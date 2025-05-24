export interface EnvProps {
    hostBack: string
    portBack: string
    supabaseUrl: string
    supabaseKey: string
    jwtSecretKey: string
}

export class EnvConfig {

    public static getEnvVariables(): EnvProps {
        try {
            if (!this.checkEnvVariables()) throw new Error('Error al comprovar les variables d\'entorn')
            const hostBack = import.meta.env.VITE_HOST_BACKEND
            const portBack = import.meta.env.VITE_PORT_BACKEND
            const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
            const jwtSecretKey = import.meta.env.VITE_JWT_SECRET
            const envProps: EnvProps = {
                hostBack: hostBack,
                portBack: portBack,
                supabaseUrl: supabaseUrl,
                supabaseKey: supabaseKey,
                jwtSecretKey: jwtSecretKey
            }
            return envProps
        } catch (err) {
            console.log(err)
            if (err instanceof Error) {
                throw new Error(err.message)
            }
            throw new Error('Error al comprovar les variables d\'entorn')
        }
    }

    private static checkEnvVariables(): boolean {
        if (!import.meta.env.VITE_HOST_BACKEND) throw new Error(`Falta la variable d'entorn HOST_BACKEND`)
        if (!import.meta.env.VITE_PORT_BACKEND) throw new Error(`Falta la variable d'entorn PORT_BACKEND`)
        if (!import.meta.env.VITE_SUPABASE_ANON_KEY) throw new Error(`Falta la variable d'entorn SUPABASE_ANON_KEY`)
        if (!import.meta.env.VITE_SUPABASE_URL) throw new Error(`Falta la variable d'entorn SUPABASE_URL`)
        if (!import.meta.env.VITE_JWT_SECRET) throw new Error(`Falta la variable d'entorn VITE_JWT_SECRET`)
        return true
    }
}