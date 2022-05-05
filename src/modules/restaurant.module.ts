import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RestaurantController } from "src/controllers/restaurant.controller";
import { Category } from "src/models/category.entity";
import { Restaurant } from "src/models/restaurant.entity";
import { RestaurantService } from "src/services/restaurant.service";

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant, Category])],
    controllers: [RestaurantController],
    providers: [RestaurantService]
}) export class RestaurantModule {}