import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Session } from './entities/Session.entity';

import { SessionService } from './session.service';

@Module({
  imports: [TypegooseModule.forFeature([Session])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
