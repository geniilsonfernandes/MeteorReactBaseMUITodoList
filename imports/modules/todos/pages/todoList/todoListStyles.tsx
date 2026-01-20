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
        marginBottom: sysSizing.contentFabDistance,
        marginTop: 200,
    })),
    HeaderContainer: styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: theme.spacing(1),
        marginBottom: theme.spacing(4),
    })),
    HeaderTitle: styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 'bold',
        fontSize: '2rem',
    })),
    HeaderSubtitle: styled(Box)(({ theme }) => ({
        fontSize: '1rem',
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(1),
    })),
    SectionTitle: styled(Box)(({ theme }) => ({
        fontWeight: 'bold',
        fontSize: '1rem',
        marginTop: theme.spacing(2),
    })),


    ListContainer: styled(Box)(({ theme }) => ({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    })),
};

