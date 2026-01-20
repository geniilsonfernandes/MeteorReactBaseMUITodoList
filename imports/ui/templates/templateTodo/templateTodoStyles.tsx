import { styled } from '@mui/material/styles';
import { SysSectionPaddingXY } from "/imports/ui/layoutComponents/sysLayoutComponents";



export default {
	Container: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		overflow: 'auto',
		paddingBottom: '16px',
		paddingTop: '16px',
	})),

}

