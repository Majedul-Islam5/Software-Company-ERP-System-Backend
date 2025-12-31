import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService{
  constructor(private readonly mailerService:MailerService){}

  async sendEmail(to:string,subject:string,text:string){
  //console.log('email details:',{to,subject});
  try{
    const result=await this.mailerService.sendMail({to,subject,text,});
    //console.log('Email sent successfully:', result);
    return result;
  } 
  catch(error){
    console.error('SMTP Error details:',{
      code: error.code,
      response: error.response,
      responseCode: error.responseCode
    });
    throw error;
  }
  
  }
}