import React from "react";
import styled from "styled-components";

interface Props {
	children: React.ReactNode;
	Submit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormLayout = ({ children, Submit }: Props) => {
	return (
		<Form onSubmit={Submit}>
			<FieldsWrapper>{children}</FieldsWrapper>
		</Form>
	);
};
const Form = styled.form`
	display: grid;
	place-items: center;
	height: 80vh;
	width: 100%;
`;
const FieldsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

export default FormLayout;
