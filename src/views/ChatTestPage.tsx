import { loadLocalStorage, saveLocalStorage } from "src/utils/common";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetClient } from "src/utils/api";
import ProjectList from "../components/board/ProjectList";
import { CONSTANTS } from "../constants";
import { OauthProvider } from "../utils/type";
import { getChatManager } from "../utils/chat-manager";

function ChatTestPage() {
    useEffect(() => {
        console.log("call");
        getChatManager().init();
        return () => {
            getChatManager().leave();
        };
    }, []);

    return <div>hello</div>;
}

export default ChatTestPage;
