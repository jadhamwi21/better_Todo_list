import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ModalContext } from "../../providers/ModalProvider";
import { ModalContextInterface } from "../../types/types";

interface Props {
	username: string;
}

const SignupSuccessModal = ({ username }: Props) => {
	const { SetModal }: ModalContextInterface = useContext(ModalContext)!;
	const History = useHistory();
	const Handler = () => {
		SetModal(null, null, null);
		History.push("/signin");
	};
	const { Ref } = useClickOutside<HTMLDivElement>(Handler);
	return (
		<Modal ref={Ref}>
			<Message>Signed Up as {username}</Message>
			<CloseModalX onClick={Handler}>o</CloseModalX>
		</Modal>
	);
};
const Modal = styled.div`
	height: 250px;
	width: 250px;
	display: grid;
	place-items: center;
	background-color: white;
	border-radius: 6px;
	position: relative;
`;
const Message = styled.p`
	font-size: 18px;
`;

const CloseModalX = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 16px;
	cursor: pointer;
`;

export default SignupSuccessModal;
