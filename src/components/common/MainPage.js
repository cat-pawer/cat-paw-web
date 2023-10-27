import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../app/testSlice";
import Select from 'react-select';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const MainPage = () => {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();
	const [selectedOption, handleSelectChange] = useState();
	return (
		<div>
			<div>
				<Select value={selectedOption} onChange={handleSelectChange} options={options}/>
			</div>
			<div>
				<button onClick={() => dispatch(decrement())}>1씩 감소</button>
				<span>{count}</span>
				<button onClick={() => dispatch(increment())}>1씩 증가</button>
			</div>
		</div>
	);
};

export default MainPage;
