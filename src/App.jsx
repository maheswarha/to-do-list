import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import useStyles from './AppStyles';

const App = () => {
	const classes = useStyles();
	const [user, setUser] = useState({ tokenId: "", name: "", profilePic: "" });
	const [responseStatus, setResponseStatus] = useState(null);
	const [responseMessage, setResponseMessage] = useState("");
	const [alertOpen, setAlertOpen] = useState(false);

	const login = async (details) => {
		await fetch("https://dev-dl.tdcx.com:3092/login", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({
				"apiKey": `${details.id}`,
				"name": `${details.name}`
			})
		})
			.then(res => {
				let message = "Unknown error";

				if (res.status) {
					if (res.status === 200) {
						message = "User logged in successfully";
					} else if (res.status === 401) {
						message = "Incorrect API Key";
					}
				}

				setResponseStatus(res.status);
				setResponseMessage(message);
				handleAlertOpen();

				if (res.status !== 200) {
					throw new Error(`Bad response from server: Status ${res.status}`);
				}

				return res.json();
			})
			.then(data => {
				const userInfo = {
					tokenId: data.token.token,
					name: data.token.name,
					profilePic: data.image
				};

				setUser(userInfo);
				localStorage.setItem('userSession', JSON.stringify(userInfo));
			})
			.catch(err => {
				console.log(err);
			})
	}

	const logout = () => {
		localStorage.clear();
		setUser({ tokenId: "", name: "", profilePic: "" });
		setResponseStatus(null);
		setResponseMessage("");
	}

	const handleAlertOpen = () => {
		setAlertOpen(true);
	};

	const handleAlertClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertOpen(false);
	};

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('userSession')));
	}, [])

	return (
		<div>
			{(user && user.tokenId !== "" && user.name !== "") ? (
				<Dashboard user={user} logout={logout} />
			) : (
				<Login login={login} handleAlertOpen={handleAlertOpen} />
			)}
			<Snackbar className={classes.snackbar} open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
				<Alert onClose={handleAlertClose} severity={(responseStatus && responseStatus === 200) ? "success" : "error"}>
					{responseMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default App;
