import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });

        console.log(err);

        return response.status(500).json({
            message: 'Unknown error occorried. ',
        });


    }

})

app.get('/', (request, response) => {
    return response.json({ message: "Hello World; " });
})

app.listen(3333, () => console.log('Server started on port 3333! '));

