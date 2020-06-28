
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {

    public async findByDate(date: Date): Promise<Appointment | null> {
        //return this.appointments.find(appointment => isEqual(date, appointment.date)) || null;

        const findAppointment = await this.findOne();

        return findAppointment || null;
    }
}

export default AppointmentRepository;

