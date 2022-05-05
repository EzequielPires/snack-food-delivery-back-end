import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Menu {
    @PrimaryGeneratedColumn('uuid')
    code: string;
    
    @Column()
    name: string;

    @OneToMany(() => Item, item => item.menu, {eager: true, onDelete: 'SET NULL'})
    @JoinColumn()
    items: Item[];
}