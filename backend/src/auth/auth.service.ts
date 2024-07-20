import {Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel) private readonly userModel : ModelType<UserModel>
    ) {}

    async register(dto:any) :Promise<UserModel> {
        
        const newUser = new this.userModel(dto)

        return newUser.save()
    }
}
