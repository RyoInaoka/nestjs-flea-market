import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';
import { ItemStatus } from './item-status.enum';

@Injectable()
export class ItemsService {
  // itemのリポジトリをDIする
  constructor(private readonly itemRepository: ItemRepository) {}

  // itemを保存するための配列変数
  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    // このfind()はRepositoryで提供されいてる主なメソッド
    return await this.itemRepository.find();
  }

  async findByID(id: string): Promise<Item> {
    // オプションに一致する最初のエンティティーを探し、なければ失敗
    const item = this.itemRepository.findOneOrFail(id);
    if (!item) {
      throw new NotFoundException();
    }
    return await item;
  }

  // repositoryの中で定義したcreatItemメソッドを使うため既存のcreateメソッドの中身が置き換わる
  // repositoryのcreateItemは非同期関数のため、このcreateメソッドも非同期関数にする。返り値の型も非同期
  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto);
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

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findByID(id);
    item.status = ItemStatus.SOLD_OUT;
    item.updatedAt = new Date().toISOString();
    await this.itemRepository.save(item);
    return await item;
  }

  // deleteでは特に何も返す必要がないため、返り値の型はvoid型とする
  async delete(id: string): Promise<void> {
    await this.itemRepository.delete({ id });
  }
}
