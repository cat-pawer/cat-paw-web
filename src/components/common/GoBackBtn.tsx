import React from "react";
import { useNavigate } from "react-router-dom";

function GoBackBtn() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    return (
        <div className="detail-btn">
            <div className="detail-btn-previous" onClick={goBack} role="none">
                <button>이전</button>
            </div>
            <div className="detail-btn-next">
                <button>버튼</button>
            </div>
        </div>
    );
}

export default GoBackBtn;
