import TelegramBot from "node-telegram-bot-api";
import { BotCommand } from "./bot-command.interface";
import { SimklService } from "src/simkl/simkl.service";

export class SearchCommand implements BotCommand {
    command = /^(?:@\w+ )?\/search (.+)$/;
    constructor(
        private bot: TelegramBot,
        private simklService: SimklService
    ) { }

    async handle(msg: TelegramBot.Message, match: RegExpExecArray | null) {
        try {
            if (!match || match.length < 2) {
                this.bot.sendMessage(msg.chat.id, "Please provide a search query.");
                return;
            }
            const query = match[1].trim();
            if (!query) {
                this.bot.sendMessage(msg.chat.id, "Please provide a valid search query.");
                return;
            }
            const animeList = await this.simklService.searchAnime(query);
            if (!animeList || animeList.length === 0) {
                this.bot.sendMessage(msg.chat.id, "No results found. Please try a different query.");
                return;
            }
            else {
                const message = animeList.map(anime => `• ${anime.title_en ? anime.title_en : anime.title} - (${anime.ids.simkl_id})`).join('\n');
                this.bot.sendMessage(msg.chat.id, `Search results:\n${message}\nIf could not find the anime you are looking for, please try searching with IMDB URL.`);
            }
        } catch (error) {
            console.error("Error fetching today's anime:", error);
            this.bot.sendMessage(msg.chat.id, "An error occurred while fetching today's anime.");
        }
    }
}