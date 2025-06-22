import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SimklAnimeWithEpisodes, SimklEpisode, SimklSearchResult } from "./interfaces";

@Injectable()
export class SimklService {
    async getAnimeEpisodes(animeId: number): Promise<SimklEpisode[]> {
        const url = `${process.env.SIMKL_BASE_URL as string}${process.env.ANIME_EPISODES_PATH as string}/${animeId}?client_id=${process.env.SIMKL_CLIENT_ID as string}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching episodes data: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch episodes data: ${error.message}`);
        }
    }

    async getAnime(animeId: number): Promise<SimklAnimeWithEpisodes> {
        const url = `${process.env.SIMKL_BASE_URL as string}${process.env.ANIME_PATH as string}/${animeId}?client_id=${process.env.SIMKL_CLIENT_ID as string}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching anime data: ${response.statusText}`);
            }
            const data = await response.json();
            const episodes = await this.getAnimeEpisodes(animeId);
            return {
                ...data,
                episodes: episodes || [],
            };
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch anime data: ${error.message}`);
        }
    }

    async searchAnime(query: string): Promise<SimklSearchResult[]> {
        const url = `${process.env.SIMKL_BASE_URL as string}${process.env.ANIME_SEARCH_PATH as string}?q=${encodeURIComponent(query)}&limit=50&client_id=${process.env.SIMKL_CLIENT_ID as string}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching search results: ${response.statusText}`);
            }

            return await response.json() as SimklSearchResult[];
        } catch (error) {
            throw new InternalServerErrorException(`Failed to search anime: ${error.message}`);
        }
    }
}