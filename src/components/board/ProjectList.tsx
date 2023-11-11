import React from "react";
import { InfoType } from "@/utils/type";

const ProjectList: React.FC<{ info: InfoType; isDead: boolean }> = ({
    info,
    isDead,
}) => {
    return (
        <div className="project-list-section">
            <div className="project-list-section-card">
                <div className="project-list-section-card-project">
                    <div className="project-list-section-card-project-division">
                        <span>{info.division}</span>
                    </div>
                    {isDead && (
                        <div className="project-list-section-card-project-dead">
                            <span>🚨</span>
                            <span>D-3</span>
                        </div>
                    )}
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
    );
};

export default ProjectList;
