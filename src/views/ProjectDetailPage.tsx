import React, { useEffect, useState } from "react";
import sample1 from "../public/images/sample1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import GoBackBtn from "../components/common/GoBackBtn";
import { apiGetClient } from "src/utils/api";
import { calculateDDay, formatDate } from "src/utils/DateUtil";
import { InfoType } from "@/utils/type";

function ProjectDetailPage() {
    const { state } = useLocation();
    const projectId = state?.projectId;
    const [detailData, setDetailData] = useState<InfoType>();

    const titleList = [
        "프로젝트 소개",
        "프로젝트 진행방향",
        "필요 및 담당 분야",
        "자격 요건",
        "우대 사항",
        "우대 사항",
    ];
    const List = [
        {
            intro:
                "프로젝트에 대한 내용은 이곳에 노출합니다. 프로젝트 생성자가 작성한 내용이에요.\n" +
                "프로젝트에 대한 내용은 이곳에 노출합니다. 프로젝트 생성자가 작성한 내용이에요.프로젝트에 대한 내용은\n" +
                " 이곳에 노출합니다. 프로젝트 생성자가 작성한 내용이에요.",
            progress:
                "프로젝트를 이렇게 이끌어 갈거에요. 그래서 지금 이렇게 사람들을 모집해요.\n" +
                "필요한 부분은 이렇게이고, 이런부분은 제작이 되어 있어요. 또는 이런 부분들의 도움이 필요해요.\n" +
                "또는 처음부터 시작이라 모두 함께 으쌰으쌰 해 볼 사람들이 필요해요.\n" +
                "프로젝트를 이렇게 이끌어 갈거에요. 그래서 지금 이렇게 사람들을 모집해요.\n" +
                "필요한 부분은 이렇게이고, 이런부분은 제작이 되어 있어요. 또는 이런 부분들의 도움이 필요해요.\n" +
                "또는 처음부터 시작이라 모두 함께 으쌰으쌰 해 볼 사람들이 필요해요.",
            areas: "프론트앤드와 백앤드 개발자가 필요해요.",
            qualification:
                "자기계발과 성장에 대한 욕심이 있으신 분\n" +
                "개발 분야에 대한 역량이 있으신 분\n" +
                "성실한 프로젝트 참여가 가능한 분",
            treatment: "열정 보여줄 수 있는 분",
            treatment2:
                "사이드 프로젝트 (100% 재택)\n" +
                "notion, zoom 협업 툴 사용 사이드 프로젝트 형태로 진행을 시작하여, 런칭 후 서비스를 운영하며 가능성이 보인다면 실제 창업까지\n" +
                "이어지게 하는 것이 목표입니다.\n" +
                "부담 없이 궁금한 점이 있으시면 연락 주세요!\n" +
                "*기술 스택은 이전 개발자가 사용한 언어들이라 참고용으로 적어두었으며 새로 시작하셔도 무방하니 참고만 부탁드립니다.",
        },
    ];
    const commentList = [
        {
            nickname: "닉넴1",
            content:
                "내용111111111111111111111111111111111111111111111111111111111111",
        },
        {
            nickname: "닉넴2",
            content:
                "내용22222222222222222222222222222222222222222222222222222222222222222",
        },
        {
            nickname: "닉넴3",
            content:
                "댓글입니다 댓글입니다 댓글입니다 댓글 댓글 긴 댓글입니다. 댓글입니다 댓글입니다 댓글입니다 댓글 댓글 긴 댓글입니다. 댓글입니다 댓글입니다 댓글입니다 댓글 댓글 긴 댓글입니다. ",
        },
        {
            nickname: "닉넴4",
            content: "짧댓",
        },
    ];

    const projectDetail = async () => {
        const res = await apiGetClient(`recruit/detail/${projectId}`);
        if (res) {
            if (res.status === 200) {
                const formedDetailData: any = {
                    ...res.data.data,
                    deadLine: calculateDDay(res.data.data.recruitPeriod),
                    updated: formatDate(res.data.data.updated),
                    recruitPeriod: formatDate(res.data.data.recruitPeriod),
                };
                setDetailData(formedDetailData);
            }
        }
    };

    const handleEnterEvent = (e: any) => {
        if (e.key === "Enter") {
            console.log("등록");
        }
    };

    useEffect(() => {
        projectDetail().then((r) => null);
    }, [projectId]);
    //데이터를 가져온후, 상태 업데이트 , 업데이트된 상태 로그
    useEffect(() => {
        console.log(detailData);
    }, [detailData]);
    return (
        <div>
            {detailData && (
                <div className="detail">
                    <GoBackBtn />
                    <div className="detail-section">
                        <div className="detail-info">
                            <div className="detail-info-tag">
                                {detailData.tagList.map((item, itemIndex) => (
                                    <span key={itemIndex}>#{item.name} </span>
                                ))}
                            </div>
                            <div className="detail-info-title">
                                <span>{detailData.title}</span>
                            </div>
                            <div className="detail-info-nickname">
                                <span>{detailData.id}</span>
                            </div>
                            <div className="detail-info-set">
                                <div className="detail-info-set-regi">
                                    <span>등록일 </span>
                                    <span>{detailData.updated}</span>
                                </div>
                                <div className="detail-info-set-hits">
                                    <span>조회수 </span>
                                    <span>{detailData.viewCount}</span>
                                </div>
                            </div>
                        </div>
                        <div className="detail-data">
                            <div className="detail-data-top">
                                <div className="detail-data-top-left">
                                    <div className="detail-data-top-element">
                                        <span className="detail-data-element">
                                            마감 날짜
                                        </span>
                                        <span className="detail-data-elInfo">
                                            {detailData.recruitPeriod}
                                        </span>
                                    </div>
                                    <div className="detail-data-top-element">
                                        <span className="detail-data-element">
                                            연락 방법
                                        </span>
                                        <span className="detail-data-elInfo">
                                            오픈톡
                                        </span>
                                    </div>
                                    <div className="detail-data-top-element">
                                        <span className="detail-data-element">
                                            모집 인원
                                        </span>
                                        <span className="detail-data-elInfo">
                                            {detailData.peopleNumber}명
                                        </span>
                                    </div>
                                </div>
                                <div className="detail-data-top-right">
                                    <div className="detail-data-top-element">
                                        <span className="detail-data-element">
                                            예상 기간
                                        </span>
                                        <span className="detail-data-elInfo">
                                            {detailData.expectDuration}개월
                                        </span>
                                    </div>
                                    <div className="detail-data-top-element">
                                        <span className="detail-data-element">
                                            진행 방식
                                        </span>
                                        <span className="detail-data-elInfo">
                                            {detailData.onlineType === "ONLINE"
                                                ? "온라인"
                                                : "오프라인"}
                                        </span>
                                    </div>
                                    <div className="detail-data-top-element">
                                        <span className="detail-data-element">
                                            모집 분야
                                        </span>
                                        <span className="detail-data-elInfo">
                                            프론트/백엔드 개발자
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-data-bottom">
                                <div>
                                    <span className="detail-data-element">
                                        사용 언어
                                    </span>
                                </div>
                                <div className="detail-data-bottom-language">
                                    {detailData.techList.map(
                                        (item, itemIndex) => (
                                            <div
                                                className="detail-data-bottom-language-list"
                                                key={itemIndex}>
                                                <span className="detail-langIcon">
                                                    ●
                                                </span>
                                                <span>{item.name}</span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-section2">
                        {List.map((item, index) => (
                            <div key={index} className="detail-intro">
                                <div className="detail-intro-duce">
                                    <span>프로젝트 소개</span>
                                </div>
                                <div className="detail-intro-mainContent">
                                    <span>{item.intro}</span>
                                </div>
                                <div className="detail-intro-img">
                                    <img src={sample1} alt="샘플사진" />
                                </div>
                                <div className="detail-intro-duce">
                                    <span>프로젝트 진행방향</span>
                                </div>
                                <div className="detail-intro-content">
                                    <span>{item.progress}</span>
                                </div>
                                <div className="detail-intro-duce">
                                    <span>필요 및 담당 분야</span>
                                </div>
                                <div className="detail-intro-content">
                                    <span>{item.areas}</span>
                                </div>
                                <div className="detail-intro-duce">
                                    <span>자격 요건</span>
                                </div>
                                <div className="detail-intro-content">
                                    <span>{item.qualification}</span>
                                </div>
                                <div className="detail-intro-duce">
                                    <span>우대 사항</span>
                                </div>
                                <div className="detail-intro-content">
                                    <span>{item.treatment}</span>
                                </div>
                                <div className="detail-intro-duce">
                                    <span>우대 사항</span>
                                </div>
                                <div className="detail-intro-content">
                                    <span>{item.treatment2}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="detail-section3">
                        <div className="detail-intro-duce">
                            <span>댓글</span>
                        </div>
                        <div className="detail-input">
                            <div className="detail-input-comment">
                                <input onKeyDown={handleEnterEvent} />
                            </div>
                            <button>등록하기</button>
                        </div>
                        <div className="detail-subInfo">
                            {commentList.map((comment, index) => (
                                <div
                                    key={index}
                                    className="detail-subInfo-wrap">
                                    <div className="detail-subInfo-wrap-comment">
                                        <div className="detail-subInfo-wrap-comment-user">
                                            <div className="detail-subInfo-wrap-comment-user-nick">
                                                <span>{comment.nickname}</span>
                                            </div>
                                            <div className="detail-subInfo-wrap-comment-user-content">
                                                <span>{comment.content}</span>
                                            </div>
                                        </div>
                                        <div className="detail-subInfo-wrap-comment-close">
                                            <FontAwesomeIcon icon={faTimes} />
                                        </div>
                                    </div>
                                    {index === commentList.length - 1 ? null : (
                                        <div className="detail-subInfo-wrap-line"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectDetailPage;
