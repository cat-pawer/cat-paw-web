import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    CHAT_EVENT,
    getChatManager,
    MemberInfo,
    Schedule,
} from "../../utils/chat-manager";
import ScheduleBox from "./ScheduleBox";
import CatPawInput from "../common/CatPawInput";
import { MessageDto, MessageType } from "@/utils/type";

const ScheduleList: React.FC = () => {
    const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
    const [memberList, setMemberList] = useState<MemberInfo[]>([]);

    const handleScheduleUpdate = (e: Event) => {
        const message = (e as CustomEvent).detail as MessageDto;
        setScheduleList([...getChatManager().getScheduleList()]);
    };

    const handleInitComplete = (e: Event) => {
        setScheduleList([...getChatManager().getScheduleList()]);
        setMemberList([...getChatManager().getMemberList()]);
    };

    useEffect(() => {
        getChatManager().init(1); //id값 뽑아서 넣기 달력페이지 마운트하기
        getChatManager().addEventListener(
            CHAT_EVENT.INIT_COMPLETE, //다 호출
            handleInitComplete,
        );
        getChatManager().addEventListener(
            CHAT_EVENT.UPDATE, //순서될때마다 호출
            handleScheduleUpdate,
        );
        return () => {
            getChatManager().removeEventListener(
                CHAT_EVENT.INIT_COMPLETE,
                handleInitComplete,
            );
            getChatManager().removeEventListener(
                CHAT_EVENT.UPDATE,
                handleScheduleUpdate,
            );
            getChatManager().destroy();
        };
    }, []);

    return (
        <div className="schedule-list-wrapper">
            {scheduleList.map((schedule, i) => {
                return (
                    <ScheduleBox
                        isNew={false}
                        schedule={schedule}
                        memberList={memberList}
                        key={i + "_" + new Date().getTime()}></ScheduleBox>
                );
            })}
            <ScheduleBox isNew={true}></ScheduleBox>
        </div>
    );
};

export default ScheduleList;
