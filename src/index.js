import React from "react";
import { render } from "react-dom";
import "./main.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";

import { BrowserRouter as Router, Route } from "react-router-dom";

import MainApp from "./App";
import LoginScreen from "./Login";
import Dashboard from "./dashboard/Dashboard";
import UserProvider from "./providers/UserProvider";

const App = () => {
	/*const [theme, setTheme] = useState("dark");
	const themeToggler = () => {
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
			? setTheme("dark")
			: setTheme("light");
	};*/
	return (
		<ThemeProvider
			theme={
				window.matchMedia("(prefers-color-scheme: dark)").matches
					? darkTheme
					: lightTheme
			}
		>
			<>
				<GlobalStyles />
				<UserProvider>
					<Router>
						<Route exact path="/" component={MainApp} />
						<Route path="/login" component={LoginScreen} />
						<Route path="/dashboard" component={Dashboard}></Route>
					</Router>
				</UserProvider>
			</>
		</ThemeProvider>
	);
};

render(
	<App />,
	/*<React.StrictMode>
		<Router>
			<MainApp />
		</Router>
	</React.StrictMode>,*/
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
