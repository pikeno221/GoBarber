import { getRepository } from 'typeorm';
import path from 'path';

import uploadConfig from '../config/upload';
import User from '../models/User';
import fs from 'fs';
import UserRepository from '../repositories/UserRepository';

interface Request {
    user_id: string,
    avatarFilename: string,

}
class UpdateUserService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) throw new Error('Only authenticated users can change avatar. ');

        if (user.avatar) {

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }


        user.avatar = avatarFilename;

        usersRepository.save(user);

        delete user.password;

        return user;


    }
}

export default UpdateUserService;
