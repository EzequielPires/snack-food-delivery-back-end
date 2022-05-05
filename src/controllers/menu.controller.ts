import { Body, Controller, Get, Post } from "@nestjs/common";
import { Menu } from "src/models/menu.entity";
import { MenuService } from "src/services/menu.service";

@Controller('menus')
export class MenuController {
    constructor(private readonly service: MenuService) {}
    @Post('new')
    create(@Body() body: Menu){
        return this.service.create(body);
    }

    @Get('list')
    findUsers() {
        return this.service.findAll();
    }
}