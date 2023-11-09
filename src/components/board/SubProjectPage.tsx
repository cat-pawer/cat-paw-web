import React from "react";

function SubProjectPage() {
  const division = [{ PROJECT: "📓프로젝트" }, { STUDY: "📙스터디" }];
  const newList = [
    {
      division: "📓프로젝트",
      subTitle: "[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구함",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "35",
      language: "TypeScript JavaScript Java",
    },
    {
      division: "📓프로젝트",
      subTitle:
        "[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구해요. 주 1회 온라인으로만 만나서 빠르게 진행하려고합니다.",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "488",
      language: "TypeScript JavaScript Java",
    },
    {
      division: "📙스터디",
      subTitle: "[프론트/백개발자] 함께 xxx 프로젝트 성실하게 임하실 분 구함",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "38",
      language: "TypeScript JavaScript Java",
    },
    {
      division: "📙스터디",
      subTitle:
        "[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구해요. 주 1회 온라인으로만 만나서 빠르게 진행하려고합니다.",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "32",
      language: "TypeScript JavaScript Java",
    },
    {
      division: "📙스터디",
      subTitle: "[프론트/백개발자] 함께 zzz 프로젝트 성실하게 임하실 분 구함",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "6",
      language: "TypeScript JavaScript Java",
    },
    {
      division: "📓프로젝트",
      subTitle: "[프론트/백개발자] 함께 zzz 프로젝트 성실하게 임하실 분 구함",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "5",
      language: "TypeScript JavaScript Java",
    },
  ];

  return (
    <div className="project">
      <div className="project-new">
        <div className="project-title">
          <span>신상 프로젝트</span>
        </div>
        <div className="project-list">
          {newList.map((info, index) => (
            <div className="project-list-section" key={index}>
              <div className="project-list-section-card">
                <div className="project-list-section-card-project-division">
                  <span>{info.division}</span>
                </div>
                <div className="project-list-section-card-title">
                  <span>{info.subTitle}</span>
                </div>
                <div className="project-list-section-card-tag">
                  <span>{info.tag}</span>
                </div>
                <div className="project-list-section-card-info">
                  <div className="project-list-section-card-info-day">
                    <span>마감일 </span>
                    <span>{info.date}</span>
                  </div>
                  <div className="project-list-section-card-info-hits">
                    <span>조회수 </span>
                    <span>{info.hits}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="project-dead">
        <div className="project-title">
          <span>마감 프로젝트</span>
        </div>
        <div className="project-list">
          {newList.map((info, index) => (
            <div className="project-list-section" key={index}>
              <div className="project-list-section-card">
                <div className="project-list-section-card-project">
                  <div className="project-list-section-card-project-division">
                    <span>{info.division}</span>
                  </div>
                  <div className="project-list-section-card-project-dead">
                    <span>🚨</span>
                    <span>D-3</span>
                  </div>
                </div>
                <div className="project-list-section-card-title">
                  <span>{info.subTitle}</span>
                </div>
                <div className="project-list-section-card-tag">
                  <span>{info.tag}</span>
                </div>
                <div className="project-list-section-card-info">
                  <div className="project-list-section-card-info-day">
                    <span>마감일 </span>
                    <span>{info.date}</span>
                  </div>
                  <div className="project-list-section-card-info-hits">
                    <span>조회수 </span>
                    <span>{info.hits}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubProjectPage;
