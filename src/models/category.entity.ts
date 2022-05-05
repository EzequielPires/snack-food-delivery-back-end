import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('increment')
    code: number;

    @Column()
    name: string;

    @ManyToMany(() => Restaurant, restaurant => restaurant.categories)
    restaurants: Restaurant[];

    @OneToMany(() => Restaurant, restaurant => restaurant.categoryMain)
    restaurant: Restaurant[];
}