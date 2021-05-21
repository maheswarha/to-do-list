import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './DialogBoxStyles';

const NewTaskDialogBox = ({ open, closeNewTaskContainer, addNewTask }) => {
	const classes = useStyles();
	const [taskName, setTaskName] = useState("");

	const submitHandler = e => {
		e.preventDefault();

		if (taskName !== "") {
			addNewTask(taskName);
			setTaskName("");
		}
	}

	return (
		<Dialog className={`${classes.flex} ${classes.dialog}`} open={open} onClose={() => { closeNewTaskContainer(); setTaskName(""); }} aria-labelledby="new-task-dialog">
			<DialogTitle className={classes.flex} id="new-task-dialog">{"+ New Task "}</DialogTitle>
			<DialogContent className={`${classes.flex} ${classes.dialogContent}`}>
				<TextField id="outlined-basic" label="Task Name" variant="outlined" onChange={e => setTaskName(e.target.value)} value={taskName} />
				<Button onClick={submitHandler} className={classes.button} variant="contained" color="primary">+ New Task</Button>
			</DialogContent>
		</Dialog>
	)
}

export default NewTaskDialogBox;
