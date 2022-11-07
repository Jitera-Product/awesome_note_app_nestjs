import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteService } from './notes.service';
import { NoteController } from './notes.controller';
import { Note } from 'entities/notes';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {}
