import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный индетификатор' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'Валерий', description: 'Имя' })
  @Column({ type: 'varchar', width: 30 })
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @Column({ type: 'varchar', width: 30 })
  lastName: string;

  @ApiProperty({ example: 'qwert@gmail.com', description: 'email' })
  @Column({ type: 'varchar', width: 50, unique: true })
  email: string;

  @ApiProperty({ example: '111111', description: 'password' })
  @Column({ type: 'varchar', width: 50 })
  password: string;

  @ApiProperty({ example: '+380509995263', description: 'Номер телефона' })
  @Column({
    type: 'varchar',
    length: 13,
    unique: true,
  })
  phoneNumber: string;

  @ApiProperty({ example: 'Freelancer', description: 'userRole' })
  @Column({ type: 'enum', enum: ['Freelancer', 'Employer'] })
  userRole: string;
}
