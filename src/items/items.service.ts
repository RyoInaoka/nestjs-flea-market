import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  // itemのリポジトリをDIする
  constructor(private readonly itemRepository: ItemRepository) {}

  // itemを保存するための配列変数
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findByID(id: string): Item {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  // repositoryの中で定義したcreatItemメソッドを使うため既存のcreateメソッドの中身が置き換わる
  // repositoryのcreateItemは非同期関数のため、このcreateメソッドも非同期関数にする。返り値の型も非同期
  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.creatItem(createItemDto);
  }

  // create(createItemDto: CreateItemDto): Item {
  //   const item: Item = {
  //     id: uuid(),
  //     ...createItemDto,
  //     status: ItemStatus.ON_SALE,
  //   };
  //   this.items.push(item);
  //   return item;
  // }

  // updateStatus(id: string): Item {
  //   const item = this.findByID(id);
  //   item.status = ItemStatus.SOLD_OUT;
  //   return item;
  // }

  // deleteでは特に何も返す必要がないため、返り値の型はvoid型とする
  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
