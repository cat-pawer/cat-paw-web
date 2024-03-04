import React, { useState } from "react";
import GoBackBtn from "../components/common/GoBackBtn";
import NoticeList from "../components/board/NoticeList";
import { faAngleLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ScheduleList from "../components/schedule/ScheduleList";
import NoticePut from "../components/board/NoticePut";
import Calendar from "../components/common/CustomCalendar";
import moment from "moment";

function MyProjectDetailPage() {
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>(new Date());

    const handleDate = (date: Date) => {
        setDate(date);
    };

    const goMyPage = () => {
        navigate(-1);
    };

    return (
        <div className="detail">
            <GoBackBtn />
            <div className="detail-section">
                <div
                    className="detail-section-previous"
                    onClick={goMyPage}
                    role="presentation"
                    onKeyPress={() => {
                        return;
                    }}>
                    <FontAwesomeIcon icon={faAngleLeft} className="angleLeft" />
                    <span>마이페이지</span>
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
                <div className="my-job-enter">
                    <ScheduleList></ScheduleList>
                </div>
            </div>
            <div className="detail-section2">
                <div className="my-job-calender">
                    <Calendar value={date} handleDateChange={handleDate} />
                    <div className="my-job-calender-schedule">
                        <div className="my-job-calender-schedule-wrap">
                            <div>{moment(date).format("YYYY년 MM월 DD일")}</div>
                            <div className="option">
                                <div className="option-add">
                                    <span>추가</span>
                                </div>
                                <div className="option-edit">
                                    <span>편집</span>
                                </div>
                            </div>
                        </div>
                        <div className="my-job-calender-schedule-enter">
                            <input placeholder="✏️내용을 입력하세요" />
                            <div className="my-notice-put-info-title">
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="icon"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-notice">
                <div className="my-page-section-career-flex">
                    <div className="my-page-section-info-card-flex-flex-title">
                        <span>공지사항</span>
                    </div>
                    <div className="my-page-section-career-flex-more">
                        <span>추가</span>
                    </div>
                </div>
                <NoticeList />
                <NoticePut />
            </div>
        </div>
    );
}

export default MyProjectDetailPage;
