import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { SysSectionPaddingXY } from "/imports/ui/layoutComponents/sysLayoutComponents";
import { sysSizing } from '/imports/ui/materialui/styles';

export default {
	Container: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedLg,
		width: '540px',
		padding: sysSizing.spacingFixedLg
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
		flexDirection: 'column'
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
		textDecoration: isCompleted ? 'line-through' : 'none',
		color: isCompleted ? theme.palette.text.secondary : theme.palette.text.primary,
	}))

}	