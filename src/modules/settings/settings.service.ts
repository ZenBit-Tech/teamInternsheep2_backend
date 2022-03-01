import { Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import {getConnection} from 'typeorm';

@Injectable()
export class SettingsService {
    async updateUserContacts(formData):Promise<string> {
          try {
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    firstName:formData.firstName,
                    lastName:formData.lastName,
                    phoneNumber:formData.phoneNumber
                })
                .where({email: formData.email})
                .execute(); 
            return "Contacts has been updated."
          } catch (error) {
              return error
          }
    }
}
