import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = () => {
	return (
		<Wrapper>
			<Dot delay={0.0} />
			<Dot delay={0.1} />
			<Dot delay={0.2} />
			<Dot delay={0.3} />
			<Dot delay={0.4} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	max-width: 200px;
`;
const TranslationAnimation = keyframes`
0%{
    tranform:translateY(0px);
}
50%{
    transform:translateY(-75px);
}
100%{
    transform:translateY(0px);
}
`;
const Dot = styled.div<{ delay: number }>`
	border-radius: 100%;
	width: 5px;
	height: 5px;
	animation-name: ${TranslationAnimation};
	animation-timing-function: linear;
	animation-duration: 0.4s;
	animation-delay: ${(props) => props.delay + "s"};
	animation-iteration-count: infinite;
	animation-direction: alternate;
	animation-play-state: running;
	background-color: black;
`;

export default Loader;
