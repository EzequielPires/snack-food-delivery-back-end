import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "src/helper/EditNameFile";
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

    @Put('upload/image/:id')
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: './storage/items',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    uploadImage(@UploadedFile() file: Express.Multer.File, @Param('id', ParseUUIDPipe) id: string) {
        return this.service.uploadImage(file, id);
    }
}