import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { TextField, Button, Box } from "@material-ui/core";
import "./main.css";
import { auth } from "./firebase";

const LoginScreen = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errTitle, setErrTitle] = useState("");
	const [errDesc, setErrDesc] = useState("");
	const [errShown, setErrShown] = useState(false);
	const [signInApproved, setSignInApproved] = useState(false);

	auth.onAuthStateChanged((userAuth) => {
		if (userAuth != null) setSignInApproved(true);
		////this.setState({ user: userAuth});
	});

	function showError(title, desc) {
		setErrTitle(title);
		setErrDesc(desc);
		setErrShown(true);
	}

	function updateUsername(evt) {
		let newEntry = { ...username };
		newEntry = evt.target.value;
		setUsername(newEntry);
	}

	function updatePassword(evt) {
		let newEntry = { ...password };
		newEntry = evt.target.value;
		setPassword(newEntry);
	}

	const signInWithEmailAndPasswordHandler = (email, password) => {
		//event.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.then((user) => {
				setSignInApproved(true);
			})
			.catch((error) => {
				setErrTitle("Sign in error");
				setErrDesc("Error signing in: " + error.message);
				setErrShown(true);
				console.error("Error signing in with password and email", error);
			});
	};

	function handleSignin() {
		if (username.trim().length === 0 || password.trim().length === 0)
			return showError("Error", "Some values are missing");
		signInWithEmailAndPasswordHandler(username, password);
	}
	if (signInApproved) return <Redirect to="/dashboard" />;
	return (
		<div
			style={{
				position: "absolute",
				left: "50%",
				top: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<h1
				style={{
					marginBottom: "32px",
				}}
			>
				Cool admin stuff™
			</h1>

			<InputField
				title="Email Address:"
				style={{
					marginBottom: "32px",
				}}
				changedValue={updateUsername}
				type="email"
			/>
			<InputField
				title="Password:"
				changedValue={updatePassword}
				type="password"
			/>
			<Button
				style={{
					marginTop: "32px",
					marginBottom: "32px",
				}}
				variant="outlined"
				color="primary"
				disableElevation
				onClick={() => handleSignin()}
			>
				Login
			</Button>
			{errShown ? (
				<AlertSheet
					title={errTitle}
					desc={errDesc}
					style={{
						marginTop: "32px",
					}}
				/>
			) : null}
		</div>
	);
};

export default LoginScreen;

class AlertSheet extends React.Component {
	render() {
		return (
			<Box boxShadow={3} borderRadius="12px">
				<div
					style={{
						backgroundColor: "#e74c3c",
						borderTopLeftRadius: "12px",
						borderTopRightRadius: "12px",
						width: "100%",
						height: "32px",
					}}
				></div>
				<div
					style={{
						padding: "16px",
					}}
				>
					<h2>{this.props.title}</h2>
					<p>{this.props.desc}</p>
				</div>
			</Box>
		);
	}
}

class InputField extends React.Component {
	render() {
		return (
			<div>
				<p>{this.props.title}</p>
				<TextField
					type={this.props.type}
					onChange={(evt) => this.props.changedValue(evt)}
					required
				/>
			</div>
		);
	}
}

//ReactDOM.render(<LoginScreen />, document.getElementById("root"));
