import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getChatManager,
    MemberInfo,
    ScheduleSummary,
} from "../../utils/chat-manager";
import CatPawInput from "../common/CatPawInput";
import Calendar from "../common/CustomCalendar";
import moment from "moment/moment";
// import "../../assets/css/scheduledate.scss";

const ScheduleInput: React.FC<{
    index: number;
    scheduleId: number;
    scheduleSummary: ScheduleSummary;
    memberList: Array<MemberInfo>;
    checkboxHandler?: (id: number) => void;
}> = ({ index, scheduleId, scheduleSummary, memberList, checkboxHandler }) => {
    const [title, setTitle] = useState("");
    const [isCheck, setIsCheck] = useState(false);
    const [fetchDate, setDate] = useState<{
        startDate?: Date | string;
        endDate?: Date | string;
    }>({ startDate: "", endDate: "" });
    const [isCale, setCale] = useState(false);
    const [caleIndex, setCaleIndex] = useState<number | null>(null);

    const handleDate = (date: Date) => {
        // setDate(date)
        console.log("date", date);
        if (fetchDate.startDate === "") {
            setDate({ ...fetchDate, startDate: moment(date).format("YYYY-MM-DD") });
        } else if (fetchDate.endDate === "") {
            setDate({ ...fetchDate, endDate: moment(date).format("YYYY-MM-DD") });
        } else {
            setDate({ startDate: moment(date).format("YYYY-MM-DD"), endDate: "" });
        }
        // handleChangeDate();
    };
    const value: string | Date = fetchDate.startDate || "";
    const delDate = () => {
        setDate({ startDate: "", endDate: "" });
    };
    const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (checkboxHandler) checkboxHandler(scheduleSummary.id);
        setIsCheck(!isCheck);
    };

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const doUpdateSummary = (e: React.ChangeEvent<HTMLInputElement>) => {
        getChatManager().updateScheduleSummary(
            scheduleId,
            Object.assign({}, scheduleSummary, {
                title,
                // todo
                cMemberId: scheduleSummary.cMemberId, //여기 값들 바꿔서 호출
                startDate: scheduleSummary.startDate,
                endDate: scheduleSummary.endDate,
                status: scheduleSummary.status,
            }),
        );
    };

    const handleClickDate = () => {
        setCaleIndex(index);
        setCale(!isCale);
    };
    const handleChangeDate = () => {
        scheduleSummary.startDate = fetchDate.startDate
        scheduleSummary.endDate = fetchDate.endDate
        getChatManager().updateScheduleSummary(scheduleId, {
            ...scheduleSummary,
            startDate: scheduleSummary.startDate,
            endDate: scheduleSummary.endDate,
        });
        console.log("G",scheduleSummary)
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
    useEffect(() => {
        console.log("list", fetchDate);
        handleChangeDate()
        setCale(false);
    }, [fetchDate]);

    return (
        <div className="schedule-input-wrapper">
            <div className="check-area center grid">
                <input
                    type="checkbox"
                    checked={isCheck}
                    onChange={handleChangeCheckbox}
                />
            </div>
            <div className="title-area center grid">
                <CatPawInput
                    value={title}
                    changeHandler={handleChangeTitle}
                    blurHandler={doUpdateSummary}
                />
            </div>
            <div className="date-area center grid">
                {scheduleSummary.startDate === "" || scheduleSummary.startDate === null ? (
                    <div
                        className="date-area-moment backColor"
                        onClick={handleClickDate}
                        role="none">
                        -
                    </div>
                ) : (
                    <div
                        className="date-area-moment"
                        onClick={handleClickDate}
                        role="none">
                        <span>
                            {moment(scheduleSummary.startDate).format("M/D~")}
                        </span>
                        <span>
                            {scheduleSummary.endDate
                                ? moment(scheduleSummary.startDate).format("M") ===
                                  moment(scheduleSummary.endDate).format("M")
                                    ? moment(scheduleSummary.endDate).format("D")
                                    : moment(scheduleSummary.endDate).format("M/D")
                                : null}
                        </span>
                        <div
                            className="date-area-moment-del"
                            onClick={delDate}
                            role="none">
                            <span>x</span>
                        </div>
                    </div>
                )}
                {isCale && caleIndex === index ? (
                    <Calendar value={value} handleDateChange={handleDate} />
                ) : null}
            </div>
            <div className="state-area center grid">
                <button  onClick={handleChangeState}>작업대기</button>
            </div>
            <div className="c-member-area center grid">
                <button onClick={handleChangeCMEmber}></button>
            </div>
        </div>
    );
};

export default ScheduleInput;
