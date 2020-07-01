import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

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

        const token = sign({}, '9d42cdfb23d59ad9cfa4545ee63629f0', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        };
    }
}
export default AuthenticateUserService;
