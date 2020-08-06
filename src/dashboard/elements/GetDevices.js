import React, { useState } from "react";
import axios from "axios";

import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	CircularProgress,
} from "@material-ui/core";
import "../Dashboard.css";

const GetDevices = () => {
	const entry = {
		uid: "",
		authKey: "",
	};

	const [open, setOpen] = useState(false);
	const [errOpen, setErrOpen] = useState(false);
	const [err, setErr] = useState("");
	const [sending, setSending] = useState(false);
	const [uidError, setUIDError] = useState(false);
	const [authKeyError, setAuthKeyError] = useState(false);
	const [editing, setEditing] = useState(entry);
	const [successMessage, setSuccessMessage] = useState("");
	const [openSuccessMessage, setOpenSuccessMessage] = useState(false);

	const handleUIDEdit = (e) => {
		let newEntry = { ...editing };
		newEntry.uid = e.target.value;
		setEditing(newEntry);
	};
	const handleAuthkeyEdit = (e) => {
		let newEntry = { ...editing };
		newEntry.authKey = e.target.value;
		setEditing(newEntry);
	};

	const handleClickOpen = () => {
		setOpen(true);
		setSending(false);
		setEditing(entry);
	};

	const handleClose = () => {
		setOpen(false);
		setSending(false);
		setEditing(entry);
	};

	const handleErrClose = () => {
		setErrOpen(false);
	};

	const handleSuccessClose = () => {
		setOpenSuccessMessage(false);
	};

	const sendRequest = () => {
		setUIDError(false);
		setAuthKeyError(false);
		setSending(true);

		if (!fieldsEmpty()) {
			let newEntry = { ...editing };
			let config = {
				headers: {
					Authorization: newEntry.authKey,
				},
			};
			axios
				.get(`https://push.spica.fliney.eu/get/${newEntry.uid}`, config)
				.then((response) => {
					setSending(false);
					if (response.status === 200) {
						setSuccessMessage(JSON.stringify(response.data, null, 2));
						handleClose();
						setOpenSuccessMessage(true);
					} else {
						setErr(
							`The server returned the wrong status code: ${response.status}`
						);
						setErrOpen(true);
					}
				})
				.catch((error) => {
					if (error.response) {
						setSending(false);
						setErr("The server returned: " + error.response.data["err"]);
						setErrOpen(true);
					} else if (error.request) {
						setErr(error.request.toString());
						setSending(false);
					} else {
						setErr("Something went wrong while setting up the request");
						setSending(false);
					}
				});
		} else {
			setSending(false);
		}
		//handleClose();
	};

	const fieldsEmpty = () => {
		let newEdit = { ...editing };
		var returnValue = false;
		if (newEdit.uid.trim().length === 0) {
			setUIDError(true);
			returnValue = true;
		}
		if (newEdit.authKey.trim().length === 0) {
			setAuthKeyError(true);
			returnValue = true;
		}

		return returnValue;
	};

	return (
		<div
			style={{
				marginTop: "16px",
			}}
		>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Get devices
			</Button>

			<Dialog
				className="materialDialog"
				open={openSuccessMessage}
				onClose={handleSuccessClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Data</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-description"
						style={{
							whiteSpace: "pre-wrap",
						}}
					>
						{successMessage}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSuccessClose} color="primary">
						Ok
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				className="materialDialog"
				open={errOpen}
				onClose={handleErrClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{err}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleErrClose} color="primary">
						Ok
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle>Get devices</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill in all information to get all devices for a user
					</DialogContentText>
					<TextField
						error={uidError}
						margin="dense"
						id="uid"
						label="Alles UID"
						type="text"
						fullWidth
						onChange={handleUIDEdit}
					></TextField>

					<TextField
						error={authKeyError}
						margin="dense"
						id="authtoken"
						label="Auth token"
						type="text"
						fullWidth
						onChange={handleAuthkeyEdit}
					></TextField>
				</DialogContent>
				<DialogActions>
					{sending ? (
						<CircularProgress />
					) : (
						<div>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button onClick={sendRequest} color="primary">
								Send
							</Button>
						</div>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
};
export default GetDevices;
