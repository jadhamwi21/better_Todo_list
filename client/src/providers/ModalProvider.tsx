import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { useModal } from "../hooks/useModal";
import { ModalContextInterface } from "../types/types";

interface Props {
	children: React.ReactNode;
}

export const ModalContext = React.createContext<ModalContextInterface | null>(
	null
);

const ModalProvider = ({ children }: Props) => {
	const { ModalState, SetModal } = useModal();
	return (
		<ModalContext.Provider value={{ SetModal }}>
			{children}
			{ModalState.Component &&
				ModalState.ContainerColor &&
				ReactDOM.createPortal(
					<ModalContainer bgColor={ModalState.ContainerColor}>
						<ModalState.Component {...ModalState.ModalProps} />
					</ModalContainer>,
					document.getElementById("portal")!
				)}
		</ModalContext.Provider>
	);
};

const ModalContainer = styled.div<{ bgColor: string }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.bgColor};
	display: grid;
	place-items: center;
`;

export default ModalProvider;
