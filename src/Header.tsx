// prettier-ignore
// 引数にとる変数と型定義の見やすい書き方.
function Header({ 
    children
}: {
    children: React.ReactNode 
}) {
    return (
        <div className="app-bg">
            <header className="app-header">
                <h1 className="app-title">MOVIEFLIX</h1>
            </header>
            <main>{children}</main>
        </div>
    );
}

export default Header;
