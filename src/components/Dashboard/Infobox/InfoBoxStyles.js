import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	cards: {
		paddingTop: 40,
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		gap: '10px',
		"@media (max-width: 800px)": {
			flexDirection: 'column',
			height: '800px',
		}
	},
	card: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	cardTaskNumbers: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	cardTaskNumbersCompleted: {
		fontSize: '50px',
		color: '#3f50b5'
	},
	cardTaskNumbersTotal: {
		fontSize: '15px'
	},
	cardLatestTasksTitle: {
		marginBottom: '10px'
	}
}));