import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "src/models/item.entity";
import { Menu } from "src/models/menu.entity";
import { Repository } from "typeorm";

export class MenuService {
    constructor(
        @InjectRepository(Menu) private repository: Repository<Menu>,
        @InjectRepository(Item) private repositoryItem: Repository<Item>,
        ) {}
    async create(body: Menu) {
        try {
            console.log(body);
            const {name, items, restaurant} = body;
            const itemsArray = await this.repositoryItem.findByIds(items);
            const menu = this.repository.create({
                name,
                items: itemsArray,
                restaurant
            });
            return {
                success: true,
                data: await this.repository.save(menu)
            }
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }
    async findAll() {
        try {
            const menu = await this.repository.find();
            return {
                success: true,
                data: menu
            }
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }
}