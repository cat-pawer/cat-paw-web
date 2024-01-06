import React from "react";
import GoBackBtn from "../components/common/GoBackBtn";

function MyProjectDetailPage() {
    return (
        <div className="detail">
            <GoBackBtn />
            <div className="detail-section">
                <div>
                    <span>◁ 마이페이지</span>
                </div>
                <div className="detail-info">
                    <div className="detail-info-flex">
                        <div>
                            <div className="detail-info-title">
                                <span>인국이와 웹사이트 만들기</span>
                            </div>
                            <div className="detail-info-flex-deadLine">
                                <span>🚨</span>
                                <span>프로젝트 종료일 24.02.23</span>
                            </div>
                            <div className="detail-info-nickname">
                                <span>
                                    참여자: 김인국, 김인국1, 김인국2, 김인국3
                                </span>
                            </div>
                        </div>
                        <div className="detail-info-flex-infoBtn">
                            <button>정보 보기</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-job">
                <div className="my-job-management">
                    <div className="my-page-section-career-flex">
                        <div className="my-page-section-info-card-flex-flex-title">
                            <span>일감 관리</span>
                        </div>
                        <div className="my-page-section-career-flex-more">
                            <span>추가</span>
                        </div>
                    </div>
                    <div className="my-job-management-chart">
                        <div></div>
                    </div>
                </div>
                <div className="my-job-enter">
                    <div className="my-page-section-career-flex">
                        <div className="my-job-enter-title">
                            <span>보드 이름을 입력하세요</span>
                        </div>
                        <div className="my-page-section-career-flex-more">
                            <span>저장하기</span>
                        </div>
                    </div>
                    <div className="my-job-enter-chart">
                        <div></div>
                    </div>
                </div>
            </div>
            <div className="detail-section2">
                <div className="my-job-calender">
                    <div>달력</div>
                    <div>
                        <div>
                            <span>추가</span>
                        </div>
                        <div>
                            <span>편집</span>
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="my-page-section-career-flex">
                    <div className="my-page-section-info-card-flex-flex-title">
                        <span>공지사항</span>
                    </div>
                    <div className="my-page-section-career-flex-more">
                        <span>추가</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProjectDetailPage;
