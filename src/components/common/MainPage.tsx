import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import sampleImage from '../../public/images/sample.png';

function MainPage() {
    const mainCategoryList = [
        {PLAN: "기획"},
        {DESIGN: "디자이너"},
        {BACK: "백엔드"},
        {FRONT: "프론트엔드"},
        {ALL: "전체"},
    ];
    const [categoryFocus, setCategoryFocus] = useState("ALL")
    const [mainCategory, setMainCategory] = useState("")

    return (
        <div className="main">
            <div className="main-section">
                <div className="main-section-title">
                    <div className="main-section-title-star">
                        <span>★</span>
                    </div>
                    <div className="main-section-title-talk">
                        <span>프로젝트를</span><br/>
                        <span>만나볼 준비 되었나요?</span><br/>
                        <div className="main-section-title-talk-banner">원하는 프로젝트는 다 만날 수 있어요!</div>
                    </div>
                    <div className="main-section-title-search">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        <input type="text" placeholder=""/>
                    </div>
                </div>
                <div className="main-section-categoryList">
                    {mainCategoryList.map((category, index) => (
                        <div className={categoryFocus === Object.keys(category)[0] ? 'focus' : 'category'} key={index}
                             onClick={() => {
                                 setMainCategory(Object.keys(category)[0]);
                                 setCategoryFocus(Object.keys(category)[0]);
                             }}>
                            <span>{Object.values(category)}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="main-image">
                <img alt="sample image" src={sampleImage}/>
            </div>
        </div>
    );
}

export default MainPage;