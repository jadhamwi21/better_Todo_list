import * as yup from "yup";

// page transition variants
export const enterLeftVariants = {
	start: {
		opacity: 0,
		x: -50,
	},
	in: {
		opacity: 1,
		x: 0,
	},
	out: {
		opacity: 0,
		x: -50,
	},
};
export const enterRightVariants = {
	start: {
		opacity: 0,
		x: +50,
	},
	in: {
		opacity: 1,
		x: 0,
	},
	out: {
		opacity: 0,
		x: +50,
	},
};

// Forms Schemas

export const SignupSchema = yup.object({
	username: yup.string().required("Username Is Required"),
	password: yup
		.string()
		.min(8, "minimum password length is 8")
		.required("Password Is Required"),
	confirmpassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "password doesn't match")
		.required("Password Confirmation Is Required"),
});
export const SigninSchema = yup.object({
	username: yup.string().required("Username Is Required"),
	password: yup.string().required("Password is required"),
});

export const ApiEndpoint = "http://localhost:8080";
