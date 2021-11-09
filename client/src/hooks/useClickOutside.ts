import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLDivElement>(
	Handler: Function
) => {
	const Ref = useRef<T | null>(null);
	useEffect(() => {
		document.addEventListener("mousedown", (e) => {
			if (!Ref.current || Ref.current.contains(e.target as Node)) {
				return;
			}
			Handler();
		});
	}, []);

	return { Ref };
};
