import { saveLocalStorage } from "src/utils/common";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiGetClient } from "src/utils/api";
import ProjectList from "../components/board/ProjectList";
import { CONSTANTS } from "../constants";
import { OauthProvider } from "../utils/type";

function LoginMobilePage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

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

    const loginFailProcess = () => {
        window.alert("로그인 실패");
        navigate("/login");
    };

    useEffect(() => {
        console.log("provider", searchParams.get("provider"));
        if (searchParams.get("provider") === OauthProvider.GOOGLE) {
            openLoginPopup(OauthProvider.GOOGLE);
        } else if (searchParams.get("provider") === OauthProvider.NAVER) {
            openLoginPopup(OauthProvider.NAVER);
        } else {
            window.alert("지원하지 않는 로그인 방식입니다.");
        }
    }, []);

    return <div></div>;
}

export default LoginMobilePage;
