import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuController } from "src/controllers/menu.controller";
import { Item } from "src/models/item.entity";
import { Menu } from "src/models/menu.entity";
import { MenuService } from "src/services/menu.service";

@Module({
    imports: [TypeOrmModule.forFeature([Menu, Item])],
    controllers: [MenuController],
    providers: [MenuService]
}) export class MenuModule {}