import React from "react";
import { motion } from "framer-motion";
import { enterLeftVariants, enterRightVariants } from "../constants/constants";
import { Helmet } from "react-helmet";

interface Props {
	transitionVariant?: "enter-left" | "enter-right";
	children: React.ReactNode;
	title: string;
}

const ContainerLayout = ({ transitionVariant, children, title }: Props) => {
	return (
		<React.Fragment>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<motion.main
				initial="start"
				animate="in"
				exit="out"
				style={{
					height: "fit-content",
					width: "100%",
					padding: "1em 1em",
				}}
				variants={
					transitionVariant === "enter-left"
						? enterLeftVariants
						: transitionVariant === "enter-right"
						? enterRightVariants
						: {}
				}
			>
				{children}
			</motion.main>
		</React.Fragment>
	);
};

export default ContainerLayout;
