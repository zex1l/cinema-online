import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get('profile')
    @Auth()
    async getProfile() {
        return this.userService.byId()
    }
}
