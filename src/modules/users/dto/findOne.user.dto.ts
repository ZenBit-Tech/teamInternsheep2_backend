import { IsNumberString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class oneUser {
    @ApiProperty({example:'1', description:'Id'})
    @IsNumberString()
    id: number;
}
