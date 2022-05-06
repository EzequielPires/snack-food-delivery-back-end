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
    
    @Column({nullable: true, default: null})
    image: string;

    @ManyToOne(() => Menu, menu => menu.items, {cascade: true,
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'})
    menu: Menu;
}