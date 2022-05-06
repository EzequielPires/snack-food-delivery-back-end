import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Category } from "./category.entity";
import {Menu} from "./menu.entity";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    type: string;

    @Column()
    minimumOrderValue: number;

    @Column({nullable: true, default: null})
    image: string;

    @ManyToMany(() => Category, category => category.restaurants, {eager: true})
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => Category, category => category.restaurant, {eager: true})
    @JoinColumn()
    categoryMain: Category;

    @OneToMany(() => Menu, menu => menu.restaurant, {eager: true})
    @JoinColumn()
    menus: Menu[];
}