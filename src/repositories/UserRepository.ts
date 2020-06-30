
import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {

    /*
    public async findByDate(date: Date): Promise<User | null> {
        //return this.appointments.find(appointment => isEqual(date, appointment.date)) || null;

        const findAppointment = await this.findOne();

        return findAppointment || null;
    }
    */

    public async findByEmail(email: string): Promise<User | null> {

        const findUser = await this.findOne({
            where: {email},
         });

        return findUser || null;

    }
}

export default UserRepository;

