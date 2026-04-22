import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import MovieDetail from "./MovieDetail.tsx";
import App from "./App.tsx";
import Header from "./Header.tsx";

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
