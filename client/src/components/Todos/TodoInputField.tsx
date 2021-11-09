import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useField } from "../../hooks/useField";
import { addTodo } from "../../slices/listSlice";
import { IState } from "../../store/store";

const TodoInputField = () => {
	const SelectedList = useSelector(
		(state: IState) => state.ListReducer.SelectedList
	);
	const Dispatch = useDispatch();
	const { value, setValue, Submit } = useField("", (value: string) => {
		if (SelectedList !== "")
			Dispatch(addTodo({ todoName: value, listName: SelectedList }));
	});
	return (
		<Form onSubmit={Submit}>
			<InputField
				type="text"
				placeholder="Enter Todo Name"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</Form>
	);
};
const Form = styled.form``;
const InputField = styled.input`
	border: solid 1px white;
	outline: none;
	background-color: transparent;
	border-radius: 4px;
	padding: 0.5em;
`;

export default TodoInputField;
