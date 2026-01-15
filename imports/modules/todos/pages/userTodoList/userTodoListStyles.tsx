import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ElementType } from 'react';
import { SysSectionPaddingXY } from "/imports/ui/layoutComponents/sysLayoutComponents";
import { sysSizing } from '/imports/ui/materialui/styles';

interface IUserTodoListStyles {
	Container: ElementType<BoxProps>;
	Header: ElementType<BoxProps>;
	AccordionHeader: ElementType<BoxProps>;
	AccordionTitle: ElementType<BoxProps>;
	AccordionPanel: ElementType<BoxProps>;
}

const UserTodoListStyles: IUserTodoListStyles = {
	Container: styled(SysSectionPaddingXY)(() => ({
		width: '100%',
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: sysSizing.spacingFixedLg
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

export default UserTodoListStyles;
