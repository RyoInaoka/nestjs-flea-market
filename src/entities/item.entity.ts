import { ItemStatus } from 'src/items/item-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  // 自動採番カラムのためのデコレーター。自動で連番を振ってくれるよ
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 通常のカラムはColumnデコレーター
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  status: ItemStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
