import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entites';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypegooseModule.forFeature([Role]), UserModule],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
