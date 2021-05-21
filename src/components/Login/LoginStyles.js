import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		backgroundColor: '#eeeeee',
		height: '100vh'
	},
	title: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '10px'
	},
	button: {
		padding: '15px',
		borderRadius: '5px',
		border: 'none',
		width: '84%'
	},
	mt_10: {
		marginTop: '10px',
	},
	mt_20: {
		marginTop: '20px',
	},
	card: {
		minWidth: 300,
	}
}));