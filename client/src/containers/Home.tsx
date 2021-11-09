import React from "react";
import styled from "styled-components";
import ButtonsFlexbox from "../components/Home/ButtonsFlexbox";
import ContainerLayout from "../layouts/ContainerLayout";

const Home = () => {
	return (
		<ContainerLayout title="Home" transitionVariant="enter-left">
			<Container>
				<ButtonsFlexbox />
			</Container>
		</ContainerLayout>
	);
};
const Container = styled.div`
	height: 80vh;
	width: 100%;
	display: grid;
	place-items: center;
`;
export default Home;
