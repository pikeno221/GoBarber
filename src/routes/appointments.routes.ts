import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated  from '../mddlewares/ensureAuthenticated';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    console.log(request.user);
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    return  response.json(await appointmentRepository.find());

});

appointmentsRouter.post('/', async (request, response) => {

    const createAppointmentService = new CreateAppointmentService();

    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const appointment = await createAppointmentService.execute({ provider_id: provider_id, date: parsedDate });

        return response.json(appointment);

    } catch (err) {
        return response
            .status(400)
            .json({ error: err.message })

    }

});



export default appointmentsRouter;


