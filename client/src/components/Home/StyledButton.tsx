import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

interface Props {
	value: "Sign up" | "Sign in";
}

const StyledButton = ({ value }: Props) => {
	const History = useHistory();
	const clickHandler = useCallback(() => {
		if (value === "Sign in") {
			History.push("/signin");
		} else {
			History.push("/signup");
		}
	}, [value]);
	return <Button onClick={clickHandler}>{value}</Button>;
};
const Button = styled.button`
	display: block;
	border: none;
	outline: none;
	padding: 0.75em 1.5em;
	cursor: pointer;
	background-color: black;
	color: white;
	border-radius: 6px;
`;

export default StyledButton;
