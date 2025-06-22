import { WatchlistService } from 'src/watchlist/watchlist.service';
import { BotCommand } from './bot-command.interface';
import TelegramBot from 'node-telegram-bot-api';

export class RemoveCommand implements BotCommand {
    command = /^(?:@\w+ )?\/remove (\d+)$/;

    constructor(
        private bot: TelegramBot,
        private readonly watchlistService: WatchlistService
    ) { }

    async handle(msg: TelegramBot.Message, match: RegExpExecArray | null) {
        if (!match) return;

        const id = parseInt(match[1], 10);

        try {
            const show = await this.watchlistService.findOne(id);
            if (!show) {
                this.bot.sendMessage(msg.chat.id, `❌ No show found in your watchlist with ID ${id}.`);
                return;
            }

            await this.watchlistService.remove(id);

            this.bot.sendMessage(
                msg.chat.id,
                `✅ Removed *${show.title}* from your watchlist.`,
                { parse_mode: 'Markdown' }
            );
        } catch (error) {
            console.error('RemoveCommand Error:', error);
            this.bot.sendMessage(
                msg.chat.id,
                '⚠️ Failed to remove the show. Please try again.'
            );
        }
    }
}
