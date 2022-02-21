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
    @ApiProperty()
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;
  
    @ApiProperty()
    @Column({ type: 'varchar', width: 30 })
    firstName: string;

    @ApiProperty()
    @Column({ type: 'varchar', width: 30 })
    lastName: string;

    @ApiProperty()
    @Column({ type: 'varchar', width: 30, unique: true})
    email: string;
  
    @ApiProperty()
    @Column({ type: 'varchar', width: 24 })
    password: string;

    @ApiProperty()
    @Column({ type: 'varchar', width: 30 })
    phoneNumber: string;

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