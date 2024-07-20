import {BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
import { AuthDto } from './dto/auth.dto';
import { hash, genSalt, compare } from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel) private readonly userModel : ModelType<UserModel>
    ) {}


    // Login point
    async login(dto:AuthDto) :Promise<UserModel> {
        return await this.validateUser(dto)
    }


    // Register point
    async register(dto:AuthDto) :Promise<UserModel> {
        const oldUser = await this.userModel.findOne({email: dto.email})
        if(oldUser) throw new BadRequestException('User with this email already exsisted')
        
            
        const salt = await genSalt(10)

        const newUser = new this.userModel({
            email: dto.email,
            password: await hash(dto.password, salt)
        })

        return newUser.save()
    }

    // Validate login point
    async validateUser(dto: AuthDto): Promise<UserModel> {

        const user = await this.userModel.findOne({email: dto.email})
        if(!user) throw new UnauthorizedException('User with this email not found')


        const isValidPassword = await compare(dto.password, user.password)
        if(!isValidPassword) throw new UnauthorizedException('Email or password is not valid')

        return user
    }
}
