import React from "react";
import "./main.css";
import "./App.css";
import { withRouter, Redirect } from "react-router-dom";
import { auth } from "./firebase";

class MainApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navigateTo: "",
		};
	}

	evaluateAuth() {
		auth.onAuthStateChanged((userAuth) => {
			if (userAuth == null) {
				this.setState({
					navigateTo: "login"
				})
			}
			else {
				this.setState({
					navigateTo: "dashboard",
				});
			}
		});
	}

	render() {
		if (this.state.navigateTo !== "") {
			if (this.state.navigateTo === "dashboard") {
				return <Redirect to="/dashboard" />;
			} else {
				return <Redirect to="/login" />;
			}
		}

		return (
			<div>
				<p>Redirecting...</p>
				{this.evaluateAuth()}
			</div>
		);
	}
}

export default withRouter(MainApp);
