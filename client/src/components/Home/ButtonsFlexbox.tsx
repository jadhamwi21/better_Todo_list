import React from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";

const ButtonsFlexbox = () => {
	return (
		<Flexbox>
			<StyledButton value="Sign in" />
			<StyledButton value="Sign up" />
		</Flexbox>
	);
};
const Flexbox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: fit-content;
	width: 60%;
`;

export default ButtonsFlexbox;
