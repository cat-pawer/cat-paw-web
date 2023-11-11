import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../app/testSlice";
import Select from "react-select";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const SamplePage = () => {
    const count = useSelector((state) => state.counter.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedOption, handleSelectChange] = useState();
    return (
        <div className="main-section">
            <div>
                <Select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    options={options}
                />
            </div>
            <div>
                <button onClick={() => dispatch(decrement())}>1씩 감소</button>
                <span>{count}</span>
                <button onClick={() => dispatch(increment())}>1씩 증가</button>
            </div>
            <div
                className="main-section-profile"
                onClick={() => navigate("/myprofile")}>
                my profile page
            </div>
        </div>
    );
};

export default SamplePage;
