import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import InputField from "../components/Shared/InputField";
import SubmitButton from "../components/Shared/SubmitButton";
import ServerError from "../components/Shared/ServerError";
import SignupSuccessModal from "../components/Signup/SignupSuccessModal";
import { SignupSchema } from "../constants/constants";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useServerError } from "../hooks/useServerError";
import ContainerLayout from "../layouts/ContainerLayout";
import FormLayout from "../layouts/FormLayout";
import { AuthContext } from "../providers/AuthProvider";
import { ModalContext } from "../providers/ModalProvider";
import { ModalContextInterface, SignupFormDataInterface } from "../types/types";

const Signup = () => {
	const { signup } = useContext(AuthContext);
	const { SetModal }: ModalContextInterface = useContext(ModalContext)!;
	const { serverError, setServerError } = useServerError();
	const {
		InputChangeHandler,
		InputErrors,
		InputValues,
		ToggleValidation,
		SubmitHandler,
	} = useFormWithValidation<SignupFormDataInterface>(
		{
			confirmpassword: "",
			password: "",
			username: "",
		},
		SignupSchema,
		async ({ username, password }) => {
			try {
				await signup(username, password);
				SetModal<{ username: string }>(
					SignupSuccessModal,
					{ username },
					"rgba(0,0,0,0.3)"
				);
				setServerError("");
			} catch (errorResponse: any) {
				setServerError(errorResponse);
			}
		}
	);

	return (
		<ContainerLayout title="Signup" transitionVariant="enter-right">
			<FormLayout
				Submit={(e) => {
					ToggleValidation();
					SubmitHandler(e);
				}}
			>
				<InputField
					name="username"
					value={InputValues.username}
					error={InputErrors.username}
					label="Username"
					onChange={InputChangeHandler}
					type="text"
				/>

				<InputField
					name="password"
					value={InputValues.password}
					error={InputErrors.password}
					label="Password"
					onChange={InputChangeHandler}
					type="password"
				/>

				<InputField
					name="confirmpassword"
					value={InputValues.confirmpassword}
					error={InputErrors.confirmpassword}
					label="Confirm Password"
					onChange={InputChangeHandler}
					type="password"
				/>
				<ServerError error={serverError} />
				<SubmitButton value="Sign up" />
			</FormLayout>
		</ContainerLayout>
	);
};

export default Signup;
