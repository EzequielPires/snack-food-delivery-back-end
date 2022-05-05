import { Body, Controller, Get, Post } from "@nestjs/common";
import { Item } from "src/models/item.entity";
import { ItemService } from "src/services/item.service";

@Controller('items')
export class ItemController {
    constructor(private readonly service: ItemService) {}

    @Post('new')
    create(@Body() body: Item){
        return this.service.create(body);
    }

    @Get('list')
    findUsers() {
        return this.service.findAll();
    }
}