import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import InputField from "../components/Shared/InputField";
import ServerError from "../components/Shared/ServerError";
import SubmitButton from "../components/Shared/SubmitButton";
import { SigninSchema } from "../constants/constants";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useRefreshTokenRotation } from "../hooks/useRefreshTokenRotation";
import { useServerError } from "../hooks/useServerError";
import ContainerLayout from "../layouts/ContainerLayout";
import FormLayout from "../layouts/FormLayout";
import { AuthContext } from "../providers/AuthProvider";
import { SigninFormDataInterface } from "../types/types";

const SignIn = () => {
	const { signin } = useContext(AuthContext);
	const { serverError, setServerError } = useServerError();
	const History = useHistory();
	const { StartRotationInterval } = useRefreshTokenRotation({ rotateEvery: 8 });
	const {
		InputValues,
		InputChangeHandler,
		InputErrors,
		ToggleValidation,
		SubmitHandler,
	} = useFormWithValidation<SigninFormDataInterface>(
		{ username: "", password: "" },
		SigninSchema,
		async (values) => {
			try {
				await signin(values.username, values.password);
				History.push("/todos");
				StartRotationInterval();
			} catch (errorResponse: any) {
				setServerError(errorResponse);
			}
		}
	);
	return (
		<ContainerLayout transitionVariant="enter-left" title="Sign In">
			<FormLayout
				Submit={(e) => {
					ToggleValidation();
					SubmitHandler(e);
				}}
			>
				<InputField
					value={InputValues.username}
					name="username"
					label="Username"
					onChange={InputChangeHandler}
					error={InputErrors.username}
					type="text"
				/>
				<InputField
					value={InputValues.password}
					name="password"
					label="Password"
					onChange={InputChangeHandler}
					error={InputErrors.password}
					type="password"
				/>
				<ServerError error={serverError} />
				<SubmitButton value="Sign In" />
			</FormLayout>
		</ContainerLayout>
	);
};

export default SignIn;
