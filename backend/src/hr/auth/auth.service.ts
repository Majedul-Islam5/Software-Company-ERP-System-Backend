import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userInformation } from '../userInfo.dto';

@Injectable()
export class AuthService {

    constructor(private jwtService:JwtService){}

    /*async login( data:userInformation): Promise<{ access_token: string }> {
        const infoUser = await user.find((val)=>val.userName===data.userName);
        if (!infoUser) {
            throw new UnauthorizedException();
        }
        const payload = infoUser;
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }*/


    printData():object{
        return {message:"it is working"};
    }

}
