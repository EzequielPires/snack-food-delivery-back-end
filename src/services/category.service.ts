import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/models/category.entity";
import { Repository } from "typeorm";

export class CategoryService {
    constructor(@InjectRepository(Category) private repository: Repository<Category>) {}

    async create(body: Category) {
        try {
            const category = this.repository.create(body);
            return {
                success: true,
                data: await this.repository.save(category)
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
            const categories = await this.repository.find();
            return {
                success: true,
                data: categories
            }
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }
}