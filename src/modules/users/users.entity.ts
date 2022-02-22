import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  enum UserRole {
    OWNER = "owner",
    FREELANCER = "freelancer",
}

  import {ApiProperty} from "@nestjs/swagger";
  
  import * as bcrypt from 'bcryptjs';
  
  @Entity()
  export class User extends BaseEntity {
    // example:'1', description:'Уникальный индетификатор'
    @ApiProperty()
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;
  
    // example:'Валерий', description:'Имя'
    @ApiProperty()
    @Column({ type: 'varchar', width: 30 })
    firstName: string;

    // example:'Иванов', description:'Фамилия'
    @ApiProperty()
    @Column({ type: 'varchar', width: 30 })
    lastName: string;

    // example:'email@gmail.com', description:'Имейл'
    @ApiProperty()
    @Column({ type: 'varchar', width: 30, unique: true})
    email: string;
  
    // example:'42сверхСекретный', description:'Пароль'
    @ApiProperty()
    @Column({ type: 'varchar', width: 24 })
    password: string;

    // example:'+111 11111111', description:'Мобильный телефон'
    @ApiProperty()
    @Column({ type: 'varchar', width: 30 })
    phoneNumber: string;

    // example:'Фрилансер', description:'РольПользователя'
    @ApiProperty()
    @Column({ type: 'enum', enum: UserRole, })
    userRole: string;
  
    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 24);
    }
  
    async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  }