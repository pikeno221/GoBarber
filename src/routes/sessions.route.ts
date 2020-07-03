import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();



sessionsRouter.get('/', async (request, response) => {

    return response.json('message: "Hello"');

});

sessionsRouter.post('/', async (request, response) => {

    try {

        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });

    } catch (err) {
        return response
            .status(err.code)
            .json({ error: err.message })

    }

});



export default sessionsRouter;


