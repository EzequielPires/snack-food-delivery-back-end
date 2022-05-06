import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/models/category.entity";
import { Restaurant } from "src/models/restaurant.entity";
import { Repository } from "typeorm";

export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant) private repository: Repository<Restaurant>,
        @InjectRepository(Category) private repositoryCategory: Repository<Category>
    ) { }

    async create(body: Restaurant) {
        try {
            const {categories, description, name, phone, type, minimumOrderValue, categoryMain} = body;
            const categoriesArray = await this.repositoryCategory.findByIds(categories);
            const category = await this.repositoryCategory.findOne(categoryMain);
            const restaurant = this.repository.create({
                description,
                name,
                phone,
                type,
                minimumOrderValue,
                categories: categoriesArray,
                categoryMain: category
            });
            return {
                success: true,
                data: await this.repository.save(restaurant)
            }
        } catch (error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async findOne(id: string) {
        try {
            const restaurant = await this.repository.find({
                relations: ['menus', 'menus.items'],
                where: {id}
            });
            return {
                success: true,
                data: restaurant[0]
            }
        } catch (error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async findRestaurants() {
        try {
            const restaurants = await this.repository.find();
            return {
                success: true,
                data: restaurants
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
            const restaurant = await this.repository.findOne(id);
            if(!restaurant) {
                throw new NotFoundException(`Não foi encontrado nenhum item com id ${id}`);
            }
            await this.repository.update({id}, {
                image: `/storage/restaurants/${file.filename}`
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
    async uploadBanner(file: Express.Multer.File, id: string) {
        try {
            const restaurant = await this.repository.findOne(id);
            if(!restaurant) {
                throw new NotFoundException(`Não foi encontrado nenhum item com id ${id}`);
            }
            await this.repository.update({id}, {
                banner: `/storage/restaurants/${file.filename}`
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
}