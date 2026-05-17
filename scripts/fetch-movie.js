#!/usr/bin/env node
/**
 * Usage:
 *   node scripts/fetch-movie.mjs <keyword>       # キーワード検索
 *   node scripts/fetch-movie.mjs --id <movie_id> # 映画IDで詳細取得
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// .env からAPIキーを読み込む
function loadEnv() {
    const envPath = resolve(process.cwd(), ".env");
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
        const [key, ...rest] = line.split("=");
        if (key?.trim() === "VITE_TMDB_API_KEY") {
            return rest.join("=").trim();
        }
    }
    throw new Error(".env に VITE_TMDB_API_KEY が見つかりません");
}

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = loadEnv();
const headers = { Authorization: `Bearer ${API_KEY}` };

function printSeparator() {
    console.log("─".repeat(60));
}

function printMovie(movie) {
    printSeparator();
    console.log(`タイトル    : ${movie.title ?? movie.original_title}`);
    console.log(`原題        : ${movie.original_title}`);
    console.log(`公開日      : ${movie.release_date ?? "不明"}`);
    console.log(`評価        : ${movie.vote_average ?? "N/A"} / 10 (${movie.vote_count ?? 0} 件)`);
    console.log(`ID          : ${movie.id}`);
    if (movie.genres?.length) {
        console.log(`ジャンル    : ${movie.genres.map((g) => g.name).join(", ")}`);
    }
    if (movie.overview) {
        const overview = movie.overview.length > 120
            ? movie.overview.slice(0, 120) + "…"
            : movie.overview;
        console.log(`あらすじ    : ${overview}`);
    }
    if (movie.poster_path) {
        console.log(`ポスター    : https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    }
    if (movie.credits?.cast?.length) {
        const cast = movie.credits.cast.slice(0, 5).map((c) => c.name).join(", ");
        console.log(`出演        : ${cast}`);
    }
}

async function searchByKeyword(keyword) {
    const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(keyword)}&language=ja&page=1`;
    const res = await fetch(url, { headers });
    const data = await res.json();

    if (!data.results?.length) {
        console.log(`「${keyword}」に一致する映画が見つかりませんでした。`);
        return;
    }

    console.log(`\n「${keyword}」の検索結果: ${data.total_results} 件 (上位 ${data.results.length} 件を表示)\n`);
    for (const movie of data.results) {
        printMovie(movie);
    }
    printSeparator();
}

async function fetchById(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?language=ja&append_to_response=credits`;
    const res = await fetch(url, { headers });
    const data = await res.json();

    if (data.success === false) {
        console.log(`ID ${movieId} の映画が見つかりませんでした: ${data.status_message}`);
        return;
    }

    console.log(`\n映画詳細 (ID: ${movieId})\n`);
    printMovie(data);
    printSeparator();
}

// --- エントリーポイント ---
const args = process.argv.slice(2);

if (!args.length) {
    console.log("使い方:");
    console.log("  node scripts/fetch-movie.mjs <keyword>       # キーワード検索");
    console.log("  node scripts/fetch-movie.mjs --id <movie_id> # IDで詳細取得");
    process.exit(0);
}

if (args[0] === "--id") {
    const id = args[1];
    if (!id) {
        console.error("--id の後に映画IDを指定してください");
        process.exit(1);
    }
    await fetchById(id);
} else {
    await searchByKeyword(args.join(" "));
}
