import "./assets/css/index.scss";
import React from "react";
import MainPage from "./views/MainPage";
import SubProjectPage from "./views/SubProjectPage";
import ProjectPage from "./views/ProjectPage";

function App() {
    return (
        <div className="app">
            <MainPage/>
            <SubProjectPage/>
            <ProjectPage/>
        </div>
    );
}

export default App;
