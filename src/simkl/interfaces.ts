export interface SimklEpisode {
    title: string;
    description: string | null;
    type: string;
    aired: boolean;
    img: string;
    date: string;
    ids: {
        simkl_id: number;
    };
}

export interface SimklAnime {
    title: string;
    year: number;
    type: string;
    ids: {
        simkl: number;
        slug: string;
    };
}

export interface SimklAnimeWithEpisodes extends SimklAnime {
    episodes: SimklEpisode[];
}

export interface SimklSearchResult {
    title: string;
    title_en?: string;
    title_romaji?: string;
    year: number;
    endpoint_type: string;
    type: string;
    poster: string;
    ids: {
        simkl_id: number;
        slug: string;
    };
}