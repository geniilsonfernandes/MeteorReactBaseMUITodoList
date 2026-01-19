import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { SysSectionPaddingXY } from "/imports/ui/layoutComponents/sysLayoutComponents";
import { sysSizing } from '/imports/ui/materialui/styles';

export default {
	Container: styled(SysSectionPaddingXY, {
		shouldForwardProp: (prop) => prop !== 'isDrawer',
	})<{ isDrawer: boolean }>(({ theme, isDrawer }) => ({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedLg,
		maxWidth: '540px',
		width: '540px',
		height: isDrawer ? '100%' : 'auto',
		padding: sysSizing.spacingFixedLg,
		[theme.breakpoints.down('sm')]: {
			padding: sysSizing.spacingFixedMd,
			width: isDrawer ? '90vw' : '540px',
			maxWidth: isDrawer ? '90vw' : '100%',
		},
	})),
	DialogTitleContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: sysSizing.spacingFixedMd,

	})),
	FieldsForm: styled(Box)(({ theme }) => ({
		display: 'flex',
		gap: sysSizing.spacingFixedMd,
		flexDirection: 'column',
		[theme.breakpoints.down('sm')]: {
		}
	})),
	Actions: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		gap: sysSizing.spacingRemMd,
		padding: 0,
		justifyContent: 'center'
	})),
	Title: styled(Typography, {
		shouldForwardProp: (prop) => prop !== 'isCompleted',
	})<{ isCompleted: boolean }>(({ theme, isCompleted }) => ({
		fontWeight: 500,
		fontSize: 18,
		textDecoration: isCompleted ? 'line-through' : 'none',
		color: isCompleted ? theme.palette.text.secondary : theme.palette.text.primary,
	})),
	Subtitle: styled(Typography)(({ theme }) => ({
		fontSize: '0.75rem',
		color: theme.palette.text.secondary,
	}))

}	