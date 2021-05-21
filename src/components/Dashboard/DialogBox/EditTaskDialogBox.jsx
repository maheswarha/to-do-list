import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './DialogBoxStyles';

const EditTaskDialogBox = ({ editBoxOpen, editInfo, closeEditTaskContainer, editTask }) => {
	const classes = useStyles();
	const [editedInfo, setEditedInfo] = useState({ _id: "", name: "", completed: null });

	useEffect(() => {
		if (editInfo._id && editInfo.name) {
			setEditedInfo(editInfo);
		}
	}, [editInfo]);

	return (
		<Dialog className={`${classes.flex} ${classes.dialog}`} open={editBoxOpen} onClose={closeEditTaskContainer} aria-labelledby="edit-task-dialog">
			<DialogTitle className={classes.flex} id="edit-task-dialog">{"Edit Task "}</DialogTitle>
			<DialogContent className={`${classes.flex} ${classes.dialogContent}`}>
				<TextField id="outlined-basic" label="Task Name" variant="outlined" onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })} value={editedInfo.name} />
				<Button onClick={() => { editTask(editedInfo._id, editedInfo.name, editedInfo.completed); closeEditTaskContainer(); }} className={classes.button} variant="contained" color="primary">Update</Button>
			</DialogContent>
		</Dialog>
	)
}

export default EditTaskDialogBox;
