import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./menu.entity";

@Entity()
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    details: string;

    @Column()
    price: number;

    @ManyToOne(() => Menu, menu => menu.items, {onDelete: 'SET NULL'})
    menu: Menu;
}