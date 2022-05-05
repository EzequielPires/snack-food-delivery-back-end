import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

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

    @ManyToMany(() => Category, category => category.restaurants, {eager: true})
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => Category, category => category.restaurant, {eager: true})
    @JoinColumn()
    categoryMain: Category;
}