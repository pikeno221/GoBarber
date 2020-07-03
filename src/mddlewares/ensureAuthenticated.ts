import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;

}
export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {

    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError('JWT is missging', 400);

    const [, token] = authHeader.split(' ');

    try {
        const decode = verify(token, AuthConfig.jwt.secret);
        console.log(decode);

        const { sub } = decode as TokenPayload;

        request.user = {
            id: sub,
        }

    } catch (err) {
        throw new AppError('Invalid JWT token', 403);
    }



    next();


}

