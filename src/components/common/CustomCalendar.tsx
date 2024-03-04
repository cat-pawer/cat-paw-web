import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "../../assets/css/calendar.scss";

interface calendarType {
    value: Date | string;
    handleDateChange: (date: Date) => void; //날짜 변경 이벤트 처리
}

const CustomCalendar: React.FC<calendarType> = ({
    value,
    handleDateChange,
}) => {
    // const [value, onChange] = useState<any>(new Date());

    return (
        <div>
            <Calendar
                formatDay={(locale, date) => moment(date).format("D")} //월제외
                showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                locale="en-EN"
                onChange={(date) => handleDateChange(date as Date)}
                value={value}></Calendar>
            {/*{moment(value).format("YYYY년 MM월 DD일")}*/}
        </div>
    );
};
export default CustomCalendar;
