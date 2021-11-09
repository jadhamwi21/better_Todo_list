import React, { useState } from "react";
import styled from "styled-components";
import { Todo } from "../../types/types";

interface Props {
	todo: Todo;
}

const CrossTodo = ({ todo }: Props) => {
	return (
		<Container>
			<Cross
				className={`cross_${todo.status === "completed" ? "on" : "off"}`}
			/>
		</Container>
	);
};
const Container = styled.div`
	z-index: 5;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding: 0px;
	color: white;
	background-color: transparent;
	pointer-events: none;
`;
const Cross = styled.div`
	height: 2px;
	background-color: black;
	transition: all 0.2s ease;
	border-radius: 100%;
	width: 85%;
	border: none;
`;

export default CrossTodo;
