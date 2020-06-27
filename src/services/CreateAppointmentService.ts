import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';


interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository
    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    public execute({ provider, date }: Request): Appointment {

        const appointmentDate = startOfHour(date);

        if (this.appointmentRepository.findByDate(appointmentDate)) {
            throw Error('Another appointment in the same day and hour. ');

        }

        return this.appointmentRepository.create({ provider, date });


    }
}

export default CreateAppointmentService;
