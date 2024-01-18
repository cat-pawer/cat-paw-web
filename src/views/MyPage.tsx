import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import MyProjectList from "../components/board/MyProjectList";
import GoBackBtn from "../components/common/GoBackBtn";
import { calculateDDay } from "../utils/DateUtil";

type categoryType = {
    JOIN?: string;
    MY?: string;
};
function MyPage() {
    const navigate = useNavigate();
    const category: categoryType[] = [{ JOIN: "참여한" }, { MY: "내" }];

    const projectList = [
        {
            content:
                "[프론트/백개발자] 함께 000프로젝트 성실하게 임하실 분 구해요오오오오오오오오오오오오",
            deadLine: "2023.12.31",
        },
        {
            content:
                "[프론트/백개발자] 함께 000프로젝트 성실하게 임하실 분 구해요",
            deadLine: "2024.01.09",
        },
        {
            content:
                "[프론트/백개발자] 함께 000프로젝트 성실하게 임하실 분 구해요이",
            deadLine: "2024.01.20",
        },
    ];

    const formedProjectList = projectList.map((project) => ({
        ...project,
        deadLine: calculateDDay(project.deadLine),
    }));

    return (
        <div className="my">
            <GoBackBtn />
            <div className="my-page">
                <div className="my-page-menu">
                    <div className="my-page-menu-info">
                        <div className="my-page-menu-info-myPage">
                            <span>마이페이지</span>
                        </div>
                        <div className="my-page-menu-info-manage">
                            <span>내 이력 관리</span>
                            <ul>
                                <li>참여 프로젝트/ 스터디</li>
                                <li>내 프로젝트/ 스터디</li>
                            </ul>
                        </div>
                        <div className="my-page-menu-info-line"></div>
                        <div className="my-page-menu-info-manage">
                            <span>내 정보 관리</span>
                            <ul>
                                <li>포트폴리오 관리</li>
                                <li>설정</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="my-page-section">
                    <div className="my-page-section-info">
                        <div className="my-page-section-info-card">
                            <div className="my-page-section-info-card-flex">
                                <div className="my-page-section-info-card-flex-flex">
                                    <div className="my-page-section-info-card-flex-flex-title">
                                        <span>내 포트폴리오</span>
                                    </div>
                                    <div className="my-page-section-info-card-flex-flex-none">
                                        <span>없음</span>
                                    </div>
                                </div>
                                <div className="my-page-section-info-card-flex-sub">
                                    <span>
                                        메인으로 설정한 포트폴리오 제목이
                                        노출됩니다.
                                    </span>
                                </div>
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className="angleRight"
                                />
                            </div>
                        </div>
                    </div>
                    {category.map((category, index) => (
                        <div className="my-page-section-career" key={index}>
                            <div className="my-page-section-career-flex">
                                <div className="my-page-section-info-card-flex-flex-title">
                                    <span>
                                        {Object.values(category)} 프로젝트/
                                        스터디
                                    </span>
                                </div>
                                <div className="my-page-section-career-flex-more">
                                    <span>더보기</span>
                                </div>
                            </div>
                            {formedProjectList.map((project, index) => (
                                <MyProjectList
                                    key={index}
                                    info={project}
                                    index={index}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default MyPage;
