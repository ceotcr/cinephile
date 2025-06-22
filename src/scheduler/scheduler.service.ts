import { Injectable, Logger } from "@nestjs/common";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";
import { BotService } from "src/bot/bot.service";
import { SimklService } from "src/simkl/simkl.service";
import { WatchlistService } from "src/watchlist/watchlist.service";

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);

    constructor(
        private readonly watchlistService: WatchlistService,
        private readonly simklService: SimklService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly botService: BotService
    ) { }

    @Cron('0 0 0 * * *', { timeZone: process.env.TIMEZONE })
    async notifyDaily() {
        this.logger.log('🔔 Running daily anime notifier');

        const newEpisodes = await this.watchlistService.getNewEpisodes();
        if (newEpisodes.length) {
            await this.botService.sendDailyUpdate(newEpisodes);
            this.logger.log(`📺 Sent daily update for ${newEpisodes.length} shows.`);
        } else {
            this.logger.log('🛌 No new episodes today.');
        }

        newEpisodes.forEach((item) => {
            const delay = new Date(item.nextEpisodeDate).getTime() - new Date().getTime();

            if (delay > 0) {
                const timeout = setTimeout(async () => {
                    this.logger.log(`⏰ Sending reminder for: ${item.title}`);
                    await this.botService.remindAnime(item);
                }, delay);

                try {
                    this.schedulerRegistry.addTimeout(item.id.toString(), timeout);
                } catch (err) {
                    this.logger.warn(`⚠️ Timeout for ${item.id} already exists. Skipping.`);
                }
            }
        });

        const oldEpisodes = await this.watchlistService.getOldEpisodesForUpdation();
        for (const item of oldEpisodes) {
            try {
                const episodes = await this.simklService.getAnimeEpisodes(item.id);

                for (let i = 0; i < episodes.length; i++) {
                    if (!episodes[i].aired) {
                        await this.watchlistService.update(item.id, {
                            nextEpisodeDate: new Date(episodes[i].date)
                        });
                        this.logger.log(`🔄 Updated next episode for ${item.title}`);
                        break;
                    }
                }
            } catch (err) {
                this.logger.error(`❌ Failed to update episode for ${item.id}: ${err.message}`);
            }
        }
    }

    showJobs() {
        const jobs = this.schedulerRegistry.getCronJobs();
        const jobList = [] as { name: string; cronTime: string }[];

        jobs.forEach((job, name) => {
            jobList.push({ name, cronTime: job.cronTime.toString() });
        });

        return jobList;
    }
}
