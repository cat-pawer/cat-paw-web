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
    const [isCale, setCale] = useState(false);
    const [caleIndex, setCaleIndex] = useState<number | null>(null);
    const [selectOption, setSelectOption] = useState<any>("");
    const stateValue: { value: any; label: string }[] = [
        { value: 0, label: ""},
        { value: "1", label: "작업대기" },
        { value: "2", label: "작업중" },
        { value: 3, label: "작업완료" },
        { value: 4, label: "확인필요" },
    ];

    const value = "";
    const delDate = () => {
        getChatManager().updateScheduleSummary(scheduleId, {
            ...scheduleSummary,
            startDate: "",
            endDate: "",
        });
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
    const handleChangeDate = (date: Date) => {
        if(scheduleSummary.startDate === "" || scheduleSummary.startDate === null){
            getChatManager().updateScheduleSummary(scheduleId, {
                ...scheduleSummary,
                startDate: moment(date).format("YYYY-MM-DD"),
            });
        } else if(scheduleSummary.endDate === "" || scheduleSummary.endDate === null){
            getChatManager().updateScheduleSummary(scheduleId, {
                ...scheduleSummary,
                endDate: moment(date).format("YYYY-MM-DD"),
            });
        } else {
            getChatManager().updateScheduleSummary(scheduleId, {
                ...scheduleSummary,
                startDate: moment(date).format("YYYY-MM-DD"),
                endDate: "",
            });
        }
    };

    const handleChangeState = (e: any) => {
        setSelectOption(e.target.value);
        getChatManager().updateScheduleSummary(scheduleId, {
            ...scheduleSummary,
            status: e.target.value
        });
    };

    const backClass = (value: string) => {
        switch (value) {
            case "1":
                return "wait-bg"
            case "2":
                return "work-bg"
            case "3":
                return "cp-bg"
            case "4":
                return "check-bg"
            default:
                return ""
        }
    }

    const handleChangeCMEmber = () => {
        console.log("click");
    };

    useEffect(() => {
        if (scheduleSummary.id)
            setTitle(scheduleSummary.title);
            setCale(false);
    }, [scheduleSummary]);

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
                        className={`date-area-moment ${backClass(selectOption)}`}
                        onClick={handleClickDate}
                        role="none">
                        <span>
                            {moment(new Date(scheduleSummary.startDate)).format("M/D~")}
                        </span>
                        <span>
                            {scheduleSummary.endDate
                                ? moment(new Date(scheduleSummary.startDate)).format("M") ===
                                  moment(new Date(scheduleSummary.endDate)).format("M")
                                    ? moment(new Date(scheduleSummary.endDate)).format("D")
                                    : moment(new Date(scheduleSummary.endDate)).format("M/D")
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
                    <Calendar value={value} handleDateChange={handleChangeDate} />
                ) : null}
            </div>
            <div className="state-area center grid">
                <select
                    className={`state-area-select ${backClass(selectOption)}`}
                    value={scheduleSummary.status}
                    onChange={handleChangeState}>
                    {stateValue.map((item, index) => {
                        return (
                            <option
                                className="select-option"
                                value={item.value}
                                key={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="c-member-area center grid">
                <button onClick={handleChangeCMEmber}></button>
            </div>
        </div>
    );
};

export default ScheduleInput;
