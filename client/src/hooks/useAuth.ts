import { useCallback } from "react";
import axios from "axios";
import { ApiEndpoint } from "../constants/constants";
import { useDispatch } from "react-redux";
import { Logout, setIsAuth } from "../slices/userSlice";

const useAuth = () => {
	const dispatch = useDispatch();
	const signup = useCallback(async (username: string, password: string) => {
		return new Promise<any>((resolve, reject) => {
			axios
				.post(`${ApiEndpoint}/user/auth/signup`, {
					username,
					password,
				})
				.then((res) => {
					resolve(res.data);
				})
				.catch((e) => {
					reject(e.response.data.message);
				});
		});
	}, []);
	const signin = useCallback(async (username: string, password: string) => {
		return new Promise<any>((resolve, reject) => {
			axios
				.post(
					`${ApiEndpoint}/user/auth/signin`,
					{
						username,
						password,
					},
					{
						withCredentials: true,
					}
				)
				.then((res) => {
					resolve(res.data);
					dispatch(setIsAuth(true));
				})
				.catch((e) => {
					reject(e.response.data.message);
				});
		});
	}, []);
	const signout = useCallback(() => {
		dispatch(Logout());
	}, []);

	return {
		signup,
		signin,
		signout,
	};
};

export default useAuth;
