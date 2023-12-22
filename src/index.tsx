import React from "react";
import ReactDOM from "react-dom/client";
import store from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import MainPage from "./views/MainPage";
import SubProjectPage from "./views/SubProjectPage";
import ProjectDetailPage from "./views/ProjectDetailPage";
import LoginPage from "./views/LoginPage";
import OauthSuccessPage from "./views/OauthSuccessPage";
import ChatTestPage from "./views/ChatTestPage";
import MyPage from "./views/MyPage";

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
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/oauth/success",
        element: <OauthSuccessPage />,
    },
    {
        path: "/chat",
        element: <ChatTestPage />,
    },
    {
        path:"/myPage",
        element: <MyPage />,
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    //감 쌈으로써 store사용가능하게됨,prop으로전달할 수 있도록
    <Provider store={store}>
        {/*<React.StrictMode>*/}
        <RouterProvider router={router} />
        {/*</React.StrictMode>*/}
    </Provider>,
);
