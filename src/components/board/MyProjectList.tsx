import React, { useEffect } from "react";
import { projectInfoType } from "@/utils/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MyProjectList: React.FC<{ info: projectInfoType; index: number }> = ({
    info,
    index,
}) => {
    const navigate = useNavigate();

    return (
        <div className="my-page-section-info">
            <div
                className="my-page-section-info-card"
                onClick={() => navigate("/myProjectDetail/" + index)}
                role="none">
                <div className="my-page-section-info-card-content">
                    <div className="my-page-section-info-card-content-title">
                        <span>{info.content}</span>
                    </div>
                    <div
                        className={
                            info.deadLine < 11 || info.deadLine == "day"
                                ? "deadLine"
                                : "my-page-section-info-card-content-dead"
                        }>
                        <span>D-{info.deadLine}</span>
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className="angleRight"
                    />
                </div>
            </div>
        </div>
    );
};

export default MyProjectList;
