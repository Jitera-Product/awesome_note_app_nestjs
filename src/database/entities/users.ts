import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsOptional, MaxLength, MinLength, IsEmail, IsDate, Min, Max } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Note } from 'entities/notes';

@Entity('users')
export class User {
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

  @IsOptional()
  @Column({ nullable: true, type: 'varchar' })
  @MaxLength(255, { message: i18nValidationMessage('validation.MaxLength') })
  @MinLength(0, { message: i18nValidationMessage('validation.MinLength') })
  fullname: string;

  @Column({ nullable: false, type: 'varchar' })
  @MaxLength(255, { message: i18nValidationMessage('validation.MaxLength') })
  @MinLength(0, { message: i18nValidationMessage('validation.MinLength') })
  encrypted_password: string;

  @Column({ nullable: false, type: 'varchar', unique: true })
  @IsEmail({ message: i18nValidationMessage('validation.IsEmail') })
  @MaxLength(255, { message: i18nValidationMessage('validation.MaxLength') })
  @MinLength(0, { message: i18nValidationMessage('validation.MinLength') })
  email: string;

  @IsOptional()
  @Column({ nullable: true, type: 'varchar', unique: true })
  @MaxLength(23, { message: i18nValidationMessage('validation.MaxLength') })
  reset_password_token: string;

  @IsOptional()
  @Column({ nullable: true, type: 'timestamp' })
  @IsDate({ message: i18nValidationMessage('validation.IsDate') })
  reset_password_sent_at: Date;

  @IsOptional()
  @Column({ nullable: true, type: 'timestamp' })
  @IsDate({ message: i18nValidationMessage('validation.IsDate') })
  remember_created_at: Date;

  @IsOptional()
  @Column({ nullable: true, type: 'timestamp' })
  @IsDate({ message: i18nValidationMessage('validation.IsDate') })
  current_sign_in_at: Date;

  @IsOptional()
  @Column({ nullable: true, type: 'timestamp' })
  @IsDate({ message: i18nValidationMessage('validation.IsDate') })
  last_sign_in_at: Date;

  @IsOptional()
  @Column({ nullable: true, type: 'varchar' })
  @MaxLength(255, { message: i18nValidationMessage('validation.MaxLength') })
  @MinLength(0, { message: i18nValidationMessage('validation.MinLength') })
  current_sign_in_ip: string;

  @IsOptional()
  @Column({ nullable: true, type: 'varchar' })
  @MaxLength(255, { message: i18nValidationMessage('validation.MaxLength') })
  @MinLength(0, { message: i18nValidationMessage('validation.MinLength') })
  last_sign_in_ip: string;

  @Column({ nullable: false, type: 'integer', default: 0 })
  @Min(-2147483647, { message: i18nValidationMessage('validation.Min') })
  @Max(2147483646, { message: i18nValidationMessage('validation.Max') })
  sign_in_count: number = 0;

  @IsOptional()
  @Column({ nullable: true, type: 'varchar' })
  @MaxLength(255, { message: i18nValidationMessage('validation.MaxLength') })
  @MinLength(0, { message: i18nValidationMessage('validation.MinLength') })
  password: string;

  @IsOptional()
  @Column({ nullable: true, type: 'varchar' })
  @MaxLength(255, { message: i18nValidationMessage('validation.MaxLength') })
  @MinLength(0, { message: i18nValidationMessage('validation.MinLength') })
  password_confirmation: string;

  @IsOptional()
  @Column({ nullable: true, type: 'timestamp' })
  @IsDate({ message: i18nValidationMessage('validation.IsDate') })
  locked_at: Date;

  @Column({ nullable: false, type: 'integer', default: 0 })
  @Min(-2147483647, { message: i18nValidationMessage('validation.Min') })
  @Max(2147483646, { message: i18nValidationMessage('validation.Max') })
  failed_attempts: number = 0;

  @IsOptional()
  @Column({ nullable: true, type: 'varchar', unique: true })
  @MaxLength(255, { message: i18nValidationMessage('validation.MaxLength') })
  @MinLength(0, { message: i18nValidationMessage('validation.MinLength') })
  unlock_token: string;

  @IsOptional()
  @Column({ nullable: true, type: 'varchar', unique: true })
  @MaxLength(255, { message: i18nValidationMessage('validation.MaxLength') })
  @MinLength(0, { message: i18nValidationMessage('validation.MinLength') })
  confirmation_token: string;

  @IsOptional()
  @Column({ nullable: true, type: 'varchar', unique: true })
  @MaxLength(255, { message: i18nValidationMessage('validation.MaxLength') })
  @MinLength(0, { message: i18nValidationMessage('validation.MinLength') })
  unconfirmed_email: string;

  @IsOptional()
  @Column({ nullable: true, type: 'timestamp' })
  @IsDate({ message: i18nValidationMessage('validation.IsDate') })
  confirmed_at: Date;

  @IsOptional()
  @Column({ nullable: true, type: 'timestamp' })
  @IsDate({ message: i18nValidationMessage('validation.IsDate') })
  confirmation_sent_at: Date;

  @OneToMany(() => Note, (note) => note.user)
  @JoinColumn({ name: 'user_id' })
  notes: Note[];
}
