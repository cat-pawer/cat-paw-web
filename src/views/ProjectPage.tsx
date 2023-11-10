import React from "react";
import {useNavigate} from "react-router-dom";

function ProjectPage() {
  const navigate = useNavigate();
  const List = [
    {
      division: "📓프로젝트",
      subTitle: "[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구함",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "35",
      language: ["Java", "react.js", "vue.js", "HTML", "CSS", "TypeScript"],
    },
    {
      division: "📓프로젝트",
      subTitle:
          "[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구해요. 주 1회 온라인으로만 만나서 빠르게 진행하려고합니다.",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "488",
      language: ["Java", "TS", "react.js"],
    },
    {
      division: "📙스터디",
      subTitle: "[프론트/백개발자] 함께 xxx 프로젝트 성실하게 임하실 분 구함",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "38",
      language: ["Java", "TS", "react.js"],
    },
    {
      division: "📙스터디",
      subTitle:
          "[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구해요. 주 1회 온라인으로만 만나서 빠르게 진행하려고합니다. 어쩌구 저쩌구 이러쿵 저러쿵",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "32",
      language: ["Java", "react.js", "vue.js", "HTML", "CSS", "TypeScript"],
    },
    {
      division: "📙스터디",
      subTitle: "[프론트/백개발자] 함께 zzz 프로젝트 성실하게 임하실 분 구함",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "6",
      language: ["Java", "TS", "react.js"],
    },
    {
      division: "📓프로젝트",
      subTitle: "[프론트/백개발자] 함께 zzz 프로젝트 성실하게 임하실 분 구함",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "5",
      language: ["Java", "TS", "react.js"],
    },
    {
      division: "📓프로젝트",
      subTitle: "[프론트/백개발자] 함께 zzz 프로젝트 성실하게 임하실 분 구함",
      tag: "#프론트 #백 #개발자",
      date: "23.10.12",
      hits: "367",
      comment: "5",
      language: ["Java", "TS", "react.js"],
    },
  ];

  return (
      <div className="whole-project">
        <div className="project-title">
          <span>전체 프로젝트</span>
        </div>
        <div className="whole-project-list">
          {List.map((info, index) => (
              <div key={index} className="whole-project-card">
                <div
                    className="whole-project-list-card"
                    key={index}
                    onClick={() => navigate("/projectDetail/" + index)}
                    role="none"
                >
                  <div className="project-list-section-card-project">
                    <div className="project-list-section-card-project-division">
                      <span>{info.division}</span>
                    </div>
                    <div className="project-list-section-card-project-dead">
                      <span>🚨</span>
                      <span>D-3</span>
                    </div>
                  </div>
                  <div className="whole-project-list-card-tag">
                    <span>{info.tag}</span>
                  </div>
                  <div className="whole-project-list-card-title">
                    <span>{info.subTitle}</span>
                  </div>
                  <div className="whole-project-list-card-bottom">
                    <div className="whole-project-list-card-bottom-language">
                      {info.language.map((item, itemIndex) => (
                          <div
                              key={itemIndex}
                              className="whole-project-list-card-bottom-language-list"
                          >
                            <span className="project-langIcon">●</span>
                            <span>{item}</span>
                          </div>
                      ))}
                    </div>
                    <div className="whole-project-list-card-bottom-line"></div>
                    <div className="whole-project-list-card-bottom-info">
                      <div>
                        <span>마감일 </span>
                        <span>{info.date}</span>
                      </div>
                      <div className="info">
                        <div className="info-comment">
                          <span>댓글 </span>
                          <span>{info.comment}</span>
                        </div>
                        <span>조회수 </span>
                        <span>{info.hits}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}

export default ProjectPage;
