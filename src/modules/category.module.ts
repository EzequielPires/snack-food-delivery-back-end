import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "src/controllers/category.controller";
import { Category } from "src/models/category.entity";
import { CategoryService } from "src/services/category.service";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService]
}) export class CategoryModule {}