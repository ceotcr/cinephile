import { BotCommand } from './bot-command.interface';
import TelegramBot from 'node-telegram-bot-api';

export class StartCommand implements BotCommand {
    command = /^\/start$/;

    constructor(private bot: TelegramBot) { }

    async handle(msg: TelegramBot.Message, match: RegExpExecArray | null) {
        if (!match) return;

        const welcomeMessage = `
👋 *Welcome to the Anime Watchlist Bot!*

Here's what you can do:
📥 Add an anime to your watchlist using \`/add <simkl_id>\`
📃 View your watchlist with \`/list\`
🗑️ Remove an anime with \`/remove <simkl_id>\`
📅 Get today's episodes with \`/today\`

You will also get:
⏰ *Daily updates at 8 AM*
🔔 *5-minute reminders before new episodes*

Let's get started! 🚀
    `;

        const options: TelegramBot.SendMessageOptions = {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: undefined,
                inline_keyboard: [
                    [
                        {
                            text: 'Add Anime',
                            switch_inline_query_current_chat: '/add '
                        },
                        {
                            text: 'Remove Anime',
                            switch_inline_query_current_chat: '/remove '
                        },
                    ],
                    [
                        {
                            text: 'View Watchlist',
                            switch_inline_query_current_chat: '/list'
                        },
                        {
                            text: 'Today\'s Episodes',
                            switch_inline_query_current_chat: '/today'
                        }
                    ],
                    [
                        {
                            text: 'Search Anime',
                            switch_inline_query_current_chat: '/search '
                        }
                    ]
                ],
                one_time_keyboard: true,
                resize_keyboard: true,
            }
        };


        await this.bot.sendMessage(msg.chat.id, welcomeMessage, options);
    }
}
