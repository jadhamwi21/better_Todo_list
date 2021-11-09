import React from "react";
import { Switch, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import Header from "./Header";
import AuthProvider from "../providers/AuthProvider";
import ModalProvider from "../providers/ModalProvider";
import useToken from "../hooks/useToken";
import Token from "../containers/Token";

interface Props {
	children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
	const location = useLocation();
	const checking = useToken();
	return (
		<AuthProvider>
			<ModalProvider>
				<Header />
				<AnimatePresence exitBeforeEnter={true} initial={false}>
					{checking ? (
						<Token />
					) : (
						<Switch location={location} key={location.pathname}>
							{children}
						</Switch>
					)}
				</AnimatePresence>
			</ModalProvider>
		</AuthProvider>
	);
};

export default Wrapper;
