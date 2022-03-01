import { Controller, Body, Patch} from '@nestjs/common';
import { SettingsService } from './settings.service';

interface contactsEditValue {
    firstName:string,
    lastName:string,
    email:string,
    phoneNumber:string
}

@Controller('settings')
export class SettingsController {
    constructor(private readonly SettingsService: SettingsService) {}

    @Patch('update-user-contacts')
        update(@Body() formData:contactsEditValue) {
        return this.SettingsService.updateUserContacts(formData);
    }
}