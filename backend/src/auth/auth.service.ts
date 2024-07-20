import {BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
import { AuthDto } from './dto/auth.dto';
import { hash, genSalt, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel) private readonly userModel : ModelType<UserModel>,
        private readonly jwtService: JwtService
    ) {}


    // Login point
    async login(dto:AuthDto)  {
        const user = await this.validateUser(dto)

        const tokens = await this.issueTokenPair(String(user._id))

        return {
            user: this.returnUserFileds(user),
            ...tokens
        }
    }


    // Register point
    async register(dto:AuthDto) {
        const oldUser = await this.userModel.findOne({email: dto.email})
        if(oldUser) throw new BadRequestException('User with this email already exsisted')
        

        const salt = await genSalt(10)

        const newUser = new this.userModel({
            email: dto.email,
            password: await hash(dto.password, salt)
        })

        const tokens = await this.issueTokenPair(String(newUser._id))

        return {
            user: this.returnUserFileds(newUser),
            ...tokens
        }
    }

    // Validate login point
    async validateUser(dto: AuthDto): Promise<UserModel> {

        const user = await this.userModel.findOne({email: dto.email})
        if(!user) throw new UnauthorizedException('User with this email not found')


        const isValidPassword = await compare(dto.password, user.password)
        if(!isValidPassword) throw new UnauthorizedException('Email or password is not valid')

        return user
    }


    // Generate Token Pair
    async issueTokenPair(userId:string) {
        const data = {_id: userId}

        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '15d'
        })

        const accesToken = await this.jwtService.signAsync(data, {
            expiresIn: '1h'
        })

        return {refreshToken, accesToken}
    }

    returnUserFileds(user : UserModel) {
        return {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        }
    }

}
