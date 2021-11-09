import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../../store/store";
import Todo from "./Todo";

const TodosMapper = () => {
	const Todos = useSelector((state: IState) => {
		const Todos =
			state.ListReducer.ListsWithTodos[state.ListReducer.SelectedList];
		return Todos ? Todos : null;
	});
	return (
		<Wrapper>
			{Todos !== null &&
				Todos.map((todo) => <Todo todoItem={todo} key={todo.name} />)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 2em 1em;
	overflow-y: auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;

export default TodosMapper;
