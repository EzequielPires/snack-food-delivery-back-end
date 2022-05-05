import { Body, Controller, Get, Post } from "@nestjs/common";
import { Restaurant } from "src/models/restaurant.entity";
import { RestaurantService } from "src/services/restaurant.service";

@Controller('restaurants')
export class RestaurantController {
    constructor(private readonly service: RestaurantService) {}
    @Post('new')
    create(@Body() body: Restaurant){
        return this.service.create(body);
    }

    @Get('list')
    findUsers() {
        return this.service.findRestaurants();
    }
}