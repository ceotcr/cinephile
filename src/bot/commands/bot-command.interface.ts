import TelegramBot from 'node-telegram-bot-api';

export interface BotCommand {
    command: RegExp;
    handle(msg: TelegramBot.Message, match: RegExpExecArray | null): Promise<void>;
}
