import React from 'react';

function NewProjectPage() {
    const division = [
        {PROJECT: "📓프로젝트"},
        {STUDY: "📙스터디"}
    ]

    return (
        <div className="new-project">
            <div className="new-project-title">
                <span>신상 프로젝트</span>
            </div>
            <div className="new-project-section">
                <div className="new-project-section-card">
                    <div className="new-project-section-card-project">
                        <span>📓프로젝트</span>
                    </div>
                    <div className="new-project-section-card-title">
                        <span>[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구함</span>
                    </div>
                    <div className="new-project-section-card-tag">
                        <span>#프론트 #백 #개발자</span>
                    </div>
                    <div className="new-project-section-card-info">
                        <div className="new-project-section-card-info-day">
                            <span>마감일 </span>
                            <span>23.10.12</span>
                        </div>
                        <div className="new-project-section-card-info-hits">
                            <span>조회수 </span>
                            <span>367</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProjectPage;