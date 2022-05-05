import { Body, Controller, Get, Post } from "@nestjs/common";
import { Category } from "src/models/category.entity";
import { CategoryService } from "src/services/category.service";

@Controller('categories')
export class CategoryController {
    constructor(private readonly service: CategoryService) {}
    @Post('new')
    create(@Body() body: Category){
        return this.service.create(body);
    }

    @Get('list')
    findUsers() {
        return this.service.findAll();
    }
}