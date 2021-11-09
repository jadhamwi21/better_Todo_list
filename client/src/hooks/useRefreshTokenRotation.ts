import axios from "axios";
import { ApiEndpoint } from "../constants/constants";
import { UseRefreshTokenRotationProps } from "../types/types";
import { usePeriodicAction } from "./usePeriodicAction";

export const useRefreshTokenRotation = ({
	rotateEvery,
}: UseRefreshTokenRotationProps) => {
	const { StartPeriod } = usePeriodicAction({
		action: () => {
			axios.post(
				`${ApiEndpoint}/user/auth/refresh_token`,
				{},
				{ withCredentials: true }
			);
		},
		callEvery: rotateEvery,
	});
	return { StartRotationInterval: StartPeriod };
};
