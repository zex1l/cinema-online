import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService : AuthService) {}


    // Register route
    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    @Post('register')
    async registrer(@Body() dto: AuthDto) {
        return this.AuthService.register(dto)
    }
    
    
    // Login route
    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    @Post('login')
    async login (@Body() dto: AuthDto) {
        return this.AuthService.login(dto)
    }


    // Update tokens route
    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    @Post('login/access-token')
    async getNewTokens(@Body() dto : RefreshTokenDto) {
        return this.AuthService.getNewTokens(dto)
    }

}
