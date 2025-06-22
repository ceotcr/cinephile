import TelegramBot from "node-telegram-bot-api";
import { WatchlistService } from "src/watchlist/watchlist.service";
import { BotCommand } from "./bot-command.interface";

export class TodayCommand implements BotCommand {
    command = /^(?:@\w+ )?\/today$/;
    constructor(
        private bot: TelegramBot,
        private watchlistService: WatchlistService
    ) { }
    async handle(msg: TelegramBot.Message, match: RegExpExecArray | null) {
        const shows = await this.watchlistService.getNewEpisodes();
        let message = shows.length > 0
            ? 'Today\'s shows:\n' + shows.map(s => `• ${s.title} - Time: ${s.nextEpisodeDate.toLocaleTimeString('en-US', { timeZone: process.env.TIMEZONE })}`).join('\n')
            : 'No shows scheduled for today.';
        this.bot.sendMessage(msg.chat.id, message);
    }
}