import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteList } from "../../slices/listSlice";
import { IState } from "../../store/store";

const DeleteList = () => {
	const SelectedList = useSelector(
		(state: IState) => state.ListReducer.SelectedList
	);
	const Dispatch = useDispatch();
	return (
		<Wrapper
			onClick={() => {
				Dispatch(deleteList(SelectedList));
			}}
		>
			Delete List
		</Wrapper>
	);
};
const Wrapper = styled.div`
	position: absolute;
	bottom: 10px;
	right: 25px;
	cursor: pointer;
	color: #4040ff;
`;

export default DeleteList;
