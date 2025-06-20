import { Module } from "@nestjs/common";
import { WatchlistModule } from "src/watchlist/watchlist.module";

@Module({
    imports: [WatchlistModule],
    controllers: [],
    providers: [],
})
export class BotModule { }