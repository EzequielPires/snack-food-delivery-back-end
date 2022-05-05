import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "src/models/item.entity";
import { Repository } from "typeorm";

export class ItemService {
    constructor(@InjectRepository(Item) private repository: Repository<Item>) { }

    async create(body: Item) {
        try {
            const item = this.repository.create(body);
            return {
                success: true,
                data: await this.repository.save(item)
            }
        } catch (error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }
    async findAll() {
        try {
            const items = await this.repository.find();
            return {
                success: true,
                data: items
            }
        } catch (error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }
}