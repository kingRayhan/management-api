import { Injectable, Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { renderFile } from 'pug';
import * as juice from 'juice';
import { ConfigService } from '@nestjs/config';
import { MailTemplatesEnum } from './enum/mail-templates.enum';

export type MAIL_TEMPLATE = 'base' | 'resetPassword' | 'welcome' | 'OTP';

@Injectable()
export class MailService {
  constructor(private readonly config: ConfigService) { }

  private transport() {
    return createTransport({
      host: 'smtp.mailtrap.io',
      port: '2525',
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'bfa16f1090f69c', // generated ethereal user
        pass: '95cf59f7d0bb24', // generated ethereal password
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    template,
    params: any,
  ) {
    const info = await this.transport().sendMail({
      from: '"Fred Foo 👻" <hpm.noreply@gmail.com>', // sender address
      to,
      subject,
      html: template,
    });

    Logger.log('Message sent: ' + info.messageId, 'MailService/sendMail');
  }


  

  /*
  @OnEvent(EventType.SEND_MAIL)
  listenSendMailEvent(event: SendMailEvent) {
    this.sendMail(event.to, event.subject, event.template, event.params);
  }

  @OnEvent(EventType.OTP_MAIL)
  listenOTPMailEvent(event: OTPMailEvent) {
    this.sendMail(event.to, event.subject, event.template, event.params);
  }*/
}
