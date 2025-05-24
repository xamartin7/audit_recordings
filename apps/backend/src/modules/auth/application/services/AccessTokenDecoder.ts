import { JWTDecodedToken } from "shared/src/Auth.t";
import jwt from 'jsonwebtoken';

export class AccessTokenDecoder {
    public static decode(token: string): JWTDecodedToken {
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;
        if (!decodedToken) {
            throw new Error('Invalid token');
        }
        return {
            email: decodedToken.email,
            exp: decodedToken.exp ?? 0,
            phone: decodedToken.user_metadata.phone,
            full_name: decodedToken.user_metadata.full_name,
            avatar_url: decodedToken.user_metadata.avatar_url,
            session_id: decodedToken.session_id
        }
    }
}
