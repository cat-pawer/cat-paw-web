import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    CHAT_EVENT,
    getChatManager,
    MemberInfo,
    Schedule,
} from "../../utils/chat-manager";
import ScheduleInput from "./ScheduleInput";
import CatPawInput from "../common/CatPawInput";

const ScheduleBox: React.FC<{
    isNew: boolean;
    schedule?: Schedule;
    memberList?: Array<MemberInfo>;
}> = ({ isNew, schedule, memberList }) => {
    const [scheduleTitle, setScheduleTitle] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [removeList, setRemoveList] = useState<Array<number>>([]);

    const handleChangeScheduleTitle = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setScheduleTitle(e.target.value);
    };

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    const doScheduleSave = () => {
        getChatManager().addSchedule(scheduleTitle);
        setScheduleTitle("");
    };

    const doScheduleRemove = () => {
        if (schedule) {
            if (window.confirm("삭제하시겠습니까?")) {
                getChatManager().removeSchedule(schedule.id);
            }
        }
    };

    const doSummaryRemove = () => {
        if (schedule) {
            getChatManager().removeScheduleSummary(schedule.id, removeList);
        }
    };

    const handleCheckbox = (summaryId: number) => {
        console.log(removeList);
        if (removeList.includes(summaryId)) {
            setRemoveList([...removeList.filter((id) => id !== summaryId)]);
        } else {
            setRemoveList([...removeList, summaryId]);
        }
    };

    const handleEnterTitle = () => {
        if (schedule)
            getChatManager().addScheduleSummary(schedule.id, newTitle);
        setNewTitle("");
    };

    // const handleScheduleUpdate = (e: Event) => {
    //     const detail = (e as CustomEvent).detail;
    //     console.log(detail);
    // };

    useEffect(() => {
        // getChatManager().addEventListener(
        //     CHAT_EVENT.UPDATE,
        //     handleScheduleUpdate,
        // );
        // return () => {
        //     getChatManager().removeEventListener(
        //         CHAT_EVENT.UPDATE,
        //         handleScheduleUpdate,
        //     );
        // };
    }, []);

    return (
        <div className="schedule-wrapper">
            {isNew ? (
                <div className="title-wrapper">
                    <CatPawInput
                        isNew={true}
                        value={scheduleTitle ?? "보드 이름을 입력해주세요"}
                        changeHandler={handleChangeScheduleTitle}></CatPawInput>
                    <button className="saveBtn" onClick={doScheduleSave}>저장하기</button>
                </div>
            ) : (
                <div className="title-wrapper">
                    <div className="title">{schedule?.title}</div>
                    <div className="btn-wrapper">
                    <button onClick={doScheduleRemove}>보드 삭제</button>
                    <button onClick={doSummaryRemove}>일정 삭제</button>
                    <button>추가</button>
                    </div>
                </div>
            )}
            <div className="schedule-box">
                <div className="schedule-header">
                    <div className="check-area center grid">
                        <input type="checkbox" disabled />
                    </div>
                    <div className="title-area center grid">
                        <div>제목</div>
                    </div>
                    <div className="date-area center grid">
                        <div>일정</div>
                    </div>
                    <div className="state-area center grid">
                        <div>상태값</div>
                    </div>
                    <div className="c-member-area center grid">
                        <div>담당자</div>
                    </div>
                </div>
                <div className="schedule-body">
                    {isNew
                        ? null
                        : schedule?.scheduleSummaryDtoList.map((summary, i) => {
                              return (
                                  <ScheduleInput
                                      key={i + "_" + summary.id}
                                      scheduleId={schedule.id}
                                      scheduleSummary={summary}
                                      checkboxHandler={handleCheckbox}
                                      memberList={
                                          memberList ?? []
                                      }></ScheduleInput>
                              );
                          })}
                    <div className="default-input-wrapper">
                        <div className="check-area center grid">
                            <CatPawInput
                                isNew={false}
                                type="checkbox"
                                value="false"
                            />
                        </div>
                        <div className="title-area center grid">
                            <CatPawInput
                                isNew={false}
                                value={newTitle}
                                changeHandler={handleChangeTitle}
                                enterHandler={handleEnterTitle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleBox;
