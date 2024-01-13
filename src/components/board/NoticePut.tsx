import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencil } from "@fortawesome/free-solid-svg-icons";

const NoticePut = () => {
    return (
        <div className="my-notice-put">
            <div className="my-notice-put-info">
                <div className="my-notice-put-info-title">
                    <div className="my-notice-put-info-title-input">
                        {/*<FontAwesomeIcon icon={faPencil} className="icon" />*/}
                        <input
                            className="input-title"
                            placeholder="내용을 입력하세요"
                        />
                    </div>
                    <div className="my-notice-put-info-title-del">
                        <FontAwesomeIcon icon={faTimes} className="icon" />
                    </div>
                </div>
            </div>
            <div className="my-notice-put-line"></div>
            <div className="my-notice-put-content">
                <input
                    className="input-title"
                    placeholder="내용을 입력하세요"
                />
            </div>
        </div>
    );
};

export default NoticePut;
