import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ListSelector from "../components/Todos/ListSelector";
import UserTodos from "../components/Todos/UserTodos";
import ContainerLayout from "../layouts/ContainerLayout";
import { fetchListsAndTodos } from "../slices/listSlice";
import { IState } from "../store/store";

const Todos = () => {
	const Dispatch = useDispatch();
	const { isAuth } = useSelector((state: IState) => state.UserReducer);
	useEffect(() => {
		if (isAuth === true) Dispatch(fetchListsAndTodos());
	}, [isAuth]);
	return (
		<ContainerLayout transitionVariant="enter-left" title="Your Todos">
			<Wrapper>
				<Box>
					<ListSelector />
					<UserTodos />
				</Box>
			</Wrapper>
		</ContainerLayout>
	);
};

const Wrapper = styled.div`
	display: grid;
	place-items: center;
	width: 100%;
	height: calc(100vh - 100px);
`;
const Box = styled.div`
	height: 50vh;
	width: 50%;
	background-color: rgba(219, 216, 216, 0.9);
	border-radius: 4px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export default Todos;
