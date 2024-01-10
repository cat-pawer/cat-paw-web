import { loadLocalStorage, saveLocalStorage } from "src/utils/common";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient, apiGetClient } from "src/utils/api";
import ProjectList from "../components/board/ProjectList";
import { CONSTANTS } from "../constants";
import { CustomMessage, OauthProvider, User } from "../utils/type";
import { getChatManager, Schedule } from "../utils/chat-manager";
import ScheduleBox from "../components/schedule/ScheduleBox";
import ScheduleList from "../components/schedule/ScheduleList";

function ChatTestPage() {
    // const mock = {
    //     scheduleId: 1,
    //     title: "string",
    //     body: "string",
    //     summaryList: [],
    //     created: new Date(),
    //     updated: new Date(),
    //     createdBy: "string",
    //     updatedBy: "string",
    // } as Schedule;

    const memberList = getChatManager().getMemberList();

    const handleClick = (id: string) => {
        apiGetClient(`http://localhost:8080/api/v1/member/token/${id}`)
            .then((res) => {
                const token = res.data.data;
                saveLocalStorage(CONSTANTS.KEY.USER_TOKEN, token);
            })
            .catch((e) => console.log(e));

        saveLocalStorage(CONSTANTS.KEY.USER_INFO, {
            id: Number(id),
            name: "hello",
        } as User);
    };

    return (
        <div>
            <button onClick={() => handleClick("1")}>토큰1 새로고침</button>
            <button onClick={() => handleClick("2")}>토큰2 새로고침</button>
            <ScheduleList></ScheduleList>
        </div>
    );
}

export default ChatTestPage;
