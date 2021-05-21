import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	taskContainer: {
		paddingBottom: '5vh'
	},
	taskBar: {
		paddingTop: 50,
		display: 'flex',
		flexWrap: 'wrap',
		flexGrow: 1,
		gap: '10px'
	},
	taskBarLeft: {
		display: 'flex',
		flexGrow: 1,
		[theme.breakpoints.down("sm")]: {
			alignItems: 'center',
			justifyContent: 'center'
		}
	},
	taskBarRight: {
		display: 'flex',
		alignItems: 'stretch',
		gap: '10px',
		[theme.breakpoints.down("sm")]: {
			flexGrow: 1
		},
		[theme.breakpoints.down("xs")]: {
			flexWrap: 'wrap'
		}
	},
	taskBarTitle: {
		display: 'flex',
		alignItems: 'center'
	},
	searchBar: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		flexGrow: 1
	},
	searchBarIcon: {
		padding: 10,
	},
	searchBarInput: {
		marginLeft: theme.spacing(1),
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		display: 'flex',
		alignItems: 'center',
		flexGrow: 1
	},
	list: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		marginTop: 20,
		display: 'flex',
		flexDirection: 'column-reverse'
	},
	taskList: {
		display: 'flex',
		alignItems: 'stretch'
	},
	taskTitleCompleted: {
		textDecoration: 'line-through',
		color: '9e9e9e'
	},
	taskTitleNotCompleted: {
		color: '#3f50b5'
	},
	editButton: {
		color: '#9e9e9e',
		marginRight: '5px'
	},
	deleteButton: {
		color: '#9e9e9e'
	}
}));