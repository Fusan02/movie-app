import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import MovieDetail from "./pages/MovieDetail/MovieDetail.tsx";
import App from "./pages/Home/App.tsx";
import Header from "./components/Header/Header.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Header,
        children: [
            { path: "/", Component: App },
            { path: "/movies/:movieId", Component: MovieDetail },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
