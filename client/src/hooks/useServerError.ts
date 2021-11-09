import { useState } from "react";

export const useServerError = () => {
	const [serverError, setServerError] = useState("");

	return {
		serverError,
		setServerError,
	};
};
