import DatabaseRepository from '@/common/database/database-repo';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {

  private databaseRepository: DatabaseRepository<Event>;

  constructor(
    @InjectModel(Event)
    private readonly model: ReturnModelType<typeof Event>,
  ) {
    this.databaseRepository = new DatabaseRepository<Event>(this.model);
  }

  async create(createEventDto: CreateEventDto, user_id: string) {
    return await this.model.create({...createEventDto, ...{user: user_id}})
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
