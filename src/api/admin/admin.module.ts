import { Session } from './../session/entities/Session.entity';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { SessionModule } from '../session/session.module';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypegooseModule.forFeature([Admin]), SessionModule, UserModule, RoleModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
