import { useEffect, useState } from 'react';
import './App.css'

function App() {
  // movieList を取得してくる関数
  const fetchMovieList = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ja&page=1`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );
    // await でデータが取得されるまで次の処理に進まないようにする.
    const data = await response.json();
    console.log(data.results)
    setMovieList(data.results);
  }

  // 検索キーワードを保存する変数
  const [keyword, setKeyword] = useState("");
  const [movieList, setMovieList] = useState([]);

  // useEffect
  useEffect(() => {
    fetchMovieList();
  }, []);

  return (
    <div>
      <input type="text" onChange={(e) => setKeyword(e.target.value)} />
      <div>{keyword}</div>
      {movieList
        .filter((movie) => movie.original_title.includes(keyword))
        .map((movie) => (
          <div key={movie.id}>
            <h2>{movie.original_title}</h2>
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.original_title} 
            />
            <p>{movie.overview}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App
