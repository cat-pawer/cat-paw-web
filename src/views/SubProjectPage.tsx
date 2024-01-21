import React, { useEffect, useState } from "react";
import ProjectList from "../components/board/ProjectList";

type TopicsType = {
    NEW?: string;
    DEAD?: string;
};

const SubProjectPage: React.FC<{ isNewList: any[]; deadLineList: any[] }> = ({
    isNewList,
    deadLineList,
}) => {
    const topics: TopicsType[] = [{ NEW: "신상" }, { DEAD: "마감" }];

    return (
        <div
            className={
                isNewList.length === 0 && deadLineList.length === 0
                    ? "project-null"
                    : "project"
            }>
            {topics.map((topic, index) => (
                <div
                    className={
                        Object.keys(topic)[0] === "NEW"
                            ? isNewList.length === 0
                                ? "project-null"
                                : "project-new"
                            : deadLineList.length === 0
                            ? "project-null"
                            : "project-dead"
                    }
                    key={index}>
                    <div className="project-title">
                        {Object.keys(topic)[0] === "NEW" ? (
                            isNewList.length === 0 ? null : (
                                <span>{Object.values(topic)} 프로젝트</span>
                            )
                        ) : deadLineList.length === 0 ? null : (
                            <span>{Object.values(topic)} 프로젝트</span>
                        )}
                    </div>
                    <div className="project-list">
                        {Object.keys(topic)[0] === "NEW"
                            ? isNewList.map((info, index) => (
                                  <ProjectList
                                      key={index}
                                      index={index}
                                      info={info}
                                      isDead={Object.keys(topic)[0] !== "NEW"}
                                  />
                              ))
                            : deadLineList.map((info, index) => (
                                  <ProjectList
                                      key={index}
                                      index={index}
                                      info={info}
                                      isDead={Object.keys(topic)[0] !== "NEW"}
                                  />
                              ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubProjectPage;
