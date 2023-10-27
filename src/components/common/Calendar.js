import React, {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

const CustomCalendar = () => {
    const [ value, onChange] = useState(new Date());

    return(
        <div>
            <Calendar onChange={onChange} value={value}></Calendar>
            {moment(value).format("YYYY년 MM월 DD일")}
        </div>
    );
}
export default CustomCalendar;