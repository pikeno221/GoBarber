import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();



usersRouter.get('/', async (request, response) => {
    const userRepository = getCustomRepository(UserRepository);
    return  response.json(await userRepository.find());

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



export default usersRouter;


