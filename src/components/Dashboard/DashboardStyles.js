import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		flex: 1,
		backgroundColor: '#eeeeee'
	},
	appBarAndDashboardContainer: {
		paddingLeft: '100px',
		paddingRight: '100px',
		[theme.breakpoints.down("sm")]: {
			paddingLeft: '20px',
			paddingRight: '20px',
		}
	},
	dashboardContainerHeight: {
		minHeight: '100vh',
		height: '100%'
	},
	appBarUserName: {
		flexGrow: 1,
		marginLeft: 20
	},
	newTaskContainer: {
		display: 'flex',
		height: '100vh',
		alignItems: 'center',
		justifyContent: 'center'
	},
	newTaskCard: {
		minWidth: 250
	},
	newTaskCardContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	mt_20: {
		marginTop: '20px',
	},
	button: {
		color: '#fff !important',
		textDecoration: 'none',
		background: '#3f50b5',
		padding: '20px',
		borderRadius: '5px',
		display: 'inline-block',
		border: 'none',
		width: '60%'
	}
}));