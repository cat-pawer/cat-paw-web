import React, { useEffect, useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NoticeList() {
    const [isModal, setModal] = useState(false);
    const [modalIndex, setModalIndex] = useState<number | null>(null);

    const noticeList = [
        {
            title: "공지사항1",
            content:
                "작성한 상세 내용은 이렇게 보여집니다. 공유한 내용을 다 확인하였다면, 화살표를 눌러서 닫을 수 있습니다. 글 작성은 상단의 추가 버튼을 클릭 하면 해당 형태가 노출됩니다." +
                "작성한 상세 내용은 이렇게 보여집니다. 공유한 내용을 다 확인하였다면, 화살표를 눌러서 닫을 수 있습니다. 글 작성은 상단의 추가 버튼을 클릭 하면 해당 형태가 노출됩니다." +
                "작성한 상세 내용은 이렇게 보여집니다. 공유한 내용을 다 확인하였다면, 화살표를 눌러서 닫을 수 있습니다. 글 작성은 상단의 추가 버튼을 클릭 하면 해당 형태가 노출됩니다.",
        },
        {
            title: "공지사항2",
            content:
                "작성한 상세 내용은 이렇게 보여집니다. 공유한 내용을 다 확인하였다면, 화살표를 눌러서 닫을 수 있습니다. 글 작성은 상단의 추가 버튼을 클릭 하면 해당 형태가 노출됩니다." +
                "작성한 상세 내용은 이렇게 보여집니다. 공유한 내용을 다 확인하였다면, 화살표를 눌러서 닫을 수 있습니다. 글 작성은 상단의 추가 버튼을 클릭 하면 해당 형태가 노출됩니다.",
        },
        {
            title: "공지사항3",
            content:
                "작성한 상세 내용은 이렇게 보여집니다. 공유한 내용을 다 확인하였다면, 화살표를 눌러서 닫을 수 있습니다. 글 작성은 상단의 추가 버튼을 클릭 하면 해당 형태가 노출됩니다.",
        },
    ];
    const openModal = (index: number) => {
        setModalIndex(index);
        setModal(true);
    };
    const closeModal = (index: number) => {
        setModalIndex(index);
        setModal(false);
    };
    return (
        <div className="my-notice-info">
            {noticeList.map((info, index) => (
                <div
                    key={index}
                    className={
                        isModal && modalIndex === index
                            ? "my-notice-info-modalOn"
                            : "my-notice-info-modal"
                    }>
                    <div className="my-notice-info-modal-info">
                        <div className="my-notice-info-modal-info-title">
                            <div className="my-notice-info-modal-info-title-width">
                                <span>{info.title}</span>
                            </div>
                            <div className="my-notice-info-modal-info-title-edit">
                                <span>편집</span>
                            </div>
                        </div>
                        {isModal && modalIndex === index ? (
                            <div
                                className="my-notice-info-modal-info-angle"
                                onClick={() => closeModal(index)}
                                role="presentation"
                                onKeyPress={() => {
                                    return;
                                }}>
                                <FontAwesomeIcon
                                    icon={faAngleUp}
                                    className="angleDown"
                                />
                            </div>
                        ) : (
                            <div
                                className="my-notice-info-modal-info-angle"
                                onClick={() => openModal(index)}
                                role="presentation"
                                onKeyPress={() => {
                                    return;
                                }}>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className="angleDown"
                                />
                            </div>
                        )}
                    </div>
                    {isModal && modalIndex === index ? (
                        <div className="my-notice-info-modalOn-content">
                            <div className="my-notice-info-modalOn-content-line"></div>
                            <div className="my-notice-info-modalOn-content-web">
                                <span>{info.content}</span>
                            </div>
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
}
export default NoticeList;
