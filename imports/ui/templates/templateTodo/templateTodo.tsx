import { Box } from '@mui/material';
import React from 'react';
import SimpleAppBarController from '../components/simpleAppBar/simpleAppBarController';
import { ISysTemplateProps } from '../getTemplate';

export interface ITemplateTodo extends ISysTemplateProps { }

const TemplateTodo: React.FC<ITemplateTodo> = ({ children }) => {

    return <Box>
        <Box sx={{ backgroundColor: 'white', width: '100%', position: 'fixed', top: 0, zIndex: 1000, left: 0, right: 0, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <SimpleAppBarController />
        </Box>
        <Box sx={{ marginTop: '220px', display: 'flex', flexDirection: 'column', width: "100vw" }}>{children}</Box>
    </Box>
};

export default TemplateTodo;
