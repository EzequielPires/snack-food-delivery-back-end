import { NotFoundException } from "@nestjs/common";
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

    async uploadImage(file: Express.Multer.File, id: string) {
        try {
            const item = await this.repository.findOne(id);
            if(!item) {
                throw new NotFoundException(`Não foi encontrado nenhum item com id ${id}`);
            }
            await this.repository.update({id}, {
                image: `/storage/items/${file.filename}`
            })
            return {
                success: true,
                data: await this.repository.findOne(id)
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