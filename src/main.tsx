import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import MovieDetail from "./pages/MovieDetail/MovieDetail.tsx";
import App from "./pages/Home/App.tsx";
import Header from "./components/Header/Header.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);
