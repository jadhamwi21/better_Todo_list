import React from "react";
import styled from "styled-components";
import ListInputField from "./ListInputField";
import ListsMapper from "./ListsMapper";

const ListSelector = () => {
	return (
		<Container>
			<ListInputField />
			<ListsMapper />
		</Container>
	);
};

const Container = styled.div`
	height: 100%;
	width: 200px;
	border-right: solid 1px white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 1em 0px;
`;

export default ListSelector;
