import "./assets/css/index.scss";
import React from "react";
import MainPage from "./components/common/MainPage";
import SubProjectPage from "./components/board/SubProjectPage";
import ProjectPage from "./components/board/ProjectPage";


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
