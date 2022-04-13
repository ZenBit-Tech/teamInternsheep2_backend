import { Controller, Body, Patch, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { ContactsEditValue } from '../dto/contact.edit.dto';
import { JwtAuthGuard } from "../auth/jwt.auth.guard";

@Controller('settings')
export class SettingsController {
  constructor(private readonly SettingsService: SettingsService) {}

  @Patch('update-user-contacts')
  @UseGuards(JwtAuthGuard)
  update(@Body() formData: ContactsEditValue) {
    return this.SettingsService.updateUserContacts(formData);
  }
}
