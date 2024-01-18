import { saveLocalStorage } from "src/utils/common";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetClient } from "src/utils/api";
import ProjectList from "../components/board/ProjectList";
import { CONSTANTS } from "../constants";
import { OauthProvider } from "../utils/type";

function LoginPage() {
    const navigate = useNavigate();

    const getPopupOptions = (w: number, h: number): string => {
        const dualScreenLeft =
            window.screenLeft !== undefined
                ? window.screenLeft
                : window.screenX;
        const dualScreenTop =
            window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth
            ? window.innerWidth
            : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : screen.width;
        const height = window.innerHeight
            ? window.innerHeight
            : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : screen.height;

        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft;
        const top = (height - h) / 2 / systemZoom + dualScreenTop;
        return `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `;
    };

    const openLoginPopup = (provider: OauthProvider) => {
        window.open(
            `${CONSTANTS.API_SERVER}/oauth/authorization/${provider.valueOf()}`,
            "_blank",
            getPopupOptions(700, 600),
        );
    };

    const loginSuccessProcess = () => {
        navigate("/");
    };

    const loginFailProcess = () => {
        window.alert("로그인 실패");
        navigate("/login");
    };

    const originValidator = (event: MessageEvent) => {
        if (!event || !event.data) return false;
        const { token, from } = event.data as { token: string; from: string };
        // return (
        //     event.origin === CONSTANTS.FRONT &&
        //     from.startsWith(`${CONSTANTS.FRONT}oauth/success`)
        // );
        return from?.indexOf(`${CONSTANTS.FRONT}oauth/success`) > -1;
    };

    const tokenValidator = (event: MessageEvent) => {
        if (!event) return false;
        const data = event.data as { token: string; from: string };

        return !data || !data.token || data.token.trim() !== "";
    };

    const handlePostMessage = (event: MessageEvent) => {
        if (!originValidator(event)) return;

        if (!tokenValidator(event)) {
            loginFailProcess();
            return;
        }
        saveLocalStorage(CONSTANTS.KEY.USER_TOKEN, {
            token: event.data.token as string,
        });
        loginSuccessProcess();
    };

    useEffect(() => {
        window.addEventListener("message", handlePostMessage);
        return () => window.removeEventListener("message", handlePostMessage);
    }, []);

    return (
        <div>
            <button onClick={() => openLoginPopup(OauthProvider.GOOGLE)}>
                구글 로그인
            </button>
            <button onClick={() => openLoginPopup(OauthProvider.NAVER)}>
                네이버 로그인
            </button>
            <a href={`${CONSTANTS.API_SERVER}/oauth/authorization/google`}>
                구글 태그
            </a>
        </div>
    );
}

export default LoginPage;
