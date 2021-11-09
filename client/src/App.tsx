import axios from "axios";
import React from "react";
import { Route } from "react-router";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import Signup from "./containers/Signup";
import Todos from "./containers/Todos";
import Wrapper from "./layouts/Wrapper";

function App() {
	return (
		<Wrapper>
			<Route path="/signup" exact>
				<Signup />
			</Route>
			<Route path="/signin" exact>
				<SignIn />
			</Route>
			<Route path="/todos" exact>
				<Todos />
			</Route>
			<Route path="/" exact>
				<Home />
			</Route>
		</Wrapper>
	);
}

export default App;
