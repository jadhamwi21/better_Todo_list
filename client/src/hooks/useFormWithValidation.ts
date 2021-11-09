import { FormikHelpers, useFormik } from "formik";
import { useState } from "react";
import { OptionalObjectSchema } from "yup/lib/object";

export const useFormWithValidation = <T>(
	initialValues: T,
	schema: OptionalObjectSchema<any, any, any>,
	SubmitHandler: (values: T, helpers: FormikHelpers<T>) => void
) => {
	const [toggleValidation, setToggleValidation] = useState(false);
	const ToggleValidation = () => {
		setToggleValidation((prev) => !prev);
	};
	const { values, handleChange, handleSubmit, errors } = useFormik({
		initialValues,
		validateOnChange: toggleValidation,
		validateOnBlur: false,
		enableReinitialize: true,
		validationSchema: schema,
		onSubmit: (values: T, helpers) => {
			SubmitHandler(values, helpers);
		},
	});
	return {
		InputValues: values,
		InputErrors: errors,
		InputChangeHandler: handleChange,
		SubmitHandler: handleSubmit,
		ToggleValidation,
	};
};
