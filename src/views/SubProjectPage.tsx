import React, { useEffect } from "react";
import { apiGetClient } from "../components/utils/api";
import ProjectList from "../components/board/ProjectList";

type TopicsType = {
    NEW?: string;
    DEAD?: string;
};

function SubProjectPage() {
    const topics: TopicsType[] = [{ NEW: "신상" }, { DEAD: "마감" }];
    const newList = [
        {
            division: "📓프로젝트",
            subTitle:
                "[프론트/백개발자] 함께 000 프로젝트 성실하게 임하실 분 구함",
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
            subTitle:
                "[프론트/백개발자] 함께 xxx 프로젝트 성실하게 임하실 분 구함",
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
            subTitle:
                "[프론트/백개발자] 함께 zzz 프로젝트 성실하게 임하실 분 구함",
            tag: "#프론트 #백 #개발자",
            date: "23.10.12",
            hits: "367",
            comment: "6",
            language: "TypeScript JavaScript Java",
        },
        {
            division: "📓프로젝트",
            subTitle:
                "[프론트/백개발자] 함께 zzz 프로젝트 성실하게 임하실 분 구함",
            tag: "#프론트 #백 #개발자",
            date: "23.10.12",
            hits: "367",
            comment: "5",
            language: "TypeScript JavaScript Java",
        },
    ];
    const topicProject = async () => {
        const res = await apiGetClient(
            "/recruit/summary/topics?topic=deadLine&isPage=false&page=0&size=1&sort=created",
        );
        console.log(res);
    };
    useEffect(() => {
        topicProject();
    }, []);

    return (
        <div className="project">
            {topics.map((topic, index) => (
                <div
                    className={
                        Object.keys(topic)[0] === "NEW"
                            ? "project-new"
                            : "project-dead"
                    }
                    key={index}>
                    <div className="project-title">
                        <span>{Object.values(topic)} 프로젝트</span>
                    </div>
                    <div className="project-list">
                        {newList.map((info, index) => (
                            <ProjectList
                                key={index}
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
