import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "src/models/item.entity";
import { Menu } from "src/models/menu.entity";
import { Repository } from "typeorm";
import {NotFoundException} from "@nestjs/common";

export class MenuService {
    constructor(
        @InjectRepository(Menu) private repository: Repository<Menu>,
        @InjectRepository(Item) private repositoryItem: Repository<Item>,
        ) {}
    async create(body: Menu) {
        try {
            const {name, items, restaurant} = body;
            const itemsArray = items ? await this.repositoryItem.findByIds(items) : [];
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
                success: false,
                message: error.message
            }
        }
    }
    async addItem(code: string, item: any) {
        try {
            let menu = await this.repository.findOne({ relations: ['items'], where: {code}});
            await this.repositoryItem.update({id: item}, {
                menu: menu
            })
            return {
                success: true,
                data: await this.repository.findOne({ relations: ['items'], where: {code}})
            }
        } catch(error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
    async removeItem(codeMenu: string, codeItem: any) {
        try {
            await this.repositoryItem.update({id: codeItem}, {
                menu: null
            })
            return {
                success: true,
                data: await this.repository.findOne({ relations: ['items'], where: {code: codeMenu}})
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
    async findAll() {
        try {
            const menu = await this.repository.find({relations: ['items']});
            return {
                success: true,
                data: menu
            }
        } catch(error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}