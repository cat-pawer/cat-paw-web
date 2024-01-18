import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import sampleImg from "../public/images/mainImg.png";
import starImg from "../public/images/starImg.png";
import SubProjectPage from "./SubProjectPage";
import ProjectPage from "./ProjectPage";
import { apiGetClient } from "src/utils/api";
import { calculateDDay, formatDate } from "../utils/DateUtil";
import { useNavigate } from "react-router-dom";

const searchList: { value: string; label: string }[] = [
    { value: "", label: "전체" },
    { value: "project", label: "프로젝트" },
    { value: "study", label: "스터디" },
];

function MainPage() {
    const navigate = useNavigate();

    const mainCategoryList = [
        { PLAN: "기획" },
        { DESIGN: "디자이너" },
        { BACK: "백엔드" },
        { FRONT: "프론트엔드" },
        { WEB: "웹" },
    ];
    const [deadLineList, setDeadLineList] = useState<any[]>([]);
    const [isNewList, setIsNewList] = useState<any[]>([]);
    const [categoryFocus, setCategoryFocus] = useState<string[]>([]);
    const [selectOption, setSelectOption] = useState<any>("");
    const [searchProjectList, setSearchProjectList] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState("");

    const categoryHandle = (clickCategory: string) => {
        //클릭 요소가 포함되어있는 경우
        if (categoryFocus.includes(clickCategory)) {
            const updatedCategoryFocus: string[] = categoryFocus.filter(
                (category) => category != clickCategory,
            ); //category 배열을 순회하며 필터링해서 제외
            setCategoryFocus(updatedCategoryFocus);
        } else {
            setCategoryFocus([...categoryFocus, clickCategory]);
        }
    };
    const topicProject = async () => {
        const resDead = await apiGetClient(
            "/recruit/summary/topics?topic=deadLine&isPage=false&page=0&size=9&sort=created",
        );
        const resNew = await apiGetClient(
            "/recruit/summary/topics?topic=isNew&isPage=false&page=0&size=9&sort=created",
        );
        if (resDead) {
            if (resDead.status === 200) {
                const formedProjectList: any = resDead.data.data.content.map(
                    (info: any) => ({
                        ...info,
                        deadLine: calculateDDay(info.recruitPeriod),
                        recruitPeriod: formatDate(info.recruitPeriod),
                    }),
                );

                setDeadLineList(formedProjectList);
            }
        }
        if (resNew) {
            if (resNew.status === 200) {
                // console.log("resNew:", resNew.data.data.content);
                const formedProjectList: any = resDead.data.data.content.map(
                    (info: any) => ({
                        ...info,
                        deadLine: calculateDDay(info.recruitPeriod),
                        recruitPeriod: formatDate(info.recruitPeriod),
                    }),
                );
                setIsNewList(formedProjectList);
            }
        }
    };
    const searchProject = async (searchValue: string, recruitType: string) => {
        try {
            let apiUrl = `/recruit/summary/search?isPage=false&page=0&size=9&sort=created`;
            if (recruitType !== "") {
                apiUrl += `&recruitType=${recruitType}`;
            }
            if (searchValue !== "") {
                apiUrl += `&searchValue=${searchValue}`;
            }

            const res = await apiGetClient(apiUrl);
            if (res.status === 200) {
                const formedProjectList: any = res.data.data.content.map(
                    (info: any) => ({
                        ...info,
                        deadLine: calculateDDay(info.recruitPeriod),
                        recruitPeriod: formatDate(info.recruitPeriod),
                    }),
                );
                setSearchProjectList(formedProjectList);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleTypeChange = (e: any) => {
        setSelectOption(e.target.value);
        searchProject(searchValue, e.target.value).then((r) => null);
    };
    const handleInputChange = (e: any) => {
        setSearchValue(e.target.value);
    };
    const handleEnterEvent = (e: any) => {
        if (e.key === "Enter") {
            searchProject(searchValue, selectOption).then((r) => null);
        }
    };
    const clickSearch = () => {
        searchProject(searchValue, selectOption).then((r) => null);
    };
    const handleReload = () => {
        window.location.reload();
    };
    useEffect(() => {
        searchProject(searchValue, selectOption).then((r) => null);
        topicProject().then((r) => null);
    }, []);

    useEffect(() => {
        console.log("list", searchProjectList);
    }, [searchProjectList]);

    return (
        <div>
            <div className="main">
                <div className="main-section">
                    <div className="main-section-title">
                        <div className="main-section-title-star">
                            <img alt="star img" src={starImg} />
                        </div>
                        <div
                            className="main-section-title-talk"
                            onClick={handleReload}
                            role="presentation">
                            <span>프로젝트를</span>
                            <br />
                            <span>만나볼 준비 되었나요?</span>
                            <br />
                            <div className="main-section-title-talk-banner">
                                원하는 프로젝트는 다 만날 수 있어요!
                            </div>
                        </div>
                        <div className="main-section-title-search">
                            <div className="main-section-title-search-select">
                                <select
                                    value={selectOption}
                                    onChange={handleTypeChange}>
                                    {searchList.map((item, index) => {
                                        return (
                                            <option
                                                className="select-option"
                                                value={item.value}
                                                key={item.value}>
                                                {item.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <input
                                onChange={handleInputChange}
                                onKeyDown={handleEnterEvent}
                                className="search-input"
                                type="text"
                                placeholder=""
                            />
                            <FontAwesomeIcon
                                onClick={clickSearch}
                                role="presentation"
                                icon={faMagnifyingGlass}
                                className="glass"
                            />
                        </div>
                    </div>
                    <div className="main-section-categoryList">
                        {mainCategoryList.map((category, index) => (
                            <div
                                className={
                                    categoryFocus.includes(
                                        Object.keys(category)[0],
                                    )
                                        ? "focus"
                                        : "category"
                                }
                                key={index}
                                onClick={() => {
                                    categoryHandle(Object.keys(category)[0]);
                                }}
                                role="none">
                                <span>{Object.values(category)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="main-image">
                    <img alt="메인 사진" src={sampleImg} />
                </div>
            </div>
            <SubProjectPage isNewList={isNewList} deadLineList={deadLineList} />
            <ProjectPage searchProjectList={searchProjectList} />
        </div>
    );
}

export default MainPage;
