import {
    BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
  
  enum UserRole {
    OWNER = "owner",
    FREELANCER = "freelancer",
}

  import {ApiProperty} from "@nestjs/swagger";

  @Entity()
  export class User extends BaseEntity {
    @ApiProperty({example:'1', description:'Уникальный индетификатор'})
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;
  
    @ApiProperty({example:'Валерий', description:'Имя'})
    @Column({ type: 'varchar', width: 30 })
    firstName: string;

    @ApiProperty({example:'Иванов', description:'Фамилия'})
    @Column({ type: 'varchar', width: 30 })
    lastName: string;

    @ApiProperty({ example:'email@gmail.com', description:'Имейл'})
    @Column({ type: 'varchar', width: 30, unique: true})
    email: string;

    @ApiProperty({example:'42Секрет', description:'Пароль'})
    @Column({ type: 'varchar', width: 24 })
    password: string;


    @ApiProperty({example:'+111 11111111', description:'Мобильный телефон'})
    @Column({ type: 'varchar', width: 30 })
    phoneNumber: string;


    @ApiProperty({example:'Фрилансер', description:'РольПользователя'})
    @Column({ type: 'enum', enum: UserRole, })
    userRole: string;
  }