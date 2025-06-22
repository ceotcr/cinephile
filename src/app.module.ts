import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatchlistModule } from './watchlist/watchlist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watchlist } from './watchlist/entities/watchlist.entity';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BotModule } from './bot/bot.module';
import { SimklModule } from './simkl/simkl.module';
import { SchedulerModule } from './scheduler/scheduler.module';

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
    ScheduleModule.forRoot(),
    SchedulerModule,
    WatchlistModule,
    BotModule,
    SimklModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
