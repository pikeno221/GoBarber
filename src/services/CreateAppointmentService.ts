import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';


interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository

    public async execute({ provider, date }: Request): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(AppointmentRepository);


        const appointmentDate = startOfHour(date);

        if (await appointmentRepository.findByDate(appointmentDate)) {
            throw Error('Another appointment in the same day and hour. ');

        }

        const appointment = appointmentRepository.create({ provider: provider, date: appointmentDate });

        await appointmentRepository.save(appointment);

        return appointment;

    }

}

export default CreateAppointmentService;
