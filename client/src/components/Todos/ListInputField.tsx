import React from "react";
import styled from "styled-components";
import { useField } from "../../hooks/useField";
import { useDispatch } from "react-redux";
import { addList } from "../../slices/listSlice";

const ListInputField = () => {
	const Dispatch = useDispatch();
	const { value, setValue, Submit } = useField("", (value: string) => {
		Dispatch(addList(value));
	});
	return (
		<Form onSubmit={Submit}>
			<NewListInput
				placeholder="Enter List Name"
				onChange={(e) => setValue(e.target.value)}
				value={value}
			/>
		</Form>
	);
};

const Form = styled.form`
	width: 100%;
	height: fit-content;
	display: grid;
	place-items: center;
	padding-bottom: 1em;
`;

const NewListInput = styled.input`
	border: none;
	outline: none;
	border-radius: 4px;
	padding: 0.5em;
	background-color: white;
	font-size: 14px;
`;

export default ListInputField;
