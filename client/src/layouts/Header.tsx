import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IState } from "../store/store";
import { Logout } from "../slices/userSlice";
import { useHistory } from "react-router-dom";

const Header = () => {
	const { isAuth } = useSelector((state: IState) => state.UserReducer);
	const Dispatch = useDispatch();
	const History = useHistory();
	return (
		<HeaderElement isAuthenticated={isAuth}>
			<AppTitle onClick={() => History.push("/")}>Better Todo List</AppTitle>
			{isAuth && (
				<LogoutElement
					onClick={() => {
						Dispatch(Logout());
						History.push("/");
					}}
				>
					Logout
				</LogoutElement>
			)}
		</HeaderElement>
	);
};
const HeaderElement = styled.header<{ isAuthenticated: boolean }>`
	height: 100px;
	width: "100%";
	background-color: rgba(219, 216, 216, 0.9);
	color: rgb(57, 57, 243);
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: ${(props) => (props.isAuthenticated ? "0px 2em" : "0px")};
	justify-content: ${(props) =>
		props.isAuthenticated ? "space-between" : "center"};
`;
const AppTitle = styled.h1`
	letter-spacing: 1.25px;
	cursor: pointer;
`;
const LogoutElement = styled.div`
	text-decoration: underline;
	color: black;
	cursor: pointer;
`;

export default Header;
