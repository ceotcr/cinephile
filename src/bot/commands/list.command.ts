import { WatchlistService } from 'src/watchlist/watchlist.service';
import { BotCommand } from './bot-command.interface';
import TelegramBot from 'node-telegram-bot-api';

export class ListCommand implements BotCommand {
    command = /^(?:@\w+ )?\/list$/;

    constructor(
        private bot: TelegramBot,
        private watchlistService: WatchlistService
    ) { }

    async handle(msg: TelegramBot.Message) {
        const shows = await this.watchlistService.findAll();
        let message = shows.length > 0
            ? 'Your watchlist:\n' + shows.map(s => `• ${s.title} (${s.id}) - Next episode: ${s.nextEpisodeDate.toLocaleString('en-US', { timeZone: process.env.TIMEZONE })}`).join('\n')
            : 'Your watchlist is empty.';
        this.bot.sendMessage(msg.chat.id, message);
    }
}
