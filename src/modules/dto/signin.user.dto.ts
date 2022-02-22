import {ApiProperty} from "@nestjs/swagger";

//User signIn dto
export class SigninFormDataDto {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;
}