import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatchlistModule } from './watchlist/watchlist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watchlist } from './watchlist/entities/watchlist.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/cinephile.db',
      entities: [Watchlist],
      synchronize: true,
    }),
    WatchlistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
