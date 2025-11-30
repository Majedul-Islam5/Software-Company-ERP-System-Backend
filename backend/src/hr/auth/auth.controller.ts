import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { userInformation } from '../userInfo.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    /*@Post('login')
    login(@Body() data:userInformation){
        return this.authService.login(data);
    }*/

    @Get("show")
    @UseGuards(AuthGuard)
    printData():object{
        return this.authService.printData();
    }
}
