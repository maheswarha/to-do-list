import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Avatar, Card, CardContent, Typography, IconButton, Button } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import InfoBox from './Infobox/InfoBox';
import NewTaskDialogBox from './DialogBox/NewTaskDialogBox';
import TaskList from './TaskList/TaskList';
import useStyles from './DashboardStyles';

const Dashboard = ({ user, logout }) => {
	const classes = useStyles();
	const [userProfilePic, setUserProfilePic] = useState(null);
	const [totalTasks, setTotalTasks] = useState(null);
	const [tasksCompleted, setTasksCompleted] = useState(null);
	const [latestTasks, setLatestTasks] = useState([]);
	const [taskList, setTaskList] = useState([]);
	const [open, setOpen] = useState(false);

	const fetchDashboardInfo = async () => {
		const data = await fetch("https://dev-dl.tdcx.com:3092/dashboard", {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `${user.tokenId}`
			}
		})
			.then(res => res.json())
			.then(data => data)
			.catch(err => {
				console.log(err);
			})

		setTotalTasks(data.totalTasks);
		setTasksCompleted(data.tasksCompleted);
		setLatestTasks(data.latestTasks);
	};

	const addNewTask = async (taskName) => {
		await fetch("https://dev-dl.tdcx.com:3092/tasks", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `${user.tokenId}`
			},
			body: JSON.stringify({
				"name": `${taskName}`
			})
		})
			.then(res => res.json())
			.then(data => data)
			.catch(err => {
				console.log(err);
			})

		closeNewTaskContainer();
		fetchDashboardInfo();
		getTaskList();
	};

	const getTaskList = async () => {
		const data = await fetch("https://dev-dl.tdcx.com:3092/tasks", {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `${user.tokenId}`
			}
		})
			.then(res => res.json())
			.then(data => data)
			.catch(err => {
				console.log(err);
			})

		setTaskList(data.tasks);
	}

	useEffect(() => {
		fetchDashboardInfo();
		getTaskList();
		setUserProfilePic(`https://dev-dl.tdcx.com:3092${user.profilePic}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const openNewTaskContainer = () => {
		setOpen(true);
	};

	const closeNewTaskContainer = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="inherit">
				<Toolbar className={classes.appBarAndDashboardContainer}>
					<Avatar alt={user.name} src={userProfilePic} />
					<Typography className={classes.appBarUserName} color="inherit">{user.name}</Typography>
					<IconButton onClick={logout} aria-label="Logout" color="inherit">
						<ExitToApp />
					</IconButton>
				</Toolbar>
			</AppBar>
			{(totalTasks > 0) ?
				<div className={`${classes.appBarAndDashboardContainer} ${classes.dashboardContainerHeight}`}>
					<div>
						<InfoBox totalTasks={totalTasks} tasksCompleted={tasksCompleted} latestTasks={latestTasks} />
					</div>
					<div>
						<TaskList user={user} openNewTaskContainer={openNewTaskContainer} taskList={taskList} fetchDashboardInfo={fetchDashboardInfo} getTaskList={getTaskList} />
					</div>
				</div>
				:
				<div className={classes.newTaskContainer}>
					<Card className={classes.newTaskCard}>
						<CardContent className={classes.newTaskCardContent}>
							<Typography color="textSecondary">You have no task.</Typography>
							<Button className={`${classes.button} ${classes.mt_20}`} variant="contained" color="primary" disableRipple onClick={openNewTaskContainer}>+ New Task</Button>
						</CardContent>
					</Card>
				</div>
			}
			<NewTaskDialogBox open={open} closeNewTaskContainer={closeNewTaskContainer} addNewTask={addNewTask} />
		</div>
	)
}

export default Dashboard;
