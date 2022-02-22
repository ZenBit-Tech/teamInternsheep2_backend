import {ApiProperty} from "@nestjs/swagger";

export class SigninFormDataDto {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;
}