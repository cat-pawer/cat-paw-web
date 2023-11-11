import React from "react";
import ReactDOM from "react-dom/client";
import store from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import MainPage from "./views/MainPage";
import SubProjectPage from "./views/SubProjectPage";
import ProjectDetailPage from "./views/ProjectDetailPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/main",
        element: <MainPage />,
    },
    {
        path: "/subProject",
        element: <SubProjectPage />,
    },
    {
        path: "/projectDetail/:index",
        element: <ProjectDetailPage />,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    //감 쌈으로써 store사용가능하게됨,prop으로전달할 수 있도록
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>,
);
