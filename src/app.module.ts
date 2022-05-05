import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './controllers/item.controller';
import { CategoryModule } from './modules/category.module';
import { ItemModule } from './modules/item.module';
import { MenuModule } from './modules/menu.module';
import { RestaurantModule } from './modules/restaurant.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    RestaurantModule,
    CategoryModule,
    MenuModule,
    ItemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
