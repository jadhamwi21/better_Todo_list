import { useEffect, useRef, useState } from "react";
import { IntervalRefType, UsePeriodicActionProps } from "../types/types";

export const usePeriodicAction = ({
	action,
	callEvery,
}: UsePeriodicActionProps) => {
	const [start, setStart] = useState(false);
	const IntervalRef = useRef<IntervalRefType>(null);
	useEffect(() => {
		if (start) {
			IntervalRef.current = setInterval(action, callEvery * 60000);
			return () => {
				clearInterval(IntervalRef.current!);
			};
		}
	}, [start]);

	return {
		StartPeriod: () => setStart(true),
	};
};
