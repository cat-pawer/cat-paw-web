import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function OauthSuccessPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const getToken = (): string | null => {
        const token = searchParams.get("token") || "";
        if (token && token.trim() !== "") {
            return token;
        }
        return null;
    };

    const checkMobileDevice = (agent: string) => {
        const mobileRegex = [
            /Android/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i,
        ];

        return mobileRegex.some((mobile) => agent.match(mobile));
    };

    const doProcess = (): void => {
        const isMobile = checkMobileDevice(window.navigator.userAgent);
        if (!isMobile) {
            if (window && window.opener) {
                window.opener.postMessage(
                    { token: getToken(), from: window.location.href },
                    "*",
                );
                window.close();
            }
        }
    };

    useEffect(() => {
        doProcess();
    }, []);

    return <div></div>;
}

export default OauthSuccessPage;
