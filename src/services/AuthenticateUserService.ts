import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import AuthConfig from '../config/auth';

import User from '../models/User';

interface Request {
    email: string,
    password: string,
}

interface Response {
    user: User,
    token: string
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        if (!user) throw new Error('email or password invalid. ');

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) throw new Error('email or password invalid. ');

        const token = sign({}, AuthConfig.jwt.secret, {
            subject: user.id,
            expiresIn: AuthConfig.jwt.expiresIn,
        });

        return {
            user,
            token,
        };
    }
}
export default AuthenticateUserService;
