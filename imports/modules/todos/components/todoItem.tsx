import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface ITodoItemProps {
    title: string;
    createdBy: string;
    isCompleted: boolean;
    onToggle?: () => void;
    onClick?: () => void;
}

const ItemContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%',
    '&:last-child': {
        borderBottom: 'none',
    },
    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },
    cursor: 'pointer',
}));

const TextContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: theme.spacing(2),
}));

const Title = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isCompleted',
})<{ isCompleted: boolean }>(({ theme, isCompleted }) => ({
    fontWeight: 500,
    textDecoration: isCompleted ? 'line-through' : 'none',
    color: isCompleted ? theme.palette.text.secondary : theme.palette.text.primary,
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
}));

const TodoItem: React.FC<ITodoItemProps> = ({ title, createdBy, isCompleted, onToggle, onClick }) => {
    return (
        <ItemContainer
            onClick={onClick}
            sx={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                checked={isCompleted}
                onChange={onToggle}
                sx={{ p: 0 }}
            />
            <TextContainer>
                <Title variant="body1" isCompleted={isCompleted}>
                    {title}
                </Title>
                <Subtitle>
                    Criada por: <Box component="span" sx={{ textDecoration: 'underline' }}>{createdBy}</Box>
                </Subtitle>
            </TextContainer>
            <IconButton edge="end">
                <MoreVertIcon />
            </IconButton>
        </ItemContainer>
    );
};

export default TodoItem;
