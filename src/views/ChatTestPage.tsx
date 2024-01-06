import { loadLocalStorage, saveLocalStorage } from "src/utils/common";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient, apiGetClient } from "src/utils/api";
import ProjectList from "../components/board/ProjectList";
import { CONSTANTS } from "../constants";
import { CustomMessage, OauthProvider, User } from "../utils/type";
import { getChatManager } from "../utils/chat-manager";

function ChatTestPage() {
    const handleClick = () => {
        apiGetClient("http://localhost:8080/api/v1/member/token")
            .then((res) => {
                const token = res.data.data;
                console.log("token" + token);
                saveLocalStorage(CONSTANTS.KEY.USER_TOKEN, token);
            })
            .catch((e) => console.log(e));

        saveLocalStorage(CONSTANTS.KEY.USER_INFO, {
            id: "1",
            name: "hello",
        } as User);
    };

    const handleSend = () => {
        if (getChatManager()) {
            const msg = {
                destination: "cc",
                body: {},
                headers: { token: "hi" },
            } as CustomMessage;
            getChatManager().sendMessage(msg);
        }
    };

    useEffect(() => {
        console.log("call");
        getChatManager().init("1");
        return () => {
            getChatManager().destroy();
        };
    }, []);

    return (
        <div>
            <button onClick={handleClick}>토큰 새로고침</button>
            <button onClick={handleSend}>전송</button>
        </div>
    );
}

export default ChatTestPage;
