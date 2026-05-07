import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import type { Movie, MovieJson } from "../../types";
import { Link, useOutletContext } from "react-router";
import { fetchMoviesByKeyword, fetchPopularMovies } from "../../api/movie";

function App() {
    // 検索キーワードを保存する変数
    const { keyword } = useOutletContext<{ keyword: string }>();
    // 取得した映画リストを保存する配列
    const [movieList, setMovieList] = useState<Movie[]>([]);

    // useEffect を用いて keyword によって fetchMovieList が更新されたら再レンダリングする.
    useEffect(() => {
        const loadMovies = async () => {
            // results の結果を keyword の有無で分岐させる.
            const results = keyword
                ? await fetchMoviesByKeyword(keyword)
                : await fetchPopularMovies();

            // Movie 型の movies に results の結果をマップしてそれぞれの必要な項目を取得しリスト化していく.
            const movies: Movie[] = results.map((movie: MovieJson) => ({
                id: movie.id,
                original_title: movie.original_title,
                poster_path: movie.poster_path,
            }));
            setMovieList(movies);
        };

        loadMovies();
    }, [keyword]);

    // HeroScetion用のダミーデータ（君の名は）
    const heroId = 305143;
    const heroTitle = "クレヨンしんちゃん ガチンコ!逆襲のロボとーちゃん";
    const heroYear = 2014;
    const heroOverview =
        "ぎっくり腰になったひろしは、美人の誘いに乗せられて、マッサージを兼ねたエステの無料体験を受けることに。すっきりして家に帰ったひろしだったが、どうもみさえやしんのすけの反応がおかしい。鏡に映った姿を見ると、なんとひろしはロボットになっていた！　やがて野原一家は、これが立場の弱くなった日本の父親たちの復権をたくらむ秘密結社「父よ、勇気で立ち上がれ同盟」、略称“父ゆれ同盟”による陰謀だと知る。";
    const heroImage =
        "https://occ-0-5088-988.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABSBSmZrSlRdbArcK61Lmeee7Q3sWaUqGlD5D9aXvaXaQAOVqvQdvfCgUW7aGdGKTd8ZlrDthjnzdWkaszxfzMBmij2qoggqEFNYnUJ0avg.webp?r=7b9";

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
