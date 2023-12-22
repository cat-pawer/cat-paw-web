import React from "react";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

type categoryType = {
    JOIN?: string;
    MY?: string;
};
function MyPage() {
    const navigate = useNavigate();
    const category: categoryType[] = [{JOIN: "참여한"},{MY:"내"}];
    const goBack = () => {
        navigate(-1);
    };
    return (
        <div className="my">
            <div className="detail-btn">
                <div
                    className="detail-btn-previous"
                    onClick={goBack}
                    role="none">
                    <button>이전</button>
                </div>
                <div className="detail-btn-next">
                    <button>버튼</button>
                </div>
            </div>
           <div className="my-page">
               <div className="my-page-menu">
                   <div className="my-page-menu-info">
                   <div className="my-page-menu-info-myPage">
                       <span>마이페이지</span>
                   </div>
                   <div className="my-page-menu-info-manage">
                       <span>내 이력 관리</span>
                       <ul>
                           <li>참여 프로젝트/ 스터디</li>
                           <li>내 프로젝트/ 스터디</li>
                       </ul>
                   </div>
                   <div className="my-page-menu-info-line"></div>
                   <div className="my-page-menu-info-manage">
                       <span>내 정보 관리</span>
                       <ul>
                           <li>
                               포트폴리오 관리
                           </li>
                           <li>설정</li>
                       </ul>
                   </div>
                   </div>
               </div>
               <div className="my-page-section">
                   <div className="my-page-section-info">
                       <div className="my-page-section-info-card">
                           <div className="my-page-section-info-card-flex">
                               <div className="my-page-section-info-card-flex-flex">
                               <div className="my-page-section-info-card-flex-flex-title">
                                   <span>내 포트폴리오</span>
                               </div>
                               <div className="my-page-section-info-card-flex-flex-none">
                                   <span>없음</span>
                               </div>
                               </div>
                               <div className="my-page-section-info-card-flex-sub">
                                   <span>메인으로 설정한 포트폴리오 제목이 노출됩니다.</span>
                               </div>
                           </div>
                           <div>
                               <FontAwesomeIcon icon={ faAngleRight } className="angleRight"/>
                           </div>
                       </div>
                   </div>
                   {category.map((category,index) => (
                       <div className="my-page-section-career">
                           <div className="my-page-section-career-flex">
                               <div className="my-page-section-info-card-flex-flex-title">
                                   <span>{Object.values(category)} 프로젝트/ 스터디</span>
                               </div>
                               <div className="my-page-section-career-flex-more">
                                   <span>더보기</span>
                               </div>
                           </div>
                           <div  className="my-page-section-info">
                               <div className="my-page-section-info-card"></div>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
        </div>
    )
}
export default MyPage;
