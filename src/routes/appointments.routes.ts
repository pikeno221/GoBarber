import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();
const createAppointmentService = new CreateAppointmentService(appointmentRepository);

appointmentsRouter.get('/', (request, response) => {
    return response.json(appointmentRepository.findAll());

});

appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const appointment = createAppointmentService.execute({ provider: provider, date: parsedDate });

        return response.json(appointment);

    } catch (err) {
        return response
            .status(400)
            .json({ error: err.message })


    }

});



export default appointmentsRouter;


