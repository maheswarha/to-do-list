import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	flex: {
		display: 'flex'
	},
	dialog: {
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dialogContent: {
		flexDirection: 'column'
	},
	button: {
		marginTop: '10px',
		marginBottom: '20px'
	}
}));