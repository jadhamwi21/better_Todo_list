import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error: string | undefined;
	label: string;
	type: "text" | "password";
}

const InputField = ({ name, value, error, label, type, onChange }: Props) => {
	const [translate, setTranslate] = useState(false);
	const InputRef = useRef<HTMLInputElement>(null);
	return (
		<Wrapper>
			<Label
				shouldTranslate={translate}
				onClick={() => InputRef.current?.focus()}
			>
				{label}
			</Label>
			<Field
				autoComplete="off"
				name={name}
				value={value}
				type={type}
				onChange={onChange}
				ref={InputRef}
				onFocus={() => setTranslate(true)}
				onBlur={() => {
					if (value === "") {
						setTranslate(false);
					}
				}}
			/>
			<Error>{error ?? ""}</Error>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	height: fit-content;
	width: fit-content;
	position: relative;
	margin: 1.5em;
	width: 100%;
	max-width: 250px;
`;

const Field = styled.input`
	border: none;
	outline: none;
	display: block;
	border-radius: 6px;
	padding: 1em 0.25em;
	width: 100%;
	background-color: #cfcfcf;
`;
const Label = styled.div<{ shouldTranslate: boolean }>`
	position: absolute;
	top: 0.5em;
	left: 0.25em;
	color: rgb(57, 57, 243);
	transform: translateY(
		${(props) => (props.shouldTranslate ? "-150%" : "0px")}
	);
	-webkit-transition: all 0.2s ease-out;
	-moz-transition: all 0.2s ease-out;
	transition: all 0.2s ease-out;
	font-weight: 600;
`;
const Error = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	font-size: 14px;
	color: red;
`;

export default InputField;
