import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import UserRepository from '../repositories/UserRepository';
import AppError from '../errors/AppError';


interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    private userRepository: UserRepository

    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);


        if (await userRepository.findByEmail(email)) {
            throw new AppError('Email address  already registered on the system. ', 422);

        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({ name, email, password: hashedPassword });

        await userRepository.save(user);

        return user;

    }

}

export default CreateUserService;
