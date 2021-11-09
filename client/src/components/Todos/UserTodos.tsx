import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../store/store";
import DeleteList from "./DeleteList";
import TodoInputField from "./TodoInputField";
import TodosMapper from "./TodosMapper";

interface Props {}

const UserTodos = (props: Props) => {
	return (
		<Wrapper>
			<TodoInputField />
			<TodosMapper />
			<DeleteList />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 70%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 1em 0px;
	position: relative;
	user-select: none;
`;

export default UserTodos;
