import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './entities/user.entity';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [TypegooseModule.forFeature([User]), SessionModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
