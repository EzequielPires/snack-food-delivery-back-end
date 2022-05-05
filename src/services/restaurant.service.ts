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
}