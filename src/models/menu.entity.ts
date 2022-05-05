import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Item, (item) => item.menu, { onDelete: 'SET NULL' })
  items: Item[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;
}
