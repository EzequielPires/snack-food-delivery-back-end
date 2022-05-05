import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import { Menu } from "src/models/menu.entity";
import { MenuService } from "src/services/menu.service";

@Controller('menus')
export class MenuController {
    constructor(private readonly service: MenuService) {}
    @Post('new')
    create(@Body() body: Menu){
        return this.service.create(body);
    }

    @Put('add-item/:id')
    addItem(@Param('id') id: string, @Body() body) {
        return this.service.addItem(id, body.items);
    }


    @Get('list')
    findUsers() {
        return this.service.findAll();
    }
}