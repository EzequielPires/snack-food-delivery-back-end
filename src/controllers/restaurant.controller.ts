import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "src/helper/EditNameFile";
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

    @Put('upload/image/:id')
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: './storage/restaurants',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    uploadImage(@UploadedFile() file: Express.Multer.File, @Param('id', ParseUUIDPipe) id: string) {
        return this.service.uploadImage(file, id);
    }
}