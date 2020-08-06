import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import "./Dashboard.css";
import SendMessage from "./elements/SendMessage";
import { auth } from "../firebase";
import { Redirect } from "react-router-dom";
import SetDevice from "./elements/SetDevice";
import GetDevices from "./elements/GetDevices";

export default function Daashboard() {
	const [signedIn, setSignedIn] = useState(true);

	auth.onAuthStateChanged((userAuth) => {
		if (userAuth == null) setSignedIn(false);
		////this.setState({ user: userAuth});
	});

	if (!signedIn) return <Redirect to="/login" />;
	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">Dashboard</Typography>
				</Toolbar>
			</AppBar>
			<div
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<SendMessage />
				<SetDevice />
				<GetDevices />
				<Button
					style={{
						marginTop: "16px",
					}}
					variant="outlined"
					color="primary"
					onClick={() => {
						auth.signOut();
					}}
				>
					Sign out
				</Button>
			</div>
		</div>
	);
}
