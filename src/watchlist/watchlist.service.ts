import { Injectable } from '@nestjs/common';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Watchlist } from './entities/watchlist.entity';
import { Repository, LessThan, MoreThan, Between } from 'typeorm';

@Injectable()
export class WatchlistService {
  constructor(@InjectRepository(Watchlist) private readonly watchlistRepository: Repository<Watchlist>) { }

  create(createWatchlistDto: CreateWatchlistDto) {
    const watchlist = this.watchlistRepository.create(createWatchlistDto);
    return this.watchlistRepository.save(watchlist);
  }

  findAll() {
    return this.watchlistRepository.find();
  }

  findOne(id: number) {
    return this.watchlistRepository.findOne({ where: { id } });
  }

  findByName(title: string) {
    return this.watchlistRepository.findOne({ where: { title } });
  }

  update(id: number, updateWatchlistDto: UpdateWatchlistDto) {
    return this.watchlistRepository.update(id, updateWatchlistDto);
  }

  remove(id: number) {
    return this.watchlistRepository.delete(id);
  }

  getOldEpisodesForUpdation() {
    const now = new Date();
    return this.watchlistRepository.find({
      where: {
        nextEpisodeDate: LessThan(now),
      },
    });
  }
  getNewEpisodes() {
    const end = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return this.watchlistRepository.find({
      where: {
        nextEpisodeDate: Between(today, end),
      },
    });
  }
}
