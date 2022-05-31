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
      host: this.config.get('SMTP_HOST'),
      port: this.config.get('SMTP_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.config.get('SMTP_USER'), // generated ethereal user
        pass: this.config.get('SMTP_PASSWORD'), // generated ethereal password
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

  async sendOTP(
    to: string,
    subject: string,
    template: MailTemplatesEnum,
    params: any,
  ) {
    const info = await this.transport().sendMail({
      from: '"Fred Foo 👻" <newsrme.noreply@gmail.com>', // sender address
      to,
      subject,
      html: this.generateHTML(template, params),
    });

    Logger.log('Message sent: ' + info.messageId, 'MailService/sendMail');
  }

  async generateHTML(template: MailTemplatesEnum, params = {}) {
    console.log(`${process.cwd()}/mail-templates/welcome.pug`);

    var html = renderFile(`${process.cwd()}/mail-templates/welcome.pug`, params);

    return juice(html)
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
