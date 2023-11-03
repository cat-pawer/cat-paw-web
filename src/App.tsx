import "./assets/css/index.scss";
import React from "react";
import MainPage from "./components/common/MainPage";
import NewProjectPage from "./components/project/NewProjectPage";

function App() {
    return (
        <div className="app">
            <MainPage/>
            <NewProjectPage/>
        </div>
    );
}

export default App;
