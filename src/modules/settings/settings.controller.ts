import { Controller, Body, Patch} from '@nestjs/common';
import { SettingsService } from './settings.service';
import {ContactsEditValue} from "../dto/contact.edit.dto"

@Controller('settings')
export class SettingsController {
    constructor(private readonly SettingsService: SettingsService) {}

    @Patch('update-user-contacts')
        update(@Body() formData:ContactsEditValue) {
        return this.SettingsService.updateUserContacts(formData);
    }
}