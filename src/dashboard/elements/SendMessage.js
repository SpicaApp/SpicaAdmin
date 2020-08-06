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
} from "@material-ui/core";
import "../Dashboard.css";

export default function SendMessage() {
	const entry = {
		uid: "",
		title: "",
		message: "",
		authKey: "",
	};
	const [open, setOpen] = useState(false);
	const [errOpen, setErrOpen] = useState(false);
	const [err, setErr] = useState("");
	const [sending, setSending] = useState(false);
	const [uidError, setUIDError] = useState(false);
	const [titleError, setTitleError] = useState(false);
	const [messageError, setMessageError] = useState(false);
	const [authKeyError, setAuthKeyError] = useState(false);
	const [editing, setEditing] = useState(entry);
	const [successMessage, setSuccessMessage] = useState("");
	const [openSuccessMessage, setOpenSuccessMessage] = useState(false);

	const handleUIDEdit = (e) => {
		let newEntry = { ...editing };
		newEntry.uid = e.target.value;
		setEditing(newEntry);
	};
	const handleTitleEdit = (e) => {
		let newEntry = { ...editing };
		newEntry.title = e.target.value;
		setEditing(newEntry);
	};
	const handleMessageEdit = (e) => {
		let newEntry = { ...editing };
		newEntry.message = e.target.value;
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
		setTitleError(false);
		setMessageError(false);
		setAuthKeyError(false);
		setSending(true);

		if (!fieldsEmpty()) {
			let newEntry = { ...editing };
			let config = {
				headers: {
					Authorization: newEntry.authKey,
				},
			};
			const post = { title: newEntry.title, message: newEntry.message };
			axios
				.post(`https://push.spica.fliney.eu/send/${newEntry.uid}`, post, config)
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
		if (newEdit.title.trim().length === 0) {
			setTitleError(true);
			returnValue = true;
		}
		if (newEdit.message.trim().length === 0) {
			setMessageError(true);
			returnValue = true;
		}
		if (newEdit.authKey.trim().length === 0) {
			setAuthKeyError(true);
			returnValue = true;
		}

		return returnValue;
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Send message
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
				<DialogTitle>Send message</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill in all information to send a message
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
						error={titleError}
						margin="dense"
						id="title"
						label="Title"
						type="text"
						fullWidth
						onChange={handleTitleEdit}
					></TextField>

					<TextField
						error={messageError}
						margin="dense"
						id="message"
						label="Message"
						type="text"
						fullWidth
						onChange={handleMessageEdit}
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
}
