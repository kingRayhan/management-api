import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { DoctorApprovedDto } from './dto/doctor-approved.dto';
import { UserService } from '../user/user.service';
import { Permission } from '../role/enum/permissions.enum';
import { Role } from '@/common/decorators/Role.decorator';
import { CommonListQueryDto } from '@/common/dtos/pagination.dto';

@Controller('admins')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly userService: UserService) { }

  // @Post('/register')
  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.create(createAdminDto);
  // }

  @Patch('/approved/doctor/:id')
  @Role([Permission.ADMINISTRATOR])
  approvedDoctor(@Body() dto: DoctorApprovedDto, @Param('id') id: string) {
    return this.userService.updateUserProfile(id, dto)
  }


  @Get('view/doctor-list')
  @Role([Permission.ADMINISTRATOR])
  findAll(@Query() query: CommonListQueryDto) {
    return this.userService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
