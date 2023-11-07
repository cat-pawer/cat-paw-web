import React from "react";
import sample1 from "../../public/images/sample1.png";

function ProjectDetailPage() {
    return (
        <div className="detail">
            <div className="detail-section">
                <div className="detail-info">
                    <div className="detail-info-tag">
                        <span>#프론트 #백 #개발자</span>
                    </div>
                    <div className="detail-info-title">
                        <span>[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구해요. 주 1회 온라인으로만 만나서 빠르게 진행하려고 합니다. 어쩌구 저쩌구 이러쿵 저러쿵</span>
                    </div>
                    <div className="detail-info-nickname">
                        <span>김인국바보</span>
                    </div>
                    <div className="detail-info-set">
                        <div className="detail-info-set-regi">
                            <span>등록일 </span>
                            <span>23.10.01</span>
                        </div>
                        <div className="detail-info-set-hits">
                            <span>조회수 </span>
                            <span>24</span>
                        </div>
                    </div>
                </div>
                <div className="detail-data">
                    <div className="detail-data-top">
                        <div className="detail-data-top-left">
                            <div className="detail-data-top-element">
                                <span className="detail-data-element">마감 날짜</span>
                                <span className="detail-data-elInfo">23.10.11</span>
                            </div>
                            <div className="detail-data-top-element">
                                <span className="detail-data-element">연락 방법</span>
                                <span className="detail-data-elInfo">오픈톡</span>
                            </div>
                            <div className="detail-data-top-element">
                                <span className="detail-data-element">모집 인원</span>
                                <span className="detail-data-elInfo">6명</span>
                            </div>
                        </div>
                        <div className="detail-data-top-right">
                            <div className="detail-data-top-element">
                                <span className="detail-data-element">예상 기간</span>
                                <span className="detail-data-elInfo">4개월</span>
                            </div>
                            <div className="detail-data-top-element">
                                <span className="detail-data-element">진행 방식</span>
                                <span className="detail-data-elInfo">온라인</span>
                            </div>
                            <div className="detail-data-top-element">
                                <span className="detail-data-element">모집 분야</span>
                                <span className="detail-data-elInfo">프론트/백엔드 개발자</span>
                            </div>
                        </div>
                    </div>
                    <div className="detail-data-bottom">
                        <div><span className="detail-data-element">사용 언어</span></div>
                        <div className="detail-data-bottom-language">
                            <div className="detail-data-bottom-language-list">
                                <span className="detail-langIcon">●</span>
                                <span>JavaScript</span>
                            </div>
                            <div className="detail-data-bottom-language-list">
                                <span className="detail-langIcon">●</span>
                                <span>TypeScript</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail-section2">
                <div className="detail-intro">
                    <div className="detail-intro-duce">
                        <span>프로젝트 소개</span>
                    </div>
                    <div className="detail-intro-mainContent">
                    <span>
                        프로젝트에 대한 내용은 이곳에 노출합니다. 프로젝트 생성자가 작성한 내용이에요.
                        프로젝트에 대한 내용은 이곳에 노출합니다. 프로젝트 생성자가 작성한 내용이에요.프로젝트에 대한 내용은
                        이곳에 노출합니다. 프로젝트 생성자가 작성한 내용이에요.
                    </span>
                    </div>
                    <div className="detail-intro-img">
                        <img src={sample1} alt="sample image"/>
                    </div>
                    <div className="detail-intro-duce">
                        <span>프로젝트 진행방향</span>
                    </div>
                    <div className="detail-intro-content">
                    <span>
                        프로젝트를 이렇게 이끌어 갈거에요. 그래서 지금 이렇게 사람들을 모집해요.<br/>
                        필요한 부분은 이렇게이고, 이런부분은 제작이 되어 있어요. 또는 이런 부분들의 도움이 필요해요.<br/>
                        또는 처음부터 시작이라 모두 함께 으쌰으쌰 해 볼 사람들이 필요해요.<br/>
                        프로젝트를 이렇게 이끌어 갈거에요. 그래서 지금 이렇게 사람들을 모집해요.<br/>
                        필요한 부분은 이렇게이고, 이런부분은 제작이 되어 있어요. 또는 이런 부분들의 도움이 필요해요.<br/>
                        또는 처음부터 시작이라 모두 함께 으쌰으쌰 해 볼 사람들이 필요해요.<br/>
                    </span>
                    </div>
                    <div className="detail-intro-duce">
                        <span>필요 및 담당 분야</span>
                    </div>
                    <div className="detail-intro-content">
                    <span>
                        프론트앤드와 백앤드 개발자가 필요해요.
                    </span>
                    </div>
                    <div className="detail-intro-duce">
                        <span>자격 요건</span>
                    </div>
                    <div className="detail-intro-content">
                    <span>
                        자기계발과 성장에 대한 욕심이 있으신 분<br/>
                        개발 분야에 대한 역량이 있으신 분<br/>
                        성실한 프로젝트 참여가 가능한 분<br/>
                    </span>
                    </div>
                    <div className="detail-intro-duce">
                        <span>우대 사항</span>
                    </div>
                    <div className="detail-intro-content">
                    <span>
                        열정 보여줄 수 있는 분
                    </span>
                    </div>
                    <div className="detail-intro-duce">
                        <span>우대 사항</span>
                    </div>
                    <div className="detail-intro-content">
                    <span>
                        사이드 프로젝트 (100% 재택)<br/>
                        notion, zoom 협업 툴 사용 사이드 프로젝트 형태로 진행을 시작하여, 런칭 후 서비스를 운영하며 가능성이 보인다면 실제 창업까지
                        이어지게 하는 것이 목표입니다.<br/>

                        부담 없이 궁금한 점이 있으시면 연락 주세요!<br/>
                        *기술 스택은 이전 개발자가 사용한 언어들이라 참고용으로 적어두었으며 새로 시작하셔도 무방하니 참고만 부탁드립니다.<br/>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetailPage;