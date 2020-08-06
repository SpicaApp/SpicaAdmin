import React, { useState } from "react";
import axios from "axios";
import Alert from "../../elements/Alert";

import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	CircularProgress,
	Snackbar,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormControl,
	FormLabel,
} from "@material-ui/core";
import "../Dashboard.css";

const SetDevice = () => {
	const entry = {
		uid: "",
		type: "",
		deviceID: "",
		authKey: "",
	};

	const [open, setOpen] = useState(false);
	const [errOpen, setErrOpen] = useState(false);
	const [err, setErr] = useState("");
	const [sending, setSending] = useState(false);
	const [uidError, setUIDError] = useState(false);
	const [typeError, setTypeError] = useState(false);
	const [deviceIDError, setDeviceIDError] = useState(false);
	const [authKeyError, setAuthKeyError] = useState(false);
	const [editing, setEditing] = useState(entry);
	const [successMessage, setSuccessMessage] = useState("");
	const [openSuccessMessage, setOpenSuccessMessage] = useState(false);

	const handleUIDEdit = (e) => {
		let newEntry = { ...editing };
		newEntry.uid = e.target.value;
		setEditing(newEntry);
	};
	const handleTypeEdit = (e) => {
		let newEntry = { ...editing };
		newEntry.type = e.target.value;
		setEditing(newEntry);
	};
	const handleDeviceIDEdit = (e) => {
		let newEntry = { ...editing };
		newEntry.deviceID = e.target.value;
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
		setTypeError(false);
		setDeviceIDError(false);
		setAuthKeyError(false);
		setSending(true);

		if (!fieldsEmpty()) {
			let newEntry = { ...editing };
			let config = {
				headers: {
					Authorization: newEntry.authKey,
				},
			};
			const post = { deviceID: newEntry.deviceID, type: newEntry.type };
			axios
				.post(`https://push.spica.fliney.eu/set/${newEntry.uid}`, post, config)
				.then((response) => {
					setSending(false);
					if (response.status === 200) {
						setSuccessMessage("Data sent!");
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
		if (newEdit.type.trim().length === 0) {
			setTypeError(true);
			returnValue = true;
		}
		if (newEdit.deviceID.trim().length === 0) {
			setDeviceIDError(true);
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
				Set device
			</Button>

			<Snackbar
				open={openSuccessMessage}
				autoHideDuration={6000}
				onClose={handleSuccessClose}
			>
				<Alert onClose={handleSuccessClose} severity="success">
					{successMessage}
				</Alert>
			</Snackbar>

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
				<DialogTitle>Set device</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill in all information to set a device
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

					<FormControl component="fieldset" error={typeError}>
						<FormLabel component="legend">Device Type</FormLabel>
						<RadioGroup
							aria-label="gender"
							name="gender1"
							value={editing.type}
							onChange={handleTypeEdit}
						>
							<FormControlLabel value="ios" control={<Radio />} label="iOS" />
							<FormControlLabel
								value="and"
								control={<Radio />}
								label="Android"
							/>
						</RadioGroup>
					</FormControl>

					<TextField
						error={deviceIDError}
						margin="dense"
						id="deviceID"
						label="Device ID"
						type="text"
						fullWidth
						onChange={handleDeviceIDEdit}
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
export default SetDevice;
