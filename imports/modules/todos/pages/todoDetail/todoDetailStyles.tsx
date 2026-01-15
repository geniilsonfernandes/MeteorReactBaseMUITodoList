import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ElementType } from 'react';
import { SysSectionPaddingXY } from "/imports/ui/layoutComponents/sysLayoutComponents";
import { sysSizing } from '/imports/ui/materialui/styles';

interface IUserTodoListStyles {
	Container: ElementType<BoxProps>;
	FieldsForm: ElementType<BoxProps>;
	Actions: ElementType<BoxProps>;

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
	FieldsForm: styled(Box)(({ theme }) => ({
		width: '100%',
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: theme.spacing(2),
	})),
	Actions: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: theme.spacing(2),
	})),
	
};

export default UserTodoListStyles;
