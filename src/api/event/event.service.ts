import DatabaseRepository from '@/common/database/database-repo';
import { CommonListQueryDto } from '@/common/dtos/pagination.dto';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateEventDto } from './dto/create-event.dto';
import { JoinEventDto } from './dto/join-event.dto';
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

  async JoinEvent(joinEventDto: JoinEventDto, user_id: string) {
    return await this.model.create({...joinEventDto, ...{user: user_id}})
  }

  findAll(query: CommonListQueryDto, id: string) {
    return this.databaseRepository.getObjectList(query,{
      user: id
    },{
      path: 'user',
      select: '-password -permissions -is_verified'
    });
  }

  findAllPublic(query: CommonListQueryDto) {
    return this.databaseRepository.getObjectListPublic(query,{
      path: 'user',
      select: '-password -permissions -is_verified'
    });
  }

  joinRequest(){
    return

  }

  findOne(id: string) {
    return this.databaseRepository.getObject({_id: id},{
      path: 'user',
      select: '-password -permissions -is_verified'
    });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.databaseRepository.updateObject({id}, updateEventDto);
  }

  remove(id: string) {
    return this.databaseRepository.deleteObject({id});
  }
}
