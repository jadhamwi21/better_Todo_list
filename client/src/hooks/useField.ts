import React, { useCallback, useState } from "react";

export const useField = (initialValue: string, submit: Function) => {
	const [value, setValue] = useState(initialValue);
	const Submit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			submit(value);
			setValue("");
		},
		[value]
	);
	return { value, setValue, Submit };
};
