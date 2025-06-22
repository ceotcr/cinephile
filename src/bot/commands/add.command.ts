import { WatchlistService } from 'src/watchlist/watchlist.service';
import { BotCommand } from './bot-command.interface';
import TelegramBot from 'node-telegram-bot-api';
import { SimklService } from 'src/simkl/simkl.service';

export class AddCommand implements BotCommand {
    command = /^(?:@\w+ )?\/add (\d+)$/;

    constructor(
        private bot: TelegramBot,
        private readonly watchlistService: WatchlistService,
        private readonly simklerService: SimklService
    ) { }

    async handle(msg: TelegramBot.Message, match: RegExpExecArray | null) {
        if (!match) return;

        const id = parseInt(match[1], 10);
        try {
            const existingShow = await this.watchlistService.findOne(id);
            if (existingShow) {
                this.bot.sendMessage(msg.chat.id, `✅ Show already exists in watchlist: *${existingShow.title}*`, { parse_mode: 'Markdown' });
                return;
            }
            const anime = await this.simklerService.getAnime(id);

            const nextEp = anime.episodes.find((ep: any) => ep.aired === false && ep.date);
            if (!nextEp) {
                this.bot.sendMessage(msg.chat.id, `❌ Could not find upcoming episodes for "${anime.title}"`);
                return;
            }

            const imageUrl = `https://simkl.in/episodes/${nextEp.img}_c.webp`;
            const nextEpisodeDate = new Date(nextEp.date);

            const show = await this.watchlistService.create({
                id: anime.ids.simkl,
                title: anime.title,
                imageUrl,
                nextEpisodeDate,
            });

            const message = show
                ? `✅ Added to watchlist: *${show.title}*\n🕒 Next episode: ${nextEpisodeDate.toLocaleString()}`
                : '❌ Failed to add show to watchlist.';

            this.bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error('AddCommand Error:', error);
            this.bot.sendMessage(msg.chat.id, '⚠️ Failed to fetch anime or save to watchlist.');
        }
    }
}
