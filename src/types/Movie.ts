export type Movie = {
    id: string;
    original_title: string;
    poster_path: string;
    overview: string;
    year: number;
    rating: number;
    runtime: number;
    voteCount: number;
    genres: string[];
};

export type MovieJson = {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};
