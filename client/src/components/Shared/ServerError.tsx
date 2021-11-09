import React from "react";
import styled from "styled-components";

interface Props {
	error: string;
}

const ServerError = ({ error }: Props) => {
	return <ErrorElement>{error}</ErrorElement>;
};

const ErrorElement = styled.div`
	color: red;
	font-size: 14px;
	height: fit-content;
	width: fit-content;
	min-height: 30px;
`;

export default ServerError;
