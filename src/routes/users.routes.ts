import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../mddlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.get('/', async (request, response) => {
    const userRepository = getCustomRepository(UserRepository);
    return response.json(await userRepository.find());

});

usersRouter.post('/', async (request, response) => {

    const createUserService = new CreateUserService();

    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return response.json(user);

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({ user_id: request.user.id, avatarFilename: request.file.filename })

    console.log(request.file);
    return response.json(user);

});



export default usersRouter;


