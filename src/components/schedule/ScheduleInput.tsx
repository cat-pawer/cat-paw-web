import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getChatManager,
    MemberInfo,
    ScheduleSummary,
} from "../../utils/chat-manager";
import CatPawInput from "../common/CatPawInput";

const ScheduleInput: React.FC<{
    scheduleId: number;
    scheduleSummary: ScheduleSummary;
    memberList: Array<MemberInfo>;
}> = ({ scheduleId, scheduleSummary, memberList }) => {
    const [title, setTitle] = useState("");

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const doUpdateSummary = (e: React.ChangeEvent<HTMLInputElement>) => {
        getChatManager().updateScheduleSummary(scheduleId,
            Object.assign({}, scheduleSummary, {
                title,
                cMemberId: scheduleSummary.cMemberId,
                startDate: scheduleSummary.startDate,
                endDate: scheduleSummary.endDate,
                status: scheduleSummary.status,
            }),
        );
    };

    const handleChangeDate = () => {
        console.log("click");
    };

    const handleChangeState = () => {
        console.log("click");
    };

    const handleChangeCMEmber = () => {
        console.log("click");
    };

    useEffect(() => {
        if (scheduleSummary.id) setTitle(scheduleSummary.title);
    }, []);

    return (
        <div className="schedule-input-wrapper">
            <div className="check-area center grid">
                <input type="checkBox" />
            </div>
            <div className="title-area center grid">
                <CatPawInput
                    value={title}
                    changeHandler={handleChangeTitle}
                    blurHandler={doUpdateSummary}
                />
            </div>
            <div className="date-area center grid">
                <button onClick={handleChangeDate}></button>
            </div>
            <div className="state-area center grid">
                <button onClick={handleChangeState}></button>
            </div>
            <div className="c-member-area center grid">
                <button onClick={handleChangeCMEmber}></button>
            </div>
        </div>
    );
};

export default ScheduleInput;
