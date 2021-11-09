import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectList } from "../../slices/listSlice";
import { IState } from "../../store/store";

const ListsMapper = () => {
	const Dispatch = useDispatch();
	const { ListsWithTodos, SelectedList } = useSelector(
		(state: IState) => state.ListReducer
	);
	return (
		<List>
			{Object.keys(ListsWithTodos).map((listName) => (
				<ListItem
					onClick={() => {
						Dispatch(selectList(listName));
					}}
					key={listName}
					selected={SelectedList === listName}
				>
					{listName}
				</ListItem>
			))}
		</List>
	);
};
const List = styled.ul`
	list-style: none;
	padding: 0px;
	width: 100%;
	padding: 0 1em;
	overflow-y: auto;
`;
const ListItem = styled.li<{ selected: boolean }>`
	color: ${(props) => (props.selected ? "#4040ff" : "black")};
	cursor: pointer;
	transition: all 0.1s linear;
	margin: 0.5em 0px;
	&:hover {
		color: #4040ff;
	}
`;

export default ListsMapper;
