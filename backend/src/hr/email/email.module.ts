 import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRoot({
  transport: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'advwebtech830@gmail.com',
      pass: 'vgqq karw caqb niko', //advWeb12@45
    },
    tls: {
      rejectUnauthorized: false //this for local testing
    }
  },
  defaults: {
    from: '"No Reply" <advwebtech830@gmail.com>',// to not add the from in sendEmail
  },
  template: {
    dir: __dirname + '/templates',// to have the email templates
    options: {
      strict: true,
    },
  },
}),
  ],
  providers: [EmailService],  // Add this line
  exports: [EmailService],    // Change from MailerModule to EmailService
})
export class EmailModule {}