// src/bot/bot.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { WatchlistService } from 'src/watchlist/watchlist.service';
import { ListCommand } from './commands/list.command';
import { BotCommand } from './commands/bot-command.interface';
import { AddCommand } from './commands/add.command';
import { SimklService } from 'src/simkl/simkl.service';
import { RemoveCommand } from './commands/remove.command';
import { StartCommand } from './commands/start.command';
import { Watchlist } from 'src/watchlist/entities/watchlist.entity';
import { SearchCommand } from './commands/search.command';
import { TodayCommand } from './commands/today.command';

@Injectable()
export class BotService implements OnModuleInit {
    private bot: TelegramBot;
    private readonly chatId = process.env.CHAT_ID as string;
    private readonly token = process.env.TELEGRAM_TOKEN as string;

    private commands: BotCommand[] = [];

    constructor(private watchlistService: WatchlistService, private simklerService: SimklService) { }

    onModuleInit() {
        this.bot = new TelegramBot(this.token, { polling: true });

        this.registerCommands();

        this.bot.on('message', async (msg) => {
            if (msg.chat.id !== parseInt(this.chatId, 10)) {
                this.bot.sendMessage(
                    msg.chat.id,
                    'This is a private bot. Please contact the owner to get access.',
                );

                return;
            }
            const text = msg.text || '';
            for (const command of this.commands) {
                const match = command.command.exec(text);
                if (match) {
                    await command.handle(msg, match);
                    break;
                }
            }
        });

    }

    private registerCommands() {
        this.commands = [
            new ListCommand(this.bot, this.watchlistService),
            new AddCommand(this.bot, this.watchlistService, this.simklerService),
            new RemoveCommand(this.bot, this.watchlistService),
            new SearchCommand(this.bot, this.simklerService),
            new TodayCommand(this.bot, this.watchlistService),
            new StartCommand(this.bot)
        ];
    }

    async remindAnime(watchlistItem: Watchlist) {
        const caption = `🔔 *Reminder*: _${watchlistItem.title}_ is airing soon!\n`;

        await this.bot.sendPhoto(
            this.chatId,
            watchlistItem.imageUrl,
            {
                caption,
                parse_mode: 'Markdown'
            }
        );
    }

    async sendDailyUpdate(watchlist: Watchlist[]) {
        if (watchlist.length === 0) {
            return;
        }
        for (const item of watchlist) {
            const caption = `📅 *Today's Anime*: _${item.title}_\n` +
                `🕒 *Airing Time*: ${new Date(item.nextEpisodeDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}\n`;

            await this.bot.sendPhoto(
                this.chatId,
                item.imageUrl,
                {
                    caption,
                    parse_mode: 'Markdown',
                }
            );
        }
    }
}
