import "./assets/css/index.scss";
import React from "react";
import MainPage from "./components/common/MainPage";
import CalendarPage from "./components/common/Calendar";

const App = () => {
	return (
		<div className="app">
			<MainPage />
			<CalendarPage />
		</div>
	);
};

export default App;
