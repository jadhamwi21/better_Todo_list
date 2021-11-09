import React from "react";
import styled from "styled-components";

interface Props {
	value: string;
}

const SubmitButton = ({ value }: Props) => {
	return <Button type="submit" value={value} />;
};
const Button = styled.input`
	border: none;
	outline: none;
	color: white;
	background-color: rgb(57, 57, 243);
	border-radius: 6px;
	padding: 1em 1.5em;
	cursor: pointer;
	margin: 1em;
`;

export default SubmitButton;
