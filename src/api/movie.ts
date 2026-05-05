const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const headers = { Authorization: `Bearer ${API_KEY}` };

export async function fetchPopularMovies() {
    const res = await fetch(`${BASE_URL}/movie/popular?language=ja&page=1`, {
        headers,
    });
    const data = await res.json();
    return data.results;
}

export async function fetchMoviesByKeyword(keyword: string) {
    const res = await fetch(
        `${BASE_URL}/search/movie?query=${keyword}&language=ja&page=1`,
        { headers },
    );
    const data = await res.json();
    return data.results;
}
