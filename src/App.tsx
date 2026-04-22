import { useCallback, useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import type { Movie, MovieJson } from "./types";

function App() {
    // 検索キーワードを保存する変数
    const [keyword, setKeyword] = useState("");
    // 取得した映画リストを保存する配列
    const [movieList, setMovieList] = useState<Movie[]>([]);

    // useCallback を用いて keyword が更新されない限り同じ関数を使い回すように fetchMovieList関数を定義
    const fetchMovieList = useCallback(async () => {
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        let url = "";
        if (keyword) {
            url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ja&page=1`;
        } else {
            url =
                "https://api.themoviedb.org/3/movie/popular?language=ja&page=1";
        }
        // await でデータが取得されるまで次の処理に進まないようにする.
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        const data = await response.json();
        const result = data.results;
        const movieList = result.map((movie: MovieJson) => ({
            id: movie.id,
            original_title: movie.original_title,
            poster_path: movie.poster_path,
        }));
        return movieList;
    }, [keyword]);

    // useEffect を用いて keyword によって fetchMovieList が更新されたら再レンダリングする.
    useEffect(() => {
        const loadMovieList = async () => {
            const movieList = await fetchMovieList();
            setMovieList(movieList);
        };

        loadMovieList();
    }, [fetchMovieList]);

    // HeroScetion用のダミーデータ（君の名は）
    const heroTitle = "君の名は";
    const heroYear = 2016;
    const heroOverview =
        "1ヵ月後に1000年ぶりの彗星が訪れる日本。東京で暮らす平凡な男子高校生・瀧と、山深い村で都会の生活に憧れながら憂鬱な日々を送る女子高校生・三葉。つながりのない2人は、互いが入れ替わる不思議な夢を見る。";
    const heroImage =
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/yLglTwyFOUZt5fNKm0PWL1PK5gm.jpg";

    return (
        <div>
            <section className="hero-section">
                {heroImage && (
                    <>
                        <img
                            className="hero-section-bg"
                            src={heroImage}
                            alt={heroTitle}
                        />
                        <div className="hero-section-gradient" />
                    </>
                )}
                <div className="hero-section-content">
                    <h1 className="hero-section-title">{heroTitle}</h1>
                    <div className="hero-section-badges">
                        <span className="hero-section-badges">{heroYear}</span>
                    </div>
                    {heroOverview && (
                        <div className="hero-section-overview">
                            {heroOverview}
                        </div>
                    )}
                    <div className="hero-section-actions">
                        <button
                            onClick={() => alert("未実装です")}
                            className="hero-section-btn hero-section-btn-primary"
                        >
                            ▶︎ Play
                        </button>
                        <button className="hero-section-btn hero-section-btn-secondary">
                            More Info
                        </button>
                    </div>
                </div>
            </section>
            <section className="more-row-section">
                <h2 className="movie-row-title">
                    {keyword ? `「${keyword}」の検索結果` : "人気映画"}
                </h2>
                <div className="movie-row-scroll">
                    {movieList.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
            <div className="app-search-wrap">
                <input
                    type="text"
                    className="app-search"
                    placeholder="映画タイトルで検索..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
        </div>
    );
}

export default App;
