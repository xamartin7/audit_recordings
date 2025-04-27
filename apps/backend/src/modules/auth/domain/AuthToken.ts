export class AuthToken {
    private token: string;
    private expiresAt: Date;

    public constructor(
        token: string,
        expiresAt: Date
    ) {
        this.token = token;
        this.expiresAt = expiresAt;
    }

    public validate(): boolean {
        return this.expiresAt > new Date();
    }

    public getToken(): string {
        return this.token;
    }
    
    public getExpiresAt(): Date {
        return this.expiresAt;
    }
    
}