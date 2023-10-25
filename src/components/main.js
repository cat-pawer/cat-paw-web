import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../app/testSlice";

const Main = () => {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<div>
			<div>
				<button onClick={() => dispatch(decrement())}>1씩 감소</button>
				<span>{count}</span>
				<button onClick={() => dispatch(increment())}>1씩 증가</button>
			</div>
		</div>
	);
};

export default Main;
