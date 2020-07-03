import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../mddlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.get('/', async (request, response) => {
    const userRepository = getCustomRepository(UserRepository);
    return response.json(await userRepository.find());

});

usersRouter.post('/', async (request, response) => {

    const createUserService = new CreateUserService();

    try {
        const { name, email, password } = request.body;

        const user = await createUserService.execute({ name, email, password });

        delete user.password;

        return response.json(user);

    } catch (err) {
        return response
            .status(400)
            .json({ error: err.message })

    }

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

    try {
        console.log(request.file);
        return response.json({sucesso: true});

    } catch (err) {
        return response
            .status(400)
            .json({ error: err.message })
    }
});



export default usersRouter;


