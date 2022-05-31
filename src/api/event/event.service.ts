import DatabaseRepository from '@/common/database/database-repo';
import { CommonListQueryDto } from '@/common/dtos/pagination.dto';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { MailTemplatesEnum } from '../mail/enum/mail-templates.enum';
import { MailService } from '../mail/mail.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JoinEventDto } from './dto/join-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { JoinEvent } from './entities/join-event.entity';

@Injectable()
export class EventService {

  private databaseRepository: DatabaseRepository<Event>;

  constructor(
    @InjectModel(Event)
    private readonly model: ReturnModelType<typeof Event>,
    @InjectModel(JoinEvent)
    private readonly modelJoin: ReturnModelType<typeof JoinEvent>, private mailService: MailService
  ) {
    this.databaseRepository = new DatabaseRepository<Event>(this.model);
  }

  async create(createEventDto: CreateEventDto, user_id: string) {
    const event = await this.model.create({ ...createEventDto, ...{ user: user_id } })
    if (event) {
      const event_request = await this.modelJoin.find({ type: event.type })
      if (event_request.length) {
        event_request.forEach(join => {
          // send mail
          setTimeout(() => {
            const messgae = `Welcome ${join.first_name}, your joining requeste accepted. Issue Type: ${join.type}`
            this.mailService.sendMail(join.email, 'Join Request Accepted', messgae, join.first_name)
          }, 200);
        })
        return {
          message: 'Event Create Success'
        }
      }
    }
  }

  async JoinEvent(joinEventDto: JoinEventDto) {
    const event_request = await this.modelJoin.create(joinEventDto)

    if (event_request) {
      const event = await this.model.find({ type: event_request.type })

      if (event) {
        // send mail
        const messgae = `Welcome ${event_request.first_name}, your joining requeste accepted. Issue Type: ${event_request.type}`
        this.mailService.sendMail(event_request.email, 'Join Request Accepted', messgae, event_request.first_name)

        return {
          message: "Join Request Accepted"
        }
      }
    }


  }

  findAll(query: CommonListQueryDto, id: string) {
    return this.databaseRepository.getObjectList(query, {
      user: id
    }, {
      path: 'user',
      select: '-password -permissions -is_verified'
    });
  }

  findAllPublic(query: CommonListQueryDto) {
    return this.databaseRepository.getObjectListPublic(query, {
      path: 'user',
      select: '-password -permissions -is_verified'
    });
  }

  joinRequest() {
    return

  }

  findOne(id: string) {
    return this.databaseRepository.getObject({ _id: id }, {
      path: 'user',
      select: '-password -permissions -is_verified'
    });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.databaseRepository.updateObject({ id }, updateEventDto);
  }

  remove(id: string) {
    return this.databaseRepository.deleteObject({ id });
  }
}
