import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailTemplatesEnum } from './enum/mail-templates.enum';
import { MailService } from './mail.service';


@Controller('mail')
@ApiTags('Mail')
export class MailController {
  constructor(private mail: MailService) {}

  // @Get('ping')
  // testMail() {
  //   this.mail.sendMail('rayhan095@gmail.com', 'Test Mail', MailTemplatesEnum.OTP, {});
  // }
}
