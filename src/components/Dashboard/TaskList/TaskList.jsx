import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, Checkbox, Paper, Button, InputBase, IconButton, Typography } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import EditTaskDialogBox from '../DialogBox/EditTaskDialogBox';
import useStyles from './TaskListStyles';

const TaskList = ({ user, openNewTaskContainer, taskList, fetchDashboardInfo, getTaskList }) => {
	const classes = useStyles();
	const [editBoxOpen, setEditBoxOpen] = useState(false);
	const [editInfo, setEditInfo] = useState({});
	const [searchTerm, setSearchTerm] = useState("");

	const editTask = async (taskId, taskName, taskCompleted) => {
		await fetch(`https://dev-dl.tdcx.com:3092/tasks/${taskId}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `${user.tokenId}`
			},
			body: JSON.stringify({
				"name": `${taskName}`,
				"completed": `${taskCompleted}`
			})
		})
			.then(res => res.json())
			.then(data => data)
			.catch(err => {
				console.log(err);
			})

		fetchDashboardInfo();
		getTaskList();
	};

	const deleteTask = async (taskId) => {
		await fetch(`https://dev-dl.tdcx.com:3092/tasks/${taskId}`, {
			method: 'DELETE',
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

		fetchDashboardInfo();
		getTaskList();
	};

	const openEditTaskContainer = (task) => {
		setEditInfo(task)
		setEditBoxOpen(true);
	};

	const closeEditTaskContainer = () => {
		setEditBoxOpen(false);
		setEditInfo({});
	};

	return (
		<div className={classes.taskContainer}>
			<div className={classes.taskBar}>
				<div className={classes.taskBarLeft}>
					<Typography variant="h6" className={classes.taskBarTitle}>Tasks</Typography>
				</div>
				<div className={classes.taskBarRight}>
					<Paper component="form" className={classes.searchBar}>
						<IconButton type="submit" className={classes.searchBarIcon} aria-label="search">
							<SearchIcon />
						</IconButton>
						<InputBase
							className={classes.searchBarInput}
							placeholder="Search by task name"
							inputProps={{ 'aria-label': 'Search tasks' }}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
						/>
					</Paper>
					<Button className={classes.button} variant="contained" color="primary" disableRipple onClick={openNewTaskContainer}>+ New Task</Button>
				</div>
			</div>
			<div>
				<List component="nav" className={classes.list} aria-label="Task List">
					{(taskList.length !== 0 &&
						taskList.filter((task, index) => {
							if (searchTerm === "") {
								return task;
							} else if (task.name.toLowerCase().includes(searchTerm.toLowerCase())) {
								return task;
							}

							return null;
						})
							.map((task, index) => {
								return (
									<div key={task._id}>
										<ListItem value={task.name}>
											<Checkbox
												checked={task.completed}
												color="primary"
												inputProps={{ 'aria-label': 'Task Status' }}
												onClick={() => editTask(task._id, task.name, !task.completed)}
											/>
											<ListItemText primary={task.name} className={task.completed ? classes.taskTitleCompleted : classes.taskTitleNotCompleted} />
											{/* <TextField id="outlined-basic" value={task.name} variant="outlined" /> */}
											<div>
												<Edit className={classes.editButton} onClick={() => openEditTaskContainer(task)} />
												<Delete className={classes.deleteButton} onClick={() => deleteTask(task._id)} />
											</div>
										</ListItem>
										{
											(index !== 0 && <Divider light />)
										}
									</div>
								);
							}))}
				</List>
			</div>
			<EditTaskDialogBox editBoxOpen={editBoxOpen} editInfo={editInfo} closeEditTaskContainer={closeEditTaskContainer} editTask={editTask} />
		</div>
	)
}

export default TaskList;
