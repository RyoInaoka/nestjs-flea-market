import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
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

  create(createItemDto: CreateItemDto): Item {
    const item: Item = {
      ...createItemDto,
      status: ItemStatus.ON_SALE,
    };
    this.items.push(item);
    return item;
  }

  updateStatus(id: string): Item {
    const item = this.findByID(id);
    item.status = ItemStatus.SOLD_OUT;
    return item;
  }

  // deleteでは特に何も返す必要がないため、返り値の型はvoid型とする
  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
