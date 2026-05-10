import "./App.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import type { Movie, MovieJson } from "../../types";
import { Link, useOutletContext } from "react-router";
import { fetchMoviesByKeyword, fetchPopularMovies } from "../../api/movie";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function App() {
    // 検索キーワードを保存する変数
    const { keyword } = useOutletContext<{ keyword: string }>();

    const {
        data: movieList = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["movies", keyword], // keyword が変わると自動で再フェッチ
        queryFn: async () => {
            const results = keyword
                ? await fetchMoviesByKeyword(keyword)
                : await fetchPopularMovies();

            return results.map((movie: MovieJson) => ({
                id: movie.id,
                original_title: movie.original_title,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                overview: movie.overview,
                release_date: movie.release_date,
            })) as Movie[];
        },
    });

    const [heroIndex] = useState(() => Math.floor(Math.random() * 20));
    const heroMovie =
        movieList.length > 0 ? movieList[heroIndex % movieList.length] : null;

    if (isLoading) return <p>読み込み中...</p>;
    if (isError) return <p>エラーが発生しました</p>;

    // HeroScetion のデータ
    const heroId = heroMovie?.id;
    const heroTitle = heroMovie?.original_title;
    const heroYear = heroMovie?.year;
    const heroOverview = heroMovie?.overview;
    const heroImage = heroMovie?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
        : null;

    return (
        <div>
            {keyword ? (
                <section
                    className="movie-row-section"
                    style={{ marginTop: "10rem" }}
                >
                    <h2 className="movie-row-title">
                        {`「${keyword}」の検索結果`}
                    </h2>
                    <div className="movie-row-scroll">
                        {movieList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </section>
            ) : (
                <>
                    <div className="main-wrapper">
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
                                <h1 className="hero-section-title">
                                    {heroTitle}
                                </h1>
                                <div className="hero-section-badges">
                                    <span className="hero-section-badge">
                                        {heroYear}
                                    </span>
                                </div>
                                {heroOverview && (
                                    <div className="hero-section-overview">
                                        {heroOverview}
                                    </div>
                                )}
                                <div className="hero-section-actions">
                                    <button
                                        onClick={() => {
                                            alert("未実装です");
                                        }}
                                        className="hero-section-btn hero-section-btn-primary"
                                    >
                                        ▶︎ Play
                                    </button>
                                    <Link to={`/movies/${heroId}`}>
                                        <button className="hero-section-btn hero-section-btn-secondary">
                                            More Info
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </section>
                        <section className="movie-row-section">
                            <h2 className="movie-row-title">人気映画</h2>
                            <div className="movie-row-scroll">
                                {movieList.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        </section>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
