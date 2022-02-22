import { IsNumberString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class oneUser {
    @ApiProperty()
    @IsNumberString()
    id: number;
}