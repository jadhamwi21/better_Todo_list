import React from "react";
import styled from "styled-components";
import Loader from "../components/Token/Loader";
import ContainerLayout from "../layouts/ContainerLayout";

const Token = () => {
	return (
		<ContainerLayout title="Loading...">
			<Grid>
				<Loader />
			</Grid>
		</ContainerLayout>
	);
};

const Grid = styled.div`
	display: grid;
	place-items: center;
	width: 100%;
	height: 80vh;
`;

export default Token;
