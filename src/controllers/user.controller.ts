import { Body, Controller, Get, Post } from "@nestjs/common";
import { User } from "src/models/user.entity";
import { UserService } from "src/services/user.service";

@Controller('/users')
export class UserController {
    constructor(private readonly service: UserService) {}
    @Post('new')
    create(@Body() body: User){
        return this.service.create(body);
    }

    @Get('list')
    findUsers() {
        return this.service.findUsers();
    }
}