import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { SysSectionPaddingXY } from "/imports/ui/layoutComponents/sysLayoutComponents";
import { sysSizing } from '/imports/ui/materialui/styles';



export default {
	Container: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		height: '100vh',
		overflow: 'auto',
		gap: sysSizing.spacingFixedMd,
		marginBottom: sysSizing.contentFabDistance
	})),
	Header: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	}),
	AccordionHeader: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: theme.spacing(2),
		padding: theme.spacing(2, 0),
		width: '100%',
	})),
	AccordionTitle: styled(Box)(({ theme }) => ({
		fontWeight: 'bold',
		fontSize: '1rem',
		color: theme.palette.text.primary,
	})),
	AccordionPanel: styled(Box)(({ theme }) => ({
		width: '100%',
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	})),
};

