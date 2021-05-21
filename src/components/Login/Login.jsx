import React, { useState } from 'react';
import { TextField, Card, CardContent, Typography, Button } from '@material-ui/core';
import useStyles from './LoginStyles';

const Login = ({ login }) => {
	const classes = useStyles();
	const [details, setDetails] = useState({ name: "", id: "" });

	const submitHandler = e => {
		e.preventDefault();

		if (details.id !== "" && details.name !== "") {
			login(details);
		}
	}

	return (
		<div className={classes.root}>
			<div className={classes.joinInnerContainer}>
				<Card className={classes.card}>
					<CardContent>
						<Typography className={classes.title} variant="h6" color="textSecondary" gutterBottom>Login</Typography>
						<div className={classes.mt_20}>
							<TextField variant="outlined" type="password" id="id" label="ID" onChange={e => setDetails({ ...details, id: e.target.value })} value={details.id} />
						</div>
						<div className={classes.mt_10}>
							<TextField variant="outlined" id="name" label="Name" onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
						</div>
						<Button className={`${classes.button} ${classes.mt_10}`} onClick={submitHandler} variant="contained" color="primary">Login</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default Login;
