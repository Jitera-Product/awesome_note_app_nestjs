import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'entities/users';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  @Column({ type: 'integer', primary: true })
  id: number;

  @IsOptional()
  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @IsOptional()
  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: false, type: 'varchar' })
  @MaxLength(255, { message: i18nValidationMessage('validation.MaxLength') })
  @MinLength(0, { message: i18nValidationMessage('validation.MinLength') })
  content: string;

  @Column({ nullable: false, type: 'integer', default: 0 })
  user_id: number = 0;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
