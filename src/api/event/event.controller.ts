import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from '@/common/decorators/Role.decorator';
import { Permission } from '../role/enum/permissions.enum';
import { CommonListQueryDto } from '@/common/dtos/pagination.dto';
import { JoinEventDto } from './dto/join-event.dto';

@Controller('event')
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  @Role([Permission.DOCTOR])
  async create(@Body() createEventDto: CreateEventDto, @Req() req: Request) {
    const data = await this.eventService.create(createEventDto, req['user']['userId']);

    return {
      message: 'Event Create Successfully',
      data
    }
  }



  @Post('join')
  @Role([Permission.USER])
  async join_event(@Body() joinEventDto: JoinEventDto, @Req() req: Request) {
    const data = await this.eventService.JoinEvent(joinEventDto, req['user']['userId']);

    return {
      message: 'Event Create Successfully',
      data
    }
  }


  @Get()
  @Role([Permission.DOCTOR])
  findAll(@Query() query: CommonListQueryDto, @Req() req: Request) {
    return this.eventService.findAll(query, req['user']['userId']);
  }

  @Get('public-list')
  findAllPublic(@Query() query: CommonListQueryDto) {
    return this.eventService.findAllPublic(query);
  }

  @Get('public-event/:id')
  findOnePublic(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Get(':id')
  @Role([Permission.DOCTOR])
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  @Role([Permission.DOCTOR])
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  @Role([Permission.DOCTOR])
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
