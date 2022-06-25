import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  // itemを保存するための配列変数
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findByID(id: string): Item {
    return this.items.find((item) => item.id === id);
  }

  // 引数も戻り値もItem型
  create(item: Item): Item {
    this.items.push(item);
    return item;
  }
}
