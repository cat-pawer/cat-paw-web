import React, { useEffect, useState } from "react";
import { apiGetClient } from "src/utils/api";
import ProjectList from "../components/board/ProjectList";
import axios from "axios";

type TopicsType = {
    NEW?: string;
    DEAD?: string;
};

function SubProjectPage() {
    const topics: TopicsType[] = [{ NEW: "신상" }, { DEAD: "마감" }];
    const [deadLineList, setDeadLineList] = useState([]);
    const [isNewList, setIsNewList] = useState([]);

    const newList = [
        {
            recruitType: "📓프로젝트",
            title: "[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구함",
            hashTag: "#프론트 #백 #개발자",
            recruitPeriod: "23.10.12",
            viewCount: 367,
            commentCount: 35,
            language: "TypeScript JavaScript Java",
        },
        {
            recruitType: "📓프로젝트",
            title: "[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구해요. 주 1회 온라인으로만 만나서 빠르게 진행하려고합니다.",
            hashTag: "#프론트 #백 #개발자",
            recruitPeriod: "23.10.12",
            viewCount: 367,
            commentCount: 488,
            language: "TypeScript JavaScript Java",
        },
        {
            recruitType: "📙스터디",
            title: "[프론트/백개발자] 함께 xxx 프로젝트 성실하게 임하실 분 구함",
            hashTag: "#프론트 #백 #개발자",
            recruitPeriod: "23.10.12",
            viewCount: 367,
            commentCount: 38,
            language: "TypeScript JavaScript Java",
        },
        {
            recruitType: "📙스터디",
            title: "[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구해요. 주 1회 온라인으로만 만나서 빠르게 진행하려고합니다.",
            hashTag: "#프론트 #백 #개발자",
            recruitPeriod: "23.10.12",
            viewCount: 367,
            commentCount: 3,
            language: "TypeScript JavaScript Java",
        },
        {
            recruitType: "📙스터디",
            title: "[프론트/백개발자] 함께 zzz 프로젝트 성실하게 임하실 분 구함",
            hashTag: "#프론트 #백 #개발자",
            recruitPeriod: "23.10.12",
            viewCount: 367,
            commentCount: 6,
            language: "TypeScript JavaScript Java",
        },
        {
            recruitType: "📓프로젝트",
            title: "[프론트/백개발자] 함께 zzz 프로젝트 성실하게 임하실 분 구함",
            hashTag: "#프론트 #백 #개발자",
            recruitPeriod: "23.10.12",
            viewCount: 367,
            commentCount: 5,
            language: "TypeScript JavaScript Java",
        },
    ];
    const topicProject = async () => {
        const resDead = await apiGetClient(
            "/recruit/summary/topics?topic=deadLine&isPage=false&page=0&size=5&sort=created",
        );
        const resNew = await apiGetClient(
            "/recruit/summary/topics?topic=isNew&isPage=false&page=0&size=5&sort=created",
        );
        if (resDead) {
            if (resDead.status === 200) {
                console.log("resDead", resDead.data.data.content);
                //디데이계산
                function calculateDDay(recruitPeriod: any) {
                    const today: any = new Date();
                    const deadLineDay: any = new Date(recruitPeriod);
                    const timeDiff = deadLineDay - today;
                    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    if (dayDiff == 0) {
                        return "-day";
                    } else return dayDiff > 0 ? `-${dayDiff}` : `+${Math.abs(dayDiff)}`;
                }
                const formedProjectList:any = resDead.data.data.content.map((info: any) => ({
                    ...info,
                    deadLine: calculateDDay(info.recruitPeriod),
                }));

                console.log("form",formedProjectList)
                setDeadLineList(formedProjectList)
            }
        }
        if (resNew) {
            if (resNew.status === 200) {
                console.log("resNew:", resNew.data.data.content);
                setIsNewList(resNew.data.data.content);
            }
        }

    };


    useEffect(() => {
        topicProject().then((r) => null);
    }, []);

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
}

export default SubProjectPage;
