import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';


interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository

    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(AppointmentRepository);


        const appointmentDate = startOfHour(date);

        if (await appointmentRepository.findByDate(appointmentDate)) {
            throw new AppError('Another appointment in the same day and hour. ');

        }

        const appointment = appointmentRepository.create({ provider_id: provider_id, date: appointmentDate });

        await appointmentRepository.save(appointment);

        return appointment;

    }

}

export default CreateAppointmentService;
