import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import sampleImg from '../../public/images/mainImg.png';
import starImg from '../../public/images/starImg.png';

const searchOption: { value: string; label: string }[] = [
    {value: "ALL", label: "전체"},
    {value: "PROJECT", label: "프로젝트"},
    {value: "STUDY", label: "스터디"},
]

function MainPage() {
    const mainCategoryList = [
        {PLAN: "기획"},
        {DESIGN: "디자이너"},
        {BACK: "백엔드"},
        {FRONT: "프론트엔드"},
        {WEB: "웹"},
    ];

    const [categoryFocus, setCategoryFocus] = useState<string[]>([])
    const [selectOption, setSelectChange] = useState<any>("ALL")

    const categoryHandle = (clickCategory: string) => {
        //클릭 요소가 포함되어있는 경우
        if (categoryFocus.includes(clickCategory)) {
            const updatedCategoryFocus: string[] = categoryFocus.filter((category) => category != clickCategory) //category 배열을 순회하며 필터링해서 제외
            setCategoryFocus(updatedCategoryFocus);
        } else {
            setCategoryFocus([...categoryFocus, clickCategory])
        }
    }

    return (
        <div className="main">
            <div className="main-section">
                <div className="main-section-title">
                    <div className="main-section-title-star">
                        <img alt="star img" src={starImg}/>
                    </div>
                    <div className="main-section-title-talk">
                        <span>프로젝트를</span><br/>
                        <span>만나볼 준비 되었나요?</span><br/>
                        <div className="main-section-title-talk-banner">원하는 프로젝트는 다 만날 수 있어요!</div>
                    </div>
                    <div className="main-section-title-search">
                        <div className="main-section-title-search-select">
                            <div>
                            </div>
                            {/*<Select className="select" value={selectOption} onChange={setSelectChange}*/}
                            {/*        options={searchOption}/>*/}
                        </div>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="glass"/>
                        <input className="search-input" type="text" placeholder=""/>
                    </div>
                </div>
                <div className="main-section-categoryList">
                    {mainCategoryList.map((category, index) => (
                        <div className={(categoryFocus.includes(Object.keys(category)[0])) ? 'focus' : 'category'}
                             key={index}
                             onClick={() => {
                                 categoryHandle(Object.keys(category)[0]);
                             }}>
                            <span>{Object.values(category)}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="main-image">
                <img alt="main image" src={sampleImg}/>
            </div>
        </div>
    );
}

export default MainPage;