import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { SessionService } from '../session/session.service';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
export class AdminService {

  constructor(
    @InjectModel(Admin)
    private readonly model: ReturnModelType<typeof Admin>,
    private readonly sessionService: SessionService
  ) { }
  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.model.create(createAdminDto);
    return {
      message: 'Admin Create Successfully',
      admin
    };
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
