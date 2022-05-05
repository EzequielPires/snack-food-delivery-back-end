import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/user.entity";
import { Repository } from "typeorm";

export class UserService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    async create(body: User) {
        try {
            const user = this.repository.create(body);
            return {
                success: true,
                data: await this.repository.save(user)
            }
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }
    async findUsers() {
        try {
            const users = await this.repository.find();
            return {
                success: true,
                data: users
            }
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }
}