import { getCustomRepository, getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface Request {
    email: string,
    password: string,
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<{ user: User }> {

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        if (!user) throw new Error('email or password invalid. ');

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) throw new Error('email or password invalid. ');

        return {
            user,
        }


    }
}
export default AuthenticateUserService;
