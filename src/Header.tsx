import { useState } from "react";
import { Outlet } from "react-router";

// 引数にとる変数と型定義の見やすい書き方.
function Header() {
    const [keyword, setKeyword] = useState("");

    return (
        <div className="app-bg">
            <header className="app-header">
                <h1
                    onClick={() => {
                        window.location.reload();
                    }}
                    className="app-title"
                    style={{ cursor: "pointer" }}
                >
                    MOVIEFLIX
                </h1>
                <div className="app-search-wrap">
                    <input
                        type="text"
                        className="app-search"
                        placeholder="🔍 映画タイトルで検索..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </header>
            <Outlet context={{ keyword }} />
        </div>
    );
}

export default Header;
