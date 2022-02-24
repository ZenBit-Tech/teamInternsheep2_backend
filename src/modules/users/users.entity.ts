import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity{
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'Bob', description: 'First name' })
  @Column({ type: 'varchar', width: 30 })
  firstName: string;

  @ApiProperty({ example: 'Sponque', description: 'Last name' })
  @Column({ type: 'varchar', width: 30 })
  lastName: string;

  @ApiProperty({ example: 'qwerty@gmail.com', description: 'email' })
  @Column({ type: 'varchar', width: 50, unique: true })
  email: string;

  @ApiProperty({ example: '111111', description: 'password' })
  @Column({ type: 'varchar', width: 50 })
  password: string;

  @ApiProperty({ example: '+380509995263', description: 'Phone number' })
  @Column({
    type: 'varchar',
    length: 13,
    unique: true,
  })
  phoneNumber: string;

  @ApiProperty({ example: 'Freelancer', description: 'userRole' })
  @Column({ type: 'enum', enum: ['Freelancer', 'Employer'] })
  userRole: string;
  static findOne: any;
}