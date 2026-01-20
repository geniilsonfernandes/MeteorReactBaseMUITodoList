import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


const SignInStyles = {
	Container: styled(Box)(({ theme }) => ({
		minHeight: '100vh',
		width: '100vw',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		color: theme.palette.primary.contrastText,
		position: 'relative',

	})),


	FormWrapper: styled(Box)(({ theme }) => ({
		maxWidth: '500px',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: theme.spacing(2)
		
	}))
};

export default SignInStyles;
