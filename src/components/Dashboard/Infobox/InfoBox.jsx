import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Chart } from 'react-google-charts';
import useStyles from './InfoBoxStyles';

const InfoBox = ({ totalTasks, tasksCompleted, latestTasks }) => {
	const classes = useStyles();

	return (
		<div className={classes.cards}>
			<Card className={classes.card}>
				<CardContent>
					<Typography color="textSecondary">Tasks Completed</Typography>
					<div className={classes.cardTaskNumbers}>
						<Typography className={classes.cardTaskNumbersCompleted}>{tasksCompleted}</Typography>
						<Typography className={classes.cardTaskNumbersTotal}>/{totalTasks}</Typography>
					</div>
				</CardContent>
			</Card>
			<Card className={classes.card}>
				<CardContent>
					<Typography className={classes.cardLatestTasksTitle} color="textSecondary">Latest Created Tasks</Typography>
					<ul>
						{latestTasks.map(task => {
							return <li key={task.name}>{(task.completed) ? <s>{task.name}</s> : task.name}</li>
						})}
					</ul>
				</CardContent>
			</Card>
			<Card className={classes.card}>
				<CardContent>
					<Chart
						width={'300px'}
						height={'300px'}
						chartType="PieChart"
						loader={<div>Loading Chart</div>}
						data={[
							['Task Status', 'Number of Tasks'],
							['Completed', tasksCompleted],
							['Not Completed', totalTasks - tasksCompleted]
						]}
						options={{
							legend: 'none',
							pieSliceText: 'label',
							pieStartAngle: 100,
							slices: {
								0: { color: '#3f50b5' },
								1: { color: '#9e9e9e' }
							}
						}}
						rootProps={{ 'data-testid': '4' }}
					/>
				</CardContent>
			</Card>
		</div>
	)
}

export default InfoBox;
