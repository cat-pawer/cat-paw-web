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

    const doProcess = (): void => {
        window.opener.postMessage(
            { token: getToken(), from: window.location.href },
            "*",
        );
        window.close();
    };

    useEffect(() => {
        doProcess();
    }, []);

    return <div></div>;
}

export default OauthSuccessPage;
