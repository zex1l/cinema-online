import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

    constructor(private readonly AuthService : AuthService) {

    }

    @Post('register')
    async registrer(@Body() dto:any) {
        return this.AuthService.register(dto)
    }   

}
