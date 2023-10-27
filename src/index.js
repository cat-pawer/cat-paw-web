import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MainPage from "./components/common/MainPage";
import CalendarPage from "./components/common/Calendar";
import store from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

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
		path: "/calendar",
		element: <CalendarPage />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	//감 쌈으로써 store사용가능하게됨,prop으로전달할 수 있도록
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>,
);
