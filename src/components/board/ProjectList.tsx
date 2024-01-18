import React from "react";
import { InfoType } from "@/utils/type";
import { useNavigate } from "react-router-dom";

const ProjectList: React.FC<{
    info: InfoType;
    isDead: boolean;
    index: number;
}> = ({ info, isDead, index }) => {
    const navigate = useNavigate();
    const handleCardClick = (id: string) => {
        navigate(`/projectDetail/${id}`, { state: { projectId: id } }); //파라미터 함께 전달
    };

    return (
        <div className="project-list-section">
            <div
                className="project-list-section-card"
                onClick={() => handleCardClick(info.id)}
                role="presentation">
                <div className="project-list-section-card-project">
                    <div className="project-list-section-card-project-recruitType">
                        <span>
                            {info.recruitType === "PROJECT"
                                ? "📓프로젝트"
                                : "📙스터디"}
                        </span>
                    </div>
                    {isDead && (
                        <div className="project-list-section-card-project-dead">
                            <span>🚨</span>
                            <span>D{info.deadLine}</span>
                        </div>
                    )}
                </div>
                <div className="project-list-section-card-title">
                    <span>{info.title}</span>
                </div>
                <div className="project-list-section-card-tag">
                    {info.hashList.map((item: any, itemIndex: number) => (
                        <span key={itemIndex}>#{item.name}</span>
                    ))}
                </div>
                <div className="project-list-section-card-info">
                    <div className="project-list-section-card-info-day">
                        <span>마감일 </span>
                        <span>{info.recruitPeriod}</span>
                    </div>
                    <div className="project-list-section-card-info-viewCount">
                        <span>조회수 </span>
                        <span>{info.viewCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
