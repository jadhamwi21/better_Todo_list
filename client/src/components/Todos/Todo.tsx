import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ApiEndpoint } from "../../constants/constants";
import { changeTodoStatus, deleteTodo } from "../../slices/listSlice";
import { IState } from "../../store/store";
import { Todo as TodoType } from "../../types/types";
import CrossTodo from "./CrossTodo";

interface Props {
	todoItem: TodoType;
}

const Todo = ({ todoItem }: Props) => {
	const SelectedList = useSelector(
		(state: IState) => state.ListReducer.SelectedList
	);
	const Dispatch = useDispatch();
	return (
		<TodoContainer>
			<Wrapper>
				<TodoName
					onClick={() => {
						Dispatch(
							changeTodoStatus({
								todoName: todoItem.name,
								todoStatus:
									todoItem.status === "completed" ? "in progress" : "completed",
								listName: SelectedList,
							})
						);
					}}
				>
					{todoItem.name}
				</TodoName>
				<TodoDeleteElement
					onClick={() => {
						Dispatch(
							deleteTodo({
								listName: SelectedList,
								todoName: todoItem.name,
							})
						);
					}}
				>
					Delete
				</TodoDeleteElement>
				<CrossTodo todo={todoItem} />
			</Wrapper>
		</TodoContainer>
	);
};
const TodoContainer = styled.div`
	height: fit-content;
	width: 75%;
	background-color: white;
	padding: 0.5em;
	border-radius: 2px;
	margin: 0.5em;
	user-select: none;
	position: relative;
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	position: relative;
`;
const TodoName = styled.div`
	cursor: pointer;
	width: 90%;
	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
`;

const TodoDeleteElement = styled.div`
	color: #4040ff;
	font-size: 12px;
	cursor: pointer;
	width: 10%;
	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
`;

export default Todo;
