import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setChecking, setIsAuth } from "../slices/userSlice";
import { IState } from "../store/store";
import axios from "axios";
import { ApiEndpoint } from "../constants/constants";
import { useRefreshTokenRotation } from "./useRefreshTokenRotation";

const useToken = () => {
	const { checking } = useSelector((state: IState) => state.UserReducer);
	const dispatch = useDispatch();
	const History = useHistory();
	const { StartRotationInterval } = useRefreshTokenRotation({ rotateEvery: 8 });
	useEffect(() => {
		// this side effect will call the api to get a new pair of tokens
		// if the call failed the user has to login again
		axios
			.post(
				`${ApiEndpoint}/user/auth/refresh_token`,
				{},
				{ withCredentials: true }
			)
			.then(() => {
				History.push("/todos");
				dispatch(setIsAuth(true));
				StartRotationInterval();
			})
			.catch(() => {
				if (History.location.pathname === "/todos") {
					History.push("/signin");
				}
				dispatch(setIsAuth(false));
			})
			.finally(() => {
				dispatch(setChecking(false));
			});
	}, []);

	return checking;
};

export default useToken;
