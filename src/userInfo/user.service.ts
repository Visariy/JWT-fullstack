import {Injectable, Inject, HttpException, HttpStatus} from '@nestjs/common';
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUser } from "../dto/createUser.dto";
import { UpdateUser } from "../dto/updateUser.dto";
import { publicUserInfo } from "../dto/publicUser.dto";

@Injectable()
export class UserService {

    constructor(
       @Inject('USER_REPOSITORY')
       private userRepository: Repository<User>,
    ) {}


    async updateUserInfo(id: number, user: UpdateUser): Promise<User> {
        await this.userRepository.update(id, user);
        const updatedUser = await this.userRepository.findOne({ where: { id } });
        if(updatedUser) {
            return updatedUser;
        }
    }

    async deleteUserById(id: number) {
        const deletedUser = await this.userRepository.delete(id);
        if(!deletedUser.affected) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async createUser(user: CreateUser): Promise<User> {
        const newUser = await this.userRepository.create(user);
        await this.userRepository.save(newUser);

        return newUser
    }

    async getUserByMail(email: string): Promise<User> {
        const findedUser = this.userRepository.findOne({where: {email}});
        if(findedUser) {
            return findedUser
        } else {
            throw new HttpException('User with this email not found', HttpStatus.NOT_FOUND);
        }
    }

    async getUserById(id: number): Promise<User> {
        const findedUser: Promise<User> = this.userRepository.findOne({where: {id}})
        if(findedUser) {
           return findedUser
        } else {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async logout(id: number): Promise<void> {
        await this.userRepository.update(id, { refreshToken: null });
    }

    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
}
