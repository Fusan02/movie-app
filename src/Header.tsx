// prettier-ignore
// 引数にとる変数と型定義の見やすい書き方.
function Header({ 
    children
}: {
    children: React.ReactNode 
}) {
    return (
        <div>
            <header>
                <h1>MOVIEFLIX</h1>
            </header>
            <main>{children}</main>
        </div>
    );
}

export default Header;
