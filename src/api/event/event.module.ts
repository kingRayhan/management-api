import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Event } from './entities/event.entity';
import { RoleModule } from '../role/role.module';
import { JoinEvent } from './entities/join-event.entity';

@Module({
  imports: [TypegooseModule.forFeature([Event, JoinEvent]), RoleModule],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
