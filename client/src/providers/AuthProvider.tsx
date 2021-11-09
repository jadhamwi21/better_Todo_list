import React from "react";
import useAuth from "../hooks/useAuth";
import { AuthContextInterface } from "../types/types";

interface Props {
	children: React.ReactNode;
}

export const AuthContext = React.createContext<AuthContextInterface>({
	signin: async () => {},
	signout: () => {},
	signup: async () => {},
});

const AuthProvider = ({ children }: Props) => {
	const auth = useAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
