import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ProjectPage: React.FC<{searchProjectList: any[]}> = ({searchProjectList}) => {
    const navigate = useNavigate();

    useEffect(() => {

    }, [searchProjectList]);
    return (
        <div className="whole-project">
            <div className={searchProjectList.length === 0 ? "project-none" : "project-title"}>
                {searchProjectList.length === 0 ? <span>프로젝트 없음</span> : <span>전체 프로젝트</span>}
            </div>
            <div className="whole-project-list">
                {searchProjectList.map((info, index) => (
                    <div key={index} className="whole-project-card">
                        <div
                            className="whole-project-list-card"
                            key={index}
                            onClick={() => navigate("/projectDetail/" + index)}
                            role="none">
                            <div className="project-list-section-card-project">
                                <div className="project-list-section-card-project-recruitType">
                                    <span>{info.recruitType === "PROJECT"
                                        ? "📓프로젝트"
                                        : "📙스터디"}</span>
                                </div>
                                <div className="project-list-section-card-project-dead">
                                    <span>🚨</span>
                                    <span>D{info.deadLine}</span>
                                </div>
                            </div>
                                <div  className="whole-project-list-card-tag">
                                    {info.hashList.map((item:any,itemIndex:number)=>(
                                        <span key={itemIndex}>#{item.name}</span>
                                    ))}
                                </div>
                            <div className="whole-project-list-card-title">
                                <span>{info.title}</span>
                            </div>
                            <div className="whole-project-list-card-bottom">
                                <div className="whole-project-list-card-bottom-techList">
                                    {info.techList.map((item:any, itemIndex:number) => (
                                        <div
                                            key={itemIndex}
                                            className="whole-project-list-card-bottom-techList-list">
                                            <span className="project-langIcon">
                                                ●
                                            </span>
                                            <span>{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="whole-project-list-card-bottom-line"></div>
                                <div className="whole-project-list-card-bottom-info">
                                    <div>
                                        <span>마감일 </span>
                                        <span>{info.recruitPeriod}</span>
                                    </div>
                                    <div className="info">
                                        <div className="info-commentCount">
                                            <span>댓글 </span>
                                            <span>{info.commentCount}</span>
                                        </div>
                                        <div>
                                            <span>조회수 </span>
                                            <span>{info.viewCount}</span>
                                        </div>
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
