import { Module } from "@nestjs/common";
import { WatchlistModule } from "src/watchlist/watchlist.module";
import { BotService } from "./bot.service";
import { SimklModule } from "src/simkl/simkl.module";

@Module({
    imports: [WatchlistModule, SimklModule],
    controllers: [],
    providers: [BotService],
    exports: [BotService]
})
export class BotModule { }