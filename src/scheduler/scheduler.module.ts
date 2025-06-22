import { Module } from "@nestjs/common";
import { SchedulerService } from "./scheduler.service";
import { WatchlistModule } from "src/watchlist/watchlist.module";
import { SimklModule } from "src/simkl/simkl.module";
import { BotModule } from "src/bot/bot.module";

@Module({
    imports: [WatchlistModule, SimklModule, BotModule],
    providers: [SchedulerService],
    exports: [SchedulerService]
})
export class SchedulerModule { }