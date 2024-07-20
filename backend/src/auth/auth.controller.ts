import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService : AuthService) {}



    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    @Post('register')
    async registrer(@Body() dto: AuthDto) {
        return this.AuthService.register(dto)
    }
    
    
    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    @Post('login')
    async login (@Body() dto: AuthDto) {
        return this.AuthService.login(dto)
    }

}
